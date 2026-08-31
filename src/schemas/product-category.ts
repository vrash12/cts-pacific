import { z } from "zod";

const categoryNameSchema = z
  .string()
  .trim()
  .min(2, "Enter a category name.")
  .max(100, "Keep the category name under 100 characters.");

const categorySlugSchema = z
  .string()
  .trim()
  .min(2, "Enter a category slug.")
  .max(100, "Keep the slug under 100 characters.")
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Use lowercase letters, numbers, and single hyphens only.",
  );

export const productCategoryAdminFormSchema = z.object({
  name: categoryNameSchema,
  slug: categorySlugSchema,
  description: z
    .string()
    .trim()
    .max(1000, "Keep the description under 1,000 characters."),
  displayOrder: z
    .number({ error: "Enter a display order." })
    .int("Display order must be a whole number.")
    .min(0, "Display order cannot be negative.")
    .max(9999, "Display order is above the supported limit."),
});

export const productCategoryUpdateSchema =
  productCategoryAdminFormSchema.extend({
    categoryId: z.uuid("The category identifier is invalid."),
    lastKnownUpdatedAt: z.iso.datetime({ offset: true }),
  });

export const productCategoryIdSchema = z.uuid(
  "The category identifier is invalid.",
);

export type ProductCategoryAdminFormInput = z.infer<
  typeof productCategoryAdminFormSchema
>;
export type ProductCategoryUpdateInput = z.infer<
  typeof productCategoryUpdateSchema
>;
