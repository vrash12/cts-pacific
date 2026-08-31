"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createProductCategory,
  ProductCategoryCommandError,
  setProductCategoryActive,
  updateProductCategory,
} from "@/modules/products/category-commands";
import type {
  ProductCategoryAdminFormInput,
  ProductCategoryUpdateInput,
} from "@/schemas/product-category";
import { requireAdmin } from "@/server/auth/require-admin";

type CategoryFormField = keyof ProductCategoryAdminFormInput;

const categoryFormFields = new Set<CategoryFormField>([
  "name",
  "slug",
  "description",
  "displayOrder",
]);

export type ProductCategoryMutationResult =
  | { ok: true; categoryId: string; message: string }
  | {
      ok: false;
      message: string;
      fieldErrors?: Partial<Record<CategoryFormField, string>>;
    };

function readConstraintName(error: unknown) {
  if (!error || typeof error !== "object") return null;

  const record = error as Record<string, unknown>;
  const constraint = record.constraint_name ?? record.constraint;
  return typeof constraint === "string" ? constraint : null;
}

function mapCategoryError(error: unknown): ProductCategoryMutationResult {
  if (error instanceof z.ZodError) {
    const fieldErrors: Partial<Record<CategoryFormField, string>> = {};

    error.issues.forEach((issue) => {
      const [field] = issue.path;
      if (
        typeof field === "string" &&
        categoryFormFields.has(field as CategoryFormField) &&
        !fieldErrors[field as CategoryFormField]
      ) {
        fieldErrors[field as CategoryFormField] = issue.message;
      }
    });

    return {
      ok: false,
      message: "Review the highlighted category information.",
      fieldErrors,
    };
  }

  if (error instanceof ProductCategoryCommandError) {
    return {
      ok: false,
      message:
        error.code === "CATEGORY_CONFLICT"
          ? "This category changed after you opened it. Return to the category list, reopen it, and apply your changes again."
          : "This category no longer exists. Return to the category list and refresh.",
    };
  }

  if (readConstraintName(error) === "product_categories_slug_unique") {
    return {
      ok: false,
      message: "A category already uses this slug.",
      fieldErrors: { slug: "Choose a unique category slug." },
    };
  }

  if (
    error instanceof Error &&
    error.message === "ADMIN_CATALOG_WRITE_FORBIDDEN"
  ) {
    return { ok: false, message: "Your admin role has read-only catalog access." };
  }

  return {
    ok: false,
    message: "The category could not be saved. No public content was changed.",
  };
}

async function requireCategoryActor() {
  const access = await requireAdmin();
  return access.status === "authorized" ? access.actor : null;
}

function revalidateCategoryPages(categoryId?: string) {
  revalidatePath("/admin");
  revalidatePath("/admin/products");
  revalidatePath("/admin/products/new");
  revalidatePath("/admin/categories");
  if (categoryId) revalidatePath(`/admin/categories/${categoryId}/edit`);
}

export async function createProductCategoryAction(
  input: ProductCategoryAdminFormInput,
): Promise<ProductCategoryMutationResult> {
  const actor = await requireCategoryActor();
  if (!actor) {
    return { ok: false, message: "Admin access is not configured or your session has expired." };
  }

  try {
    const category = await createProductCategory(actor, input);
    revalidateCategoryPages(category.id);
    return { ok: true, categoryId: category.id, message: "Category created." };
  } catch (error) {
    return mapCategoryError(error);
  }
}

export async function updateProductCategoryAction(
  input: ProductCategoryUpdateInput,
): Promise<ProductCategoryMutationResult> {
  const actor = await requireCategoryActor();
  if (!actor) {
    return { ok: false, message: "Admin access is not configured or your session has expired." };
  }

  try {
    const category = await updateProductCategory(actor, input);
    revalidateCategoryPages(category.id);
    return { ok: true, categoryId: category.id, message: "Category changes saved." };
  } catch (error) {
    return mapCategoryError(error);
  }
}

async function changeCategoryStatus(categoryId: string, active: boolean) {
  const actor = await requireCategoryActor();
  if (!actor) {
    return { ok: false as const, message: "Admin access is not configured or your session has expired." };
  }

  try {
    const category = await setProductCategoryActive(actor, categoryId, active);
    revalidateCategoryPages(category.id);
    return {
      ok: true as const,
      categoryId: category.id,
      message: active ? "Category restored." : "Category archived.",
    };
  } catch (error) {
    const mapped = mapCategoryError(error);
    return { ok: false as const, message: mapped.message };
  }
}

export async function archiveProductCategoryAction(categoryId: string) {
  return changeCategoryStatus(categoryId, false);
}

export async function restoreProductCategoryAction(categoryId: string) {
  return changeCategoryStatus(categoryId, true);
}
