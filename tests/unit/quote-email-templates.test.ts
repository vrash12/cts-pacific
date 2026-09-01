import { describe, expect, it } from "vitest";

import {
  createInternalQuoteEmail,
  createQuoteConfirmationEmail,
} from "@/server/email/quote-templates";
import type { QuoteRequestInput } from "@/schemas/quote-request";

const context = {
  referenceNumber: "CTS-20260829-CB53EA7B",
  request: {
    submissionId: "cb53ea7b-8490-4e60-a18e-0647bb9ac0ec",
    services: ["fiber-optics"],
    projectLocation: "Tamuning <script>alert(1)</script>",
    projectType: "commercial" as const,
    targetTimeline: "one-to-three-months" as const,
    description: "Install and certify a new fiber backbone between network spaces.",
    name: "Jordan & Co.",
    company: "Pacific Facility Group",
    email: "jordan@example.com",
    phone: "+1 (671) 555-0100",
    website: "",
  } satisfies QuoteRequestInput,
  serviceLabels: ["Fiber Optics"],
  projectTypeLabel: "Commercial",
  timelineLabel: "1–3 months",
};

describe("quote email templates", () => {
  it("includes the reference and submitted project details", () => {
    const internal = createInternalQuoteEmail(context);
    const confirmation = createQuoteConfirmationEmail(context);

    expect(internal.subject).toContain(context.referenceNumber);
    expect(internal.text).toContain("Fiber Optics");
    expect(confirmation.subject).toContain(context.referenceNumber);
    expect(confirmation.text).toContain("Tamuning");
  });

  it("escapes user-provided HTML in email markup", () => {
    const internal = createInternalQuoteEmail(context);

    expect(internal.html).not.toContain("<script>");
    expect(internal.html).toContain("&lt;script&gt;alert(1)&lt;/script&gt;");
    expect(internal.html).toContain("Jordan &amp; Co.");
  });

  it("adds the branded CTS Pacific signature to every quote email", () => {
    const messages = [
      createInternalQuoteEmail(context),
      createQuoteConfirmationEmail(context),
    ];

    for (const message of messages) {
      expect(message.html).toContain('data-cts-email-signature="true"');
      expect(message.html).toContain("https://ctspacific.com/images/logo.png");
      expect(message.html).not.toContain("localhost");
      expect(message.text).toContain("Corerin Technical Solutions, LLC");
      expect(message.text).toContain("CONFIDENTIALITY NOTICE:");
    }
  });
});
