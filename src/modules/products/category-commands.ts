import "server-only";

import { eq } from "drizzle-orm";

import {
  productCategoryAdminFormSchema,
  productCategoryIdSchema,
  productCategoryUpdateSchema,
} from "@/schemas/product-category";
import { assertCatalogManagerRole } from "@/server/auth/roles";
import type { AdminActor } from "@/server/auth/require-admin";
import { getDatabase } from "@/server/db/client";
import { auditLogs, productCategories } from "@/server/db/schema";

export type ProductCategoryCommandErrorCode =
  | "CATEGORY_CONFLICT"
  | "CATEGORY_NOT_FOUND";

export class ProductCategoryCommandError extends Error {
  constructor(public readonly code: ProductCategoryCommandErrorCode) {
    super(code);
    this.name = "ProductCategoryCommandError";
  }
}

export async function createProductCategory(
  actor: AdminActor,
  input: unknown,
) {
  assertCatalogManagerRole(actor.role);
  const categoryInput = productCategoryAdminFormSchema.parse(input);
  const database = getDatabase();

  return database.transaction(async (transaction) => {
    const [category] = await transaction
      .insert(productCategories)
      .values({
        name: categoryInput.name,
        slug: categoryInput.slug,
        description: categoryInput.description || null,
        displayOrder: categoryInput.displayOrder,
        isActive: true,
      })
      .returning({ id: productCategories.id });

    if (!category) {
      throw new Error("CATEGORY_CREATE_FAILED");
    }

    await transaction.insert(auditLogs).values({
      actorId: actor.id,
      actorEmailSnapshot: actor.email,
      action: "PRODUCT_CATEGORY_CREATED",
      entityType: "PRODUCT_CATEGORY",
      entityId: category.id,
      metadata: {
        categoryName: categoryInput.name,
        slug: categoryInput.slug,
      },
    });

    return { id: category.id };
  });
}

export async function updateProductCategory(
  actor: AdminActor,
  input: unknown,
) {
  assertCatalogManagerRole(actor.role);
  const categoryInput = productCategoryUpdateSchema.parse(input);
  const database = getDatabase();

  return database.transaction(async (transaction) => {
    const [existingCategory] = await transaction
      .select({
        id: productCategories.id,
        updatedAt: productCategories.updatedAt,
      })
      .from(productCategories)
      .where(eq(productCategories.id, categoryInput.categoryId))
      .limit(1)
      .for("update");

    if (!existingCategory) {
      throw new ProductCategoryCommandError("CATEGORY_NOT_FOUND");
    }

    if (
      existingCategory.updatedAt.getTime() !==
      new Date(categoryInput.lastKnownUpdatedAt).getTime()
    ) {
      throw new ProductCategoryCommandError("CATEGORY_CONFLICT");
    }

    const updatedAt = new Date();
    await transaction
      .update(productCategories)
      .set({
        name: categoryInput.name,
        slug: categoryInput.slug,
        description: categoryInput.description || null,
        displayOrder: categoryInput.displayOrder,
        updatedAt,
      })
      .where(eq(productCategories.id, categoryInput.categoryId));

    await transaction.insert(auditLogs).values({
      actorId: actor.id,
      actorEmailSnapshot: actor.email,
      action: "PRODUCT_CATEGORY_UPDATED",
      entityType: "PRODUCT_CATEGORY",
      entityId: categoryInput.categoryId,
      metadata: {
        categoryName: categoryInput.name,
        slug: categoryInput.slug,
      },
    });

    return { id: categoryInput.categoryId, updatedAt };
  });
}

export async function setProductCategoryActive(
  actor: AdminActor,
  categoryIdInput: unknown,
  active: boolean,
) {
  assertCatalogManagerRole(actor.role);
  const categoryId = productCategoryIdSchema.parse(categoryIdInput);
  const database = getDatabase();

  return database.transaction(async (transaction) => {
    const [category] = await transaction
      .select({
        id: productCategories.id,
        name: productCategories.name,
        isActive: productCategories.isActive,
      })
      .from(productCategories)
      .where(eq(productCategories.id, categoryId))
      .limit(1)
      .for("update");

    if (!category) {
      throw new ProductCategoryCommandError("CATEGORY_NOT_FOUND");
    }

    if (category.isActive !== active) {
      await transaction
        .update(productCategories)
        .set({ isActive: active, updatedAt: new Date() })
        .where(eq(productCategories.id, categoryId));

      await transaction.insert(auditLogs).values({
        actorId: actor.id,
        actorEmailSnapshot: actor.email,
        action: active
          ? "PRODUCT_CATEGORY_RESTORED"
          : "PRODUCT_CATEGORY_ARCHIVED",
        entityType: "PRODUCT_CATEGORY",
        entityId: categoryId,
        metadata: {
          categoryName: category.name,
          isActive: active,
        },
      });
    }

    return { id: categoryId, isActive: active };
  });
}
