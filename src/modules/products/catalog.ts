export const initialProductCategories = [
  {
    name: "Electronics",
    slug: "electronics",
    description: "Cameras and other approved electronic products.",
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
