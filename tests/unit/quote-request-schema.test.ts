import { describe, expect, it } from "vitest";

import { quoteRequestSchema } from "@/schemas/quote-request";

const validRequest = {
  submissionId: "cb53ea7b-8490-4e60-a18e-0647bb9ac0ec",
  services: ["fiber-optics"],
  projectLocation: "Tamuning, Guam",
  projectType: "commercial",
  targetTimeline: "one-to-three-months",
  description: "Install and certify a new fiber backbone between network spaces.",
  name: "Jordan Santos",
  company: "Pacific Facility Group",
  email: "jordan@example.com",
  phone: "+1 (671) 555-0100",
  website: "",
} as const;

describe("quoteRequestSchema", () => {
  it("accepts a complete project request", () => {
    const result = quoteRequestSchema.safeParse(validRequest);

    expect(result.success).toBe(true);
  });

  it("rejects a request without a service or sufficient project detail", () => {
    const result = quoteRequestSchema.safeParse({
      ...validRequest,
      services: [],
      description: "Too short",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const fields = result.error.flatten().fieldErrors;
      expect(fields.services).toContain("Select at least one service.");
      expect(fields.description).toContain(
        "Provide at least 20 characters about the project.",
      );
    }
  });

  it("rejects invalid contact data and populated bot-trap fields", () => {
    const result = quoteRequestSchema.safeParse({
      ...validRequest,
      email: "not-an-email",
      phone: "call me maybe",
      website: "https://spam.example",
    });

    expect(result.success).toBe(false);
  });
});
