import { z } from "zod";

import { initialProductCategorySlugs } from "@/modules/products/catalog";

const productCategorySlugSchema = z.enum(initialProductCategorySlugs);

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
