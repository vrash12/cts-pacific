import { z } from "zod";

import { initialProductCategorySlugs } from "@/modules/products/catalog";

const productCategorySlugSchema = z.enum(initialProductCategorySlugs);

const productNameSchema = z
  .string()
  .trim()
  .min(2, "Enter a product name.")
  .max(120, "Keep the product name under 120 characters.");

const productSlugSchema = z
  .string()
  .trim()
  .min(2, "Enter a product slug.")
  .max(140, "Keep the slug under 140 characters.")
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Use lowercase letters, numbers, and single hyphens only.",
  );

const skuSchema = z
  .string()
  .trim()
  .min(2, "Enter a SKU.")
  .max(80, "Keep the SKU under 80 characters.")
  .regex(
    /^[A-Za-z0-9][A-Za-z0-9._-]*$/,
    "Use letters, numbers, periods, underscores, and hyphens only.",
  );

export const productPriceInputSchema = z
  .string()
  .trim()
  .regex(
    /^(?:0|[1-9]\d{0,6})(?:\.\d{1,2})?$/,
    "Enter a valid amount with no more than two decimal places.",
  );

export const productAdminFormSchema = z.object({
  name: productNameSchema,
  slug: productSlugSchema,
  categoryId: z.uuid("Select an approved product category."),
  description: z
    .string()
    .trim()
    .max(4000, "Keep the description under 4,000 characters."),
  sku: skuSchema,
  variantName: z
    .string()
    .trim()
    .min(1, "Enter a variant name.")
    .max(120, "Keep the variant name under 120 characters."),
  price: productPriceInputSchema,
  currency: z.literal("USD"),
  inventoryPolicy: z.enum(["TRACK", "DO_NOT_TRACK"]),
  inventoryQuantity: z
    .number({ error: "Enter an inventory quantity." })
    .int("Inventory must be a whole number.")
    .min(0, "Inventory cannot be negative.")
    .max(2_147_483_647, "Inventory is above the supported limit."),
});

export const productUpdateSchema = productAdminFormSchema.extend({
  productId: z.uuid("The product identifier is invalid."),
  lastKnownUpdatedAt: z.iso.datetime({ offset: true }),
});

export const productIdSchema = z.uuid("The product identifier is invalid.");

export const productDraftSchema = z.object({
  name: z.string().trim().min(2).max(120),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(140)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  categorySlug: productCategorySlugSchema,
  description: z.string().trim().max(4000).optional(),
  sku: z.string().trim().min(2).max(80),
  variantName: z.string().trim().min(1).max(120),
  priceMinor: z.number().int().nonnegative(),
  currency: z
    .string()
    .trim()
    .length(3)
    .transform((value) => value.toUpperCase())
    .pipe(z.string().regex(/^[A-Z]{3}$/)),
  inventoryPolicy: z.enum(["TRACK", "DO_NOT_TRACK"]),
  inventoryQuantity: z.number().int().nonnegative(),
});

export type ProductDraftInput = z.infer<typeof productDraftSchema>;
export type ProductAdminFormInput = z.infer<typeof productAdminFormSchema>;
export type ProductUpdateInput = z.infer<typeof productUpdateSchema>;
