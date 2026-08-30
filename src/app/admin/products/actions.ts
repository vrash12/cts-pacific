"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createProductDraft,
  ProductCommandError,
  setProductArchived,
  updateProduct,
} from "@/modules/products/commands";
import type {
  ProductAdminFormInput,
  ProductUpdateInput,
} from "@/schemas/product";
import { requireAdmin } from "@/server/auth/require-admin";

type ProductFormField = keyof ProductAdminFormInput;

const productFormFields = new Set<ProductFormField>([
  "name",
  "slug",
  "categoryId",
  "description",
  "sku",
  "variantName",
  "price",
  "currency",
  "inventoryPolicy",
  "inventoryQuantity",
]);

export type ProductMutationResult =
  | { ok: true; productId: string; message: string }
  | {
      ok: false;
      message: string;
      fieldErrors?: Partial<Record<ProductFormField, string>>;
    };

export type ProductStatusMutationResult =
  | { ok: true; productId: string; message: string }
  | { ok: false; message: string };

function mapValidationError(error: z.ZodError): ProductMutationResult {
  const fieldErrors: Partial<Record<ProductFormField, string>> = {};

  error.issues.forEach((issue) => {
    const [field] = issue.path;

    if (
      typeof field === "string" &&
      productFormFields.has(field as ProductFormField) &&
      !fieldErrors[field as ProductFormField]
    ) {
      fieldErrors[field as ProductFormField] = issue.message;
    }
  });

  return {
    ok: false,
    message: "Review the highlighted product information.",
    fieldErrors,
  };
}

function readConstraintName(error: unknown) {
  if (!error || typeof error !== "object") {
    return null;
  }

  const record = error as Record<string, unknown>;
  const constraint = record.constraint_name ?? record.constraint;

  return typeof constraint === "string" ? constraint : null;
}

function mapMutationError(error: unknown): ProductMutationResult {
  if (error instanceof z.ZodError) {
    return mapValidationError(error);
  }

  if (error instanceof ProductCommandError) {
    if (error.code === "CATEGORY_INVALID") {
      return {
        ok: false,
        message: "Select an active, approved product category.",
        fieldErrors: {
          categoryId: "This category is unavailable or no longer active.",
        },
      };
    }

    if (error.code === "PRODUCT_CONFLICT") {
      return {
        ok: false,
        message:
          "This product changed after you opened it. Return to the catalog, reopen it, and apply your changes again.",
      };
    }

    return {
      ok: false,
      message:
        error.code === "PRODUCT_NOT_FOUND"
          ? "This product no longer exists. Return to the catalog and refresh."
          : "This product is missing its primary variant and cannot be edited safely.",
    };
  }

  const constraint = readConstraintName(error);

  if (constraint === "products_slug_unique") {
    return {
      ok: false,
      message: "A product already uses this URL slug.",
      fieldErrors: { slug: "Choose a unique product slug." },
    };
  }

  if (constraint === "product_variants_sku_unique") {
    return {
      ok: false,
      message: "A product variant already uses this SKU.",
      fieldErrors: { sku: "Choose a unique SKU." },
    };
  }

  if (
    error instanceof Error &&
    error.message === "ADMIN_CATALOG_WRITE_FORBIDDEN"
  ) {
    return {
      ok: false,
      message: "Your admin role has read-only catalog access.",
    };
  }

  return {
    ok: false,
    message:
      "The product could not be saved. No public storefront content was changed.",
  };
}

async function requireCatalogActor() {
  const access = await requireAdmin();

  if (access.status !== "authorized") {
    return null;
  }

  return access.actor;
}

function revalidateCatalogPages() {
  revalidatePath("/admin");
  revalidatePath("/admin/products");
}

export async function createProductAction(
  input: ProductAdminFormInput,
): Promise<ProductMutationResult> {
  const actor = await requireCatalogActor();

  if (!actor) {
    return {
      ok: false,
      message: "Admin access is not configured or your session has expired.",
    };
  }

  try {
    const product = await createProductDraft(actor, input);
    revalidateCatalogPages();

    return {
      ok: true,
      productId: product.id,
      message: "Draft product created.",
    };
  } catch (error) {
    return mapMutationError(error);
  }
}

export async function updateProductAction(
  input: ProductUpdateInput,
): Promise<ProductMutationResult> {
  const actor = await requireCatalogActor();

  if (!actor) {
    return {
      ok: false,
      message: "Admin access is not configured or your session has expired.",
    };
  }

  try {
    const product = await updateProduct(actor, input);
    revalidateCatalogPages();
    revalidatePath(`/admin/products/${product.id}/edit`);

    return {
      ok: true,
      productId: product.id,
      message: "Product changes saved.",
    };
  } catch (error) {
    return mapMutationError(error);
  }
}

async function changeArchiveStatus(
  productId: string,
  archived: boolean,
): Promise<ProductStatusMutationResult> {
  const actor = await requireCatalogActor();

  if (!actor) {
    return {
      ok: false,
      message: "Admin access is not configured or your session has expired.",
    };
  }

  try {
    const product = await setProductArchived(actor, productId, archived);
    revalidateCatalogPages();
    revalidatePath(`/admin/products/${product.id}/edit`);

    return {
      ok: true,
      productId: product.id,
      message: archived
        ? "Product archived."
        : "Product restored to draft.",
    };
  } catch (error) {
    const mapped = mapMutationError(error);
    return { ok: false, message: mapped.message };
  }
}

export async function archiveProductAction(productId: string) {
  return changeArchiveStatus(productId, true);
}

export async function restoreProductAction(productId: string) {
  return changeArchiveStatus(productId, false);
}
