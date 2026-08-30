import { describe, expect, it } from "vitest";

import {
  productAdminFormSchema,
  productUpdateSchema,
} from "@/schemas/product";

const validProduct = {
  name: "Client approved camera",
  slug: "client-approved-camera",
  categoryId: "10000000-0000-4000-8000-000000000001",
  description: "",
  sku: "CAMERA-001",
  variantName: "Default",
  price: "1250.75",
  currency: "USD" as const,
  inventoryPolicy: "TRACK" as const,
  inventoryQuantity: 4,
};

describe("product administration validation", () => {
  it("accepts a draft-ready catalog entry", () => {
    expect(productAdminFormSchema.safeParse(validProduct).success).toBe(true);
  });

  it("rejects imprecise or malformed display prices", () => {
    expect(
      productAdminFormSchema.safeParse({ ...validProduct, price: "12.345" })
        .success,
    ).toBe(false);
    expect(
      productAdminFormSchema.safeParse({ ...validProduct, price: "1e3" })
        .success,
    ).toBe(false);
    expect(
      productAdminFormSchema.safeParse({ ...validProduct, price: "-1.00" })
        .success,
    ).toBe(false);
  });

  it("rejects unsafe slugs, SKUs, and negative inventory", () => {
    expect(
      productAdminFormSchema.safeParse({
        ...validProduct,
        slug: "Camera Product",
      }).success,
    ).toBe(false);
    expect(
      productAdminFormSchema.safeParse({
        ...validProduct,
        sku: "CAMERA 001",
      }).success,
    ).toBe(false);
    expect(
      productAdminFormSchema.safeParse({
        ...validProduct,
        inventoryQuantity: -1,
      }).success,
    ).toBe(false);
  });

  it("requires update identity and a timezone-aware revision timestamp", () => {
    expect(
      productUpdateSchema.safeParse({
        ...validProduct,
        productId: "20000000-0000-4000-8000-000000000001",
        lastKnownUpdatedAt: "2026-08-30T12:00:00.000Z",
      }).success,
    ).toBe(true);
    expect(
      productUpdateSchema.safeParse({
        ...validProduct,
        productId: "not-a-uuid",
        lastKnownUpdatedAt: "yesterday",
      }).success,
    ).toBe(false);
  });
});
