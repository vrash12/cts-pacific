import { productPriceInputSchema } from "@/schemas/product";

export function parsePriceToMinorUnits(input: string) {
  const price = productPriceInputSchema.parse(input);
  const [whole, fraction = ""] = price.split(".");

  return Number(whole) * 100 + Number(fraction.padEnd(2, "0"));
}

export function formatMinorUnitsForInput(amount: number) {
  const whole = Math.floor(amount / 100);
  const fraction = String(amount % 100).padStart(2, "0");

  return `${whole}.${fraction}`;
}

export function formatMoney(amount: number, currency: string) {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(amount / 100);
  } catch {
    return `${currency} ${(amount / 100).toFixed(2)}`;
  }
}
