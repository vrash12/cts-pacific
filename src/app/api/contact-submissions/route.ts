import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { readServerEnvironment } from "@/config/env/server";
import {
  contactInquiryOptions,
  contactSubmissionSchema,
} from "@/schemas/contact-submission";
import { getDatabase } from "@/server/db/client";
import { contactSubmissions } from "@/server/db/schema";
import {
  createContactConfirmationEmail,
  createInternalContactEmail,
} from "@/server/email/contact-templates";
import { sendEmail } from "@/server/email/resend";
import { checkRateLimit } from "@/server/security/rate-limit";
import { getRequestClientKey } from "@/server/security/request-key";

export const dynamic = "force-dynamic";

function getInquiryTypeLabel(value: string) {
  return (
    contactInquiryOptions.find((option) => option.value === value)?.label ?? value
  );
}

export async function POST(request: Request) {
  const rateLimit = checkRateLimit(getRequestClientKey(request, "contact"));

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        ok: false,
        message: "Too many requests. Please wait before trying again.",
      },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
      },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "The request could not be read." },
      { status: 400 },
    );
  }

  if (
    typeof body === "object" &&
    body !== null &&
    "website" in body &&
    typeof body.website === "string" &&
    body.website.length > 0
  ) {
    return NextResponse.json({ ok: true, referenceNumber: "RECEIVED" }, { status: 202 });
  }

  const parsed = contactSubmissionSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Review the highlighted fields and try again.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  const environment = readServerEnvironment();

  if (!environment.DATABASE_URL || !environment.EMAIL_API_KEY || !environment.EMAIL_FROM) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Online contact requests are not configured yet. Please email or call CTS Pacific.",
      },
      { status: 503 },
    );
  }

  const input = parsed.data;
  const database = getDatabase();
  const existing = await database.query.contactSubmissions.findFirst({
    columns: { id: true, referenceNumber: true },
    where: eq(contactSubmissions.submissionId, input.submissionId),
  });

  let savedSubmission = existing;

  if (!savedSubmission) {
    const date = new Date().toISOString().slice(0, 10).replaceAll("-", "");
    const referenceNumber = `CTC-${date}-${input.submissionId.slice(0, 8).toUpperCase()}`;
    const [created] = await database
      .insert(contactSubmissions)
      .values({
        submissionId: input.submissionId,
        referenceNumber,
        name: input.name,
        company: input.company || null,
        email: input.email.toLowerCase(),
        phone: input.phone || null,
        inquiryType: input.inquiryType,
        subject: input.subject,
        message: input.message,
      })
      .returning({
        id: contactSubmissions.id,
        referenceNumber: contactSubmissions.referenceNumber,
      });

    savedSubmission = created;
  }

  if (!savedSubmission) {
    return NextResponse.json(
      { ok: false, message: "The contact inquiry could not be saved." },
      { status: 500 },
    );
  }

  const emailContext = {
    referenceNumber: savedSubmission.referenceNumber,
    inquiryTypeLabel: getInquiryTypeLabel(input.inquiryType),
    request: input,
  };
  const internalEmail = createInternalContactEmail(emailContext);
  const confirmationEmail = createContactConfirmationEmail(emailContext);

  try {
    await Promise.all([
      sendEmail({
        to: environment.CONTACT_NOTIFICATION_EMAIL,
        subject: internalEmail.subject,
        html: internalEmail.html,
        text: internalEmail.text,
        replyTo: input.email,
        idempotencyKey: `contact-internal-${input.submissionId}`,
      }),
      sendEmail({
        to: input.email,
        subject: confirmationEmail.subject,
        html: confirmationEmail.html,
        text: confirmationEmail.text,
        replyTo: environment.CONTACT_NOTIFICATION_EMAIL,
        idempotencyKey: `contact-confirmation-${input.submissionId}`,
      }),
    ]);
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Your inquiry was saved, but email delivery was interrupted. Please try again using the same form.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json(
    { ok: true, referenceNumber: savedSubmission.referenceNumber },
    { status: existing ? 200 : 201 },
  );
}
