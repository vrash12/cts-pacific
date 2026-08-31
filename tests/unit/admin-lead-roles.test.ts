import { describe, expect, it } from "vitest";

import {
  assertLeadManagerRole,
  canManageLeads,
} from "@/server/auth/roles";

describe("single administrator lead access", () => {
  it("allows the administrator to manage quote and contact leads", () => {
    expect(canManageLeads("ADMIN")).toBe(true);
    expect(() => assertLeadManagerRole("ADMIN")).not.toThrow();
  });
});
