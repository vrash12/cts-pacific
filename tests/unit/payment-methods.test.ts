import { describe, expect, it } from "vitest";

import { supportedPaymentMethods } from "@/modules/payments/payment-methods";

describe("commerce payment methods", () => {
  it("prepares only PayPal and card payment choices", () => {
    expect(supportedPaymentMethods.map((method) => method.value)).toEqual([
      "PAYPAL",
      "CARD",
    ]);
  });

  it("routes both choices through the selected PayPal provider architecture", () => {
    expect(
      supportedPaymentMethods.every((method) => method.provider === "PAYPAL"),
    ).toBe(true);
  });

  it("does not define raw card-data fields", () => {
    const serialized = JSON.stringify(supportedPaymentMethods).toLowerCase();

    expect(serialized).not.toContain("cvv");
    expect(serialized).not.toContain("cardnumber");
  });
});
