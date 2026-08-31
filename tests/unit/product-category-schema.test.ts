import { describe, expect, it } from "vitest";

import { productCategoryAdminFormSchema } from "@/schemas/product-category";

const validCategory = {
  name: "Cameras",
  slug: "cameras",
  description: "Client-approved camera products.",
  displayOrder: 0,
};

describe("product category admin schema", () => {
  it("accepts a valid private catalog category", () => {
    expect(productCategoryAdminFormSchema.parse(validCategory)).toEqual(
      validCategory,
    );
  });

  it("rejects unsafe slugs", () => {
    expect(
      productCategoryAdminFormSchema.safeParse({
        ...validCategory,
        slug: "Cameras & Equipment",
      }).success,
    ).toBe(false);
  });

  it("rejects negative and fractional display order values", () => {
    expect(
      productCategoryAdminFormSchema.safeParse({
        ...validCategory,
        displayOrder: -1,
      }).success,
    ).toBe(false);
    expect(
      productCategoryAdminFormSchema.safeParse({
        ...validCategory,
        displayOrder: 1.5,
      }).success,
    ).toBe(false);
  });
});
