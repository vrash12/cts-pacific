export const initialProductCategories = [
  {
    name: "Cameras",
    slug: "cameras",
    description: "Client-approved camera products prepared for future catalog entry.",
  },
  {
    name: "Electronics",
    slug: "electronics",
    description: "Client-approved electronic products prepared for future catalog entry.",
  },
  {
    name: "Construction Equipment",
    slug: "construction-equipment",
    description: "Approved construction equipment offered for sale.",
  },
] as const;

export const initialProductCategorySlugs = initialProductCategories.map(
  (category) => category.slug,
);

export type InitialProductCategorySlug =
  (typeof initialProductCategories)[number]["slug"];
