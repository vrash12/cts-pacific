import { describe, expect, it } from "vitest";

import {
  formatMinorUnitsForInput,
  formatMoney,
  parsePriceToMinorUnits,
} from "@/modules/products/money";

describe("product money helpers", () => {
  it("converts decimal input to exact integer minor units", () => {
    expect(parsePriceToMinorUnits("0")).toBe(0);
    expect(parsePriceToMinorUnits("12.3")).toBe(1230);
    expect(parsePriceToMinorUnits("12.34")).toBe(1234);
    expect(parsePriceToMinorUnits("9999999.99")).toBe(999_999_999);
  });

  it("formats minor units for a form without losing trailing zeroes", () => {
    expect(formatMinorUnitsForInput(0)).toBe("0.00");
    expect(formatMinorUnitsForInput(1230)).toBe("12.30");
  });

  it("formats known currencies and safely falls back for unknown codes", () => {
    expect(formatMoney(1250, "USD")).toContain("12.50");
    expect(formatMoney(1250, "INVALID")).toBe("INVALID 12.50");
  });
});
