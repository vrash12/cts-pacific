import type { adminRole } from "@/server/db/schema";

export type AdminRole = (typeof adminRole.enumValues)[number];

export function canManageCatalog(role: AdminRole) {
  return role === "ADMIN";
}

export function canManageLeads(role: AdminRole) {
  return role === "ADMIN";
}

export function assertCatalogViewerRole(role: AdminRole) {
  if (role !== "ADMIN") {
    throw new Error("ADMIN_CATALOG_FORBIDDEN");
  }
}

export function assertCatalogManagerRole(role: AdminRole) {
  if (!canManageCatalog(role)) {
    throw new Error("ADMIN_CATALOG_WRITE_FORBIDDEN");
  }
}

export function assertLeadManagerRole(role: AdminRole) {
  if (!canManageLeads(role)) {
    throw new Error("ADMIN_LEADS_FORBIDDEN");
  }
}
