import { describe, expect, it } from "vitest";

import {
  leadStatusSchema,
  leadStatusUpdateSchema,
} from "@/schemas/lead-admin";

describe("lead administration schema", () => {
  it.each(["NEW", "REVIEWING", "CONTACTED", "CLOSED"])(
    "accepts the %s workflow status",
    (status) => {
      expect(leadStatusSchema.parse(status)).toBe(status);
    },
  );

  it("rejects unknown statuses and invalid record identifiers", () => {
    expect(
      leadStatusUpdateSchema.safeParse({
        leadId: "not-a-uuid",
        status: "DELETED",
      }).success,
    ).toBe(false);
  });
});
