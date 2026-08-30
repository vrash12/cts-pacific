import { describe, expect, it } from "vitest";

import { privateSalesPlanningItems } from "@/modules/products/sales-planning";
import { serviceLinks } from "@/config/site";
import { quoteServiceOptions } from "@/schemas/quote-request";

describe("private sales and equipment planning", () => {
  it("tracks both unverified equipment scopes as admin-only planning", () => {
    expect(privateSalesPlanningItems.map((item) => item.name)).toEqual([
      "Safety & Construction Equipment",
      "Heavy Equipment",
    ]);

    for (const item of privateSalesPlanningItems) {
      expect(item.status).toBe("CLIENT_DETAILS_REQUIRED");
      expect(item.visibility).toBe("ADMIN_ONLY");
      expect(item.decisionsRequired.length).toBeGreaterThanOrEqual(4);
    }
  });

  it("does not expose equipment planning as a service or quote choice", () => {
    const publicServiceLabels = serviceLinks.map((item) => item.label);
    const quoteLabels = quoteServiceOptions.map((item) => item.label);

    expect(publicServiceLabels).not.toContain("Safety & Construction Equipment");
    expect(publicServiceLabels).not.toContain("Heavy Equipment");
    expect(quoteLabels).not.toContain("Safety & Construction Equipment");
    expect(quoteLabels).not.toContain("Heavy Equipment");
  });
});
