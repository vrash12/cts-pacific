import "server-only";

import { asc, eq } from "drizzle-orm";

import {
  initialProductCategorySlugs,
  type InitialProductCategorySlug,
} from "@/modules/products/catalog";
import { parsePriceToMinorUnits } from "@/modules/products/money";
import {
  productAdminFormSchema,
  productIdSchema,
  productUpdateSchema,
} from "@/schemas/product";
import { assertCatalogManagerRole } from "@/server/auth/roles";
import type { AdminActor } from "@/server/auth/require-admin";
import { getDatabase } from "@/server/db/client";
import {
  auditLogs,
  productCategories,
  products,
  productVariants,
} from "@/server/db/schema";

export type ProductCommandErrorCode =
  | "CATEGORY_INVALID"
  | "PRODUCT_CONFLICT"
  | "PRODUCT_NOT_FOUND"
  | "PRODUCT_VARIANT_MISSING";

export class ProductCommandError extends Error {
  constructor(public readonly code: ProductCommandErrorCode) {
    super(code);
    this.name = "ProductCommandError";
  }
}

function isApprovedCategorySlug(
  slug: string,
): slug is InitialProductCategorySlug {
  return initialProductCategorySlugs.includes(
    slug as InitialProductCategorySlug,
  );
}

async function requireApprovedCategory(
  transaction: Parameters<
    Parameters<ReturnType<typeof getDatabase>["transaction"]>[0]
  >[0],
  categoryId: string,
) {
  const [category] = await transaction
    .select({
      id: productCategories.id,
      slug: productCategories.slug,
      isActive: productCategories.isActive,
    })
    .from(productCategories)
    .where(eq(productCategories.id, categoryId))
    .limit(1);

  if (
    !category?.isActive ||
    !isApprovedCategorySlug(category.slug)
  ) {
    throw new ProductCommandError("CATEGORY_INVALID");
  }

  return category;
}

export async function createProductDraft(
  actor: AdminActor,
  input: unknown,
) {
  assertCatalogManagerRole(actor.role);
  const productInput = productAdminFormSchema.parse(input);
  const database = getDatabase();

  return database.transaction(async (transaction) => {
    await requireApprovedCategory(transaction, productInput.categoryId);

    const [product] = await transaction
      .insert(products)
      .values({
        categoryId: productInput.categoryId,
        name: productInput.name,
        slug: productInput.slug,
        description: productInput.description || null,
        status: "DRAFT",
      })
      .returning({ id: products.id });

    if (!product) {
      throw new Error("PRODUCT_CREATE_FAILED");
    }

    const normalizedSku = productInput.sku.toUpperCase();
    await transaction.insert(productVariants).values({
      productId: product.id,
      sku: normalizedSku,
      name: productInput.variantName,
      priceMinor: parsePriceToMinorUnits(productInput.price),
      currency: productInput.currency,
      inventoryPolicy: productInput.inventoryPolicy,
      inventoryQuantity:
        productInput.inventoryPolicy === "TRACK"
          ? productInput.inventoryQuantity
          : 0,
    });

    await transaction.insert(auditLogs).values({
      actorId: actor.id,
      actorEmailSnapshot: actor.email,
      action: "PRODUCT_CREATED",
      entityType: "PRODUCT",
      entityId: product.id,
      metadata: {
        productName: productInput.name,
        sku: normalizedSku,
        status: "DRAFT",
      },
    });

    return { id: product.id };
  });
}

export async function updateProduct(
  actor: AdminActor,
  input: unknown,
) {
  assertCatalogManagerRole(actor.role);
  const productInput = productUpdateSchema.parse(input);
  const database = getDatabase();

  return database.transaction(async (transaction) => {
    await requireApprovedCategory(transaction, productInput.categoryId);

    const [existingProduct] = await transaction
      .select({ id: products.id, updatedAt: products.updatedAt })
      .from(products)
      .where(eq(products.id, productInput.productId))
      .limit(1)
      .for("update");

    if (!existingProduct) {
      throw new ProductCommandError("PRODUCT_NOT_FOUND");
    }

    if (
      existingProduct.updatedAt.getTime() !==
      new Date(productInput.lastKnownUpdatedAt).getTime()
    ) {
      throw new ProductCommandError("PRODUCT_CONFLICT");
    }

    const [primaryVariant] = await transaction
      .select({ id: productVariants.id })
      .from(productVariants)
      .where(eq(productVariants.productId, productInput.productId))
      .orderBy(asc(productVariants.createdAt))
      .limit(1);

    if (!primaryVariant) {
      throw new ProductCommandError("PRODUCT_VARIANT_MISSING");
    }

    const updatedAt = new Date();
    await transaction
      .update(products)
      .set({
        categoryId: productInput.categoryId,
        name: productInput.name,
        slug: productInput.slug,
        description: productInput.description || null,
        updatedAt,
      })
      .where(eq(products.id, productInput.productId));

    const normalizedSku = productInput.sku.toUpperCase();
    await transaction
      .update(productVariants)
      .set({
        sku: normalizedSku,
        name: productInput.variantName,
        priceMinor: parsePriceToMinorUnits(productInput.price),
        currency: productInput.currency,
        inventoryPolicy: productInput.inventoryPolicy,
        inventoryQuantity:
          productInput.inventoryPolicy === "TRACK"
            ? productInput.inventoryQuantity
            : 0,
        updatedAt,
      })
      .where(eq(productVariants.id, primaryVariant.id));

    await transaction.insert(auditLogs).values({
      actorId: actor.id,
      actorEmailSnapshot: actor.email,
      action: "PRODUCT_UPDATED",
      entityType: "PRODUCT",
      entityId: productInput.productId,
      metadata: {
        productName: productInput.name,
        sku: normalizedSku,
      },
    });

    return { id: productInput.productId, updatedAt };
  });
}

export async function setProductArchived(
  actor: AdminActor,
  productIdInput: unknown,
  archived: boolean,
) {
  assertCatalogManagerRole(actor.role);
  const productId = productIdSchema.parse(productIdInput);
  const database = getDatabase();

  return database.transaction(async (transaction) => {
    const [product] = await transaction
      .select({ id: products.id, name: products.name, status: products.status })
      .from(products)
      .where(eq(products.id, productId))
      .limit(1);

    if (!product) {
      throw new ProductCommandError("PRODUCT_NOT_FOUND");
    }

    const nextStatus = archived ? "ARCHIVED" : "DRAFT";

    if (product.status !== nextStatus) {
      await transaction
        .update(products)
        .set({
          status: nextStatus,
          publishedAt: null,
          updatedAt: new Date(),
        })
        .where(eq(products.id, productId));

      await transaction.insert(auditLogs).values({
        actorId: actor.id,
        actorEmailSnapshot: actor.email,
        action: archived ? "PRODUCT_ARCHIVED" : "PRODUCT_RESTORED_TO_DRAFT",
        entityType: "PRODUCT",
        entityId: productId,
        metadata: {
          productName: product.name,
          previousStatus: product.status,
          status: nextStatus,
        },
      });
    }

    return { id: productId, status: nextStatus };
  });
}
