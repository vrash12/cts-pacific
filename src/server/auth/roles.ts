import type { adminRole } from "@/server/db/schema";

export type AdminRole = (typeof adminRole.enumValues)[number];

export const catalogViewerRoles = [
  "SUPER_ADMIN",
  "ADMIN",
  "CONTENT_EDITOR",
  "ORDER_MANAGER",
] as const satisfies readonly AdminRole[];

export const catalogManagerRoles = [
  "SUPER_ADMIN",
  "ADMIN",
  "CONTENT_EDITOR",
] as const satisfies readonly AdminRole[];

export function canManageCatalog(role: AdminRole) {
  return catalogManagerRoles.includes(
    role as (typeof catalogManagerRoles)[number],
  );
}

export function assertCatalogViewerRole(role: AdminRole) {
  if (
    !catalogViewerRoles.includes(
      role as (typeof catalogViewerRoles)[number],
    )
  ) {
    throw new Error("ADMIN_CATALOG_FORBIDDEN");
  }
}

export function assertCatalogManagerRole(role: AdminRole) {
  if (!canManageCatalog(role)) {
    throw new Error("ADMIN_CATALOG_WRITE_FORBIDDEN");
  }
}
