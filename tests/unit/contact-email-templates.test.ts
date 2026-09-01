import { describe, expect, it } from "vitest";

import type { ContactSubmissionInput } from "@/schemas/contact-submission";
import {
  createContactConfirmationEmail,
  createInternalContactEmail,
} from "@/server/email/contact-templates";
import { addEmailSignature } from "@/server/email/template-utils";

const context = {
  referenceNumber: "CTC-20260830-CB53EA7B",
  inquiryTypeLabel: "Service question",
  request: {
    submissionId: "cb53ea7b-8490-4e60-a18e-0647bb9ac0ec",
    name: "Jordan & Co.",
    company: "Pacific Facility Group",
    email: "jordan@example.com",
    phone: "+1 (671) 555-0100",
    inquiryType: "service-question" as const,
    subject: "Fiber <script>alert(1)</script>",
    message: "Please confirm who can discuss the planned fiber infrastructure scope.",
    website: "",
  } satisfies ContactSubmissionInput,
};

describe("contact email templates", () => {
  it("includes the reference and submitted inquiry details", () => {
    const internal = createInternalContactEmail(context);
    const confirmation = createContactConfirmationEmail(context);

    expect(internal.subject).toContain(context.referenceNumber);
    expect(internal.text).toContain("Service question");
    expect(confirmation.subject).toContain(context.referenceNumber);
    expect(confirmation.text).toContain("Fiber");
  });

  it("escapes user-provided HTML in email markup", () => {
    const internal = createInternalContactEmail(context);

    expect(internal.html).not.toContain("<script>");
    expect(internal.html).toContain("&lt;script&gt;alert(1)&lt;/script&gt;");
    expect(internal.html).toContain("Jordan &amp; Co.");
  });

  it("adds the branded CTS Pacific signature to every contact email", () => {
    const messages = [
      createInternalContactEmail(context),
      createContactConfirmationEmail(context),
    ];

    for (const message of messages) {
      expect(message.html).toContain('data-cts-email-signature="true"');
      expect(message.html).toContain("/images/logo.png");
      expect(message.text).toContain("Corerin Technical Solutions, LLC");
      expect(message.text).toContain("CONFIDENTIALITY NOTICE:");
    }
  });

  it("does not duplicate the signature when the transport enforces it again", () => {
    const message = addEmailSignature(createContactConfirmationEmail(context));

    expect(message.html.match(/data-cts-email-signature="true"/g)).toHaveLength(1);
    expect(message.text.match(/CONFIDENTIALITY NOTICE:/g)).toHaveLength(1);
  });
});
