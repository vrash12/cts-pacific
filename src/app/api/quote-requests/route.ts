import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { readServerEnvironment } from "@/config/env/server";
import {
  projectTypeOptions,
  quoteRequestSchema,
  quoteServiceOptions,
  timelineOptions,
} from "@/schemas/quote-request";
import { getDatabase } from "@/server/db/client";
import { quoteRequests, quoteRequestServices } from "@/server/db/schema";
import {
  createInternalQuoteEmail,
  createQuoteConfirmationEmail,
} from "@/server/email/quote-templates";
import { sendEmail } from "@/server/email/resend";
import { checkRateLimit } from "@/server/security/rate-limit";

export const dynamic = "force-dynamic";

function getRequestKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "local";
}

function getOptionLabel<T extends readonly { value: string; label: string }[]>(
  options: T,
  value: string,
) {
  return options.find((option) => option.value === value)?.label ?? value;
}

export async function POST(request: Request) {
  const rateLimit = checkRateLimit(getRequestKey(request));

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

  const parsed = quoteRequestSchema.safeParse(body);

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
          "Online project requests are not configured yet. Please email or call CTS Pacific.",
      },
      { status: 503 },
    );
  }

  const input = parsed.data;
  const database = getDatabase();
  const existing = await database.query.quoteRequests.findFirst({
    columns: { id: true, referenceNumber: true },
    where: eq(quoteRequests.submissionId, input.submissionId),
  });

  let savedRequest = existing;

  if (!savedRequest) {
    const date = new Date().toISOString().slice(0, 10).replaceAll("-", "");
    const referenceNumber = `CTS-${date}-${input.submissionId.slice(0, 8).toUpperCase()}`;

    savedRequest = await database.transaction(async (transaction) => {
      const [created] = await transaction
        .insert(quoteRequests)
        .values({
          submissionId: input.submissionId,
          referenceNumber,
          projectLocation: input.projectLocation,
          projectType: input.projectType,
          targetTimeline: input.targetTimeline,
          description: input.description,
          contactName: input.name,
          company: input.company || null,
          email: input.email.toLowerCase(),
          phone: input.phone,
        })
        .returning({ id: quoteRequests.id, referenceNumber: quoteRequests.referenceNumber });

      if (!created) {
        throw new Error("QUOTE_REQUEST_INSERT_FAILED");
      }

      await transaction.insert(quoteRequestServices).values(
        input.services.map((service) => ({
          quoteRequestId: created.id,
          service,
        })),
      );

      return created;
    });
  }

  if (!savedRequest) {
    return NextResponse.json(
      { ok: false, message: "The project request could not be saved." },
      { status: 500 },
    );
  }

  const serviceLabels = input.services.map((service) =>
    getOptionLabel(quoteServiceOptions, service),
  );
  const emailContext = {
    referenceNumber: savedRequest.referenceNumber,
    request: input,
    serviceLabels,
    projectTypeLabel: getOptionLabel(projectTypeOptions, input.projectType),
    timelineLabel: getOptionLabel(timelineOptions, input.targetTimeline),
  };
  const internalEmail = createInternalQuoteEmail(emailContext);
  const confirmationEmail = createQuoteConfirmationEmail(emailContext);

  try {
    await Promise.all([
      sendEmail({
        to: environment.QUOTE_NOTIFICATION_EMAIL,
        subject: internalEmail.subject,
        html: internalEmail.html,
        text: internalEmail.text,
        replyTo: input.email,
        idempotencyKey: `quote-internal-${input.submissionId}`,
      }),
      sendEmail({
        to: input.email,
        subject: confirmationEmail.subject,
        html: confirmationEmail.html,
        text: confirmationEmail.text,
        replyTo: environment.QUOTE_NOTIFICATION_EMAIL,
        idempotencyKey: `quote-confirmation-${input.submissionId}`,
      }),
    ]);
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Your request was saved, but email delivery was interrupted. Please try again using the same form.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json(
    {
      ok: true,
      referenceNumber: savedRequest.referenceNumber,
    },
    { status: existing ? 200 : 201 },
  );
}
