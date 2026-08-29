import { describe, expect, it } from "vitest";

import {
  initialProductCategories,
  initialProductCategorySlugs,
} from "@/modules/products/catalog";
import { productDraftSchema } from "@/schemas/product";

const validDraft = {
  name: "Client supplied product",
  slug: "client-supplied-product",
  categorySlug: "electronics" as const,
  description: "Approved product information will be supplied by the client.",
  sku: "CLIENT-SKU",
  variantName: "Default",
  priceMinor: 12500,
  currency: "usd",
  inventoryPolicy: "TRACK" as const,
  inventoryQuantity: 0,
};

describe("commerce catalog foundation", () => {
  it("contains only the two client-requested initial categories", () => {
    expect(initialProductCategories.map((category) => category.name)).toEqual([
      "Electronics",
      "Construction Equipment",
    ]);
    expect(initialProductCategorySlugs).toEqual([
      "electronics",
      "construction-equipment",
    ]);
  });

  it("accepts integer minor-unit prices and normalizes ISO currency", () => {
    const result = productDraftSchema.parse(validDraft);

    expect(result.priceMinor).toBe(12500);
    expect(result.currency).toBe("USD");
  });

  it("rejects floating-point or negative prices", () => {
    expect(
      productDraftSchema.safeParse({ ...validDraft, priceMinor: 12.5 }).success,
    ).toBe(false);
    expect(
      productDraftSchema.safeParse({ ...validDraft, priceMinor: -1 }).success,
    ).toBe(false);
  });

  it("rejects unapproved initial categories", () => {
    expect(
      productDraftSchema.safeParse({
        ...validDraft,
        categorySlug: "invented-category",
      }).success,
    ).toBe(false);
  });
});
