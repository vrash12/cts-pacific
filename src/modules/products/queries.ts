import "server-only";

import { count, eq } from "drizzle-orm";

import { catalogViewerRoles } from "@/server/auth/roles";
import type { AdminActor } from "@/server/auth/require-admin";
import { getDatabase } from "@/server/db/client";
import { productCategories, products } from "@/server/db/schema";

function assertCatalogViewer(actor: AdminActor) {
  if (
    !catalogViewerRoles.includes(
      actor.role as (typeof catalogViewerRoles)[number],
    )
  ) {
    throw new Error("ADMIN_CATALOG_FORBIDDEN");
  }
}

export async function getAdminCatalogOverview(actor: AdminActor) {
  assertCatalogViewer(actor);

  const database = getDatabase();
  const [categories, statusCounts] = await Promise.all([
    database
      .select({
        id: productCategories.id,
        name: productCategories.name,
        slug: productCategories.slug,
        description: productCategories.description,
        isActive: productCategories.isActive,
        productCount: count(products.id),
      })
      .from(productCategories)
      .leftJoin(products, eq(products.categoryId, productCategories.id))
      .groupBy(productCategories.id)
      .orderBy(productCategories.displayOrder),
    database
      .select({ status: products.status, count: count() })
      .from(products)
      .groupBy(products.status),
  ]);

  const totals = {
    all: 0,
    draft: 0,
    published: 0,
    archived: 0,
  };

  statusCounts.forEach((row) => {
    totals.all += row.count;

    if (row.status === "DRAFT") totals.draft = row.count;
    if (row.status === "PUBLISHED") totals.published = row.count;
    if (row.status === "ARCHIVED") totals.archived = row.count;
  });

  return { categories, totals };
}
