import "server-only";

import { asc, count, desc, eq, or } from "drizzle-orm";

import { assertCatalogViewerRole } from "@/server/auth/roles";
import type { AdminActor } from "@/server/auth/require-admin";
import { getDatabase } from "@/server/db/client";
import {
  productCategories,
  products,
  productVariants,
} from "@/server/db/schema";

function assertCatalogViewer(actor: AdminActor) {
  assertCatalogViewerRole(actor.role);
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

export async function getAdminProductFormCategories(
  actor: AdminActor,
  includeCategoryId?: string,
) {
  assertCatalogViewer(actor);

  return getDatabase()
    .select({
      id: productCategories.id,
      name: productCategories.name,
      slug: productCategories.slug,
      isActive: productCategories.isActive,
    })
    .from(productCategories)
    .where(
      includeCategoryId
        ? or(
            eq(productCategories.isActive, true),
            eq(productCategories.id, includeCategoryId),
          )
        : eq(productCategories.isActive, true),
    )
    .orderBy(productCategories.displayOrder, productCategories.name);
}

export async function getAdminProductCategories(actor: AdminActor) {
  assertCatalogViewer(actor);

  return getDatabase()
    .select({
      id: productCategories.id,
      name: productCategories.name,
      slug: productCategories.slug,
      description: productCategories.description,
      displayOrder: productCategories.displayOrder,
      isActive: productCategories.isActive,
      updatedAt: productCategories.updatedAt,
      productCount: count(products.id),
    })
    .from(productCategories)
    .leftJoin(products, eq(products.categoryId, productCategories.id))
    .groupBy(productCategories.id)
    .orderBy(productCategories.displayOrder, productCategories.name);
}

export async function getAdminProductCategoryForEdit(
  actor: AdminActor,
  categoryId: string,
) {
  assertCatalogViewer(actor);

  const [category] = await getDatabase()
    .select({
      id: productCategories.id,
      name: productCategories.name,
      slug: productCategories.slug,
      description: productCategories.description,
      displayOrder: productCategories.displayOrder,
      isActive: productCategories.isActive,
      updatedAt: productCategories.updatedAt,
    })
    .from(productCategories)
    .where(eq(productCategories.id, categoryId))
    .limit(1);

  return category ?? null;
}

export async function getAdminProducts(actor: AdminActor) {
  assertCatalogViewer(actor);

  const database = getDatabase();
  const [productRows, variantRows] = await Promise.all([
    database
      .select({
        id: products.id,
        name: products.name,
        slug: products.slug,
        status: products.status,
        categoryName: productCategories.name,
        categorySlug: productCategories.slug,
        updatedAt: products.updatedAt,
      })
      .from(products)
      .innerJoin(
        productCategories,
        eq(products.categoryId, productCategories.id),
      )
      .orderBy(desc(products.updatedAt), products.name),
    database
      .select({
        productId: productVariants.productId,
        sku: productVariants.sku,
        priceMinor: productVariants.priceMinor,
        currency: productVariants.currency,
        inventoryPolicy: productVariants.inventoryPolicy,
        inventoryQuantity: productVariants.inventoryQuantity,
        createdAt: productVariants.createdAt,
      })
      .from(productVariants)
      .orderBy(asc(productVariants.createdAt)),
  ]);

  const primaryVariantByProduct = new Map<
    string,
    (typeof variantRows)[number]
  >();

  variantRows.forEach((variant) => {
    if (!primaryVariantByProduct.has(variant.productId)) {
      primaryVariantByProduct.set(variant.productId, variant);
    }
  });

  return productRows.map((product) => ({
    ...product,
    primaryVariant: primaryVariantByProduct.get(product.id) ?? null,
  }));
}

export async function getAdminProductForEdit(
  actor: AdminActor,
  productId: string,
) {
  assertCatalogViewer(actor);

  const database = getDatabase();
  const [product] = await database
    .select({
      id: products.id,
      categoryId: products.categoryId,
      name: products.name,
      slug: products.slug,
      description: products.description,
      status: products.status,
      updatedAt: products.updatedAt,
    })
    .from(products)
    .where(eq(products.id, productId))
    .limit(1);

  if (!product) {
    return null;
  }

  const [primaryVariant] = await database
    .select({
      id: productVariants.id,
      sku: productVariants.sku,
      name: productVariants.name,
      priceMinor: productVariants.priceMinor,
      currency: productVariants.currency,
      inventoryPolicy: productVariants.inventoryPolicy,
      inventoryQuantity: productVariants.inventoryQuantity,
    })
    .from(productVariants)
    .where(eq(productVariants.productId, productId))
    .orderBy(asc(productVariants.createdAt))
    .limit(1);

  return {
    ...product,
    primaryVariant: primaryVariant ?? null,
  };
}
