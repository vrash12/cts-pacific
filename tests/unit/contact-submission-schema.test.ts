import { describe, expect, it } from "vitest";

import { contactSubmissionSchema } from "@/schemas/contact-submission";

const validSubmission = {
  submissionId: "cb53ea7b-8490-4e60-a18e-0647bb9ac0ec",
  name: "Jordan Santos",
  company: "Pacific Facility Group",
  email: "jordan@example.com",
  phone: "+1 (671) 555-0100",
  inquiryType: "service-question",
  subject: "Fiber service availability",
  message: "Please confirm who can discuss a planned fiber infrastructure scope.",
  website: "",
} as const;

describe("contactSubmissionSchema", () => {
  it("accepts a complete general inquiry", () => {
    expect(contactSubmissionSchema.safeParse(validSubmission).success).toBe(true);
  });

  it("allows optional company and phone values to remain empty", () => {
    expect(
      contactSubmissionSchema.safeParse({
        ...validSubmission,
        company: "",
        phone: "",
      }).success,
    ).toBe(true);
  });

  it("rejects invalid contact data, short messages, and populated bot traps", () => {
    const result = contactSubmissionSchema.safeParse({
      ...validSubmission,
      email: "not-an-email",
      phone: "call me",
      message: "Too short",
      website: "https://spam.example",
    });

    expect(result.success).toBe(false);
  });
});
