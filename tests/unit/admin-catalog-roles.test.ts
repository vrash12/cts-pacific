import { describe, expect, it } from "vitest";

import {
  assertCatalogManagerRole,
  assertCatalogViewerRole,
  canManageCatalog,
} from "@/server/auth/roles";
import { adminRole } from "@/server/db/schema";

describe("single administrator catalog access", () => {
  it("defines ADMIN as the only administrator role", () => {
    expect(adminRole.enumValues).toEqual(["ADMIN"]);
  });

  it("allows the administrator to view and manage the catalog", () => {
    expect(canManageCatalog("ADMIN")).toBe(true);
    expect(() => assertCatalogViewerRole("ADMIN")).not.toThrow();
    expect(() => assertCatalogManagerRole("ADMIN")).not.toThrow();
  });
});
