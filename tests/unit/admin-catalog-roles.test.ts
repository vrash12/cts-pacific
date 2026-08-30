import { describe, expect, it } from "vitest";

import {
  assertCatalogManagerRole,
  assertCatalogViewerRole,
  canManageCatalog,
} from "@/server/auth/roles";

describe("admin catalog roles", () => {
  it.each(["SUPER_ADMIN", "ADMIN", "CONTENT_EDITOR"] as const)(
    "allows %s to manage products",
    (role) => {
      expect(canManageCatalog(role)).toBe(true);
      expect(() => assertCatalogManagerRole(role)).not.toThrow();
    },
  );

  it("keeps ORDER_MANAGER read-only", () => {
    expect(canManageCatalog("ORDER_MANAGER")).toBe(false);
    expect(() => assertCatalogViewerRole("ORDER_MANAGER")).not.toThrow();
    expect(() => assertCatalogManagerRole("ORDER_MANAGER")).toThrow(
      "ADMIN_CATALOG_WRITE_FORBIDDEN",
    );
  });
});
