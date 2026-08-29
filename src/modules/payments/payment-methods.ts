export const supportedPaymentMethods = [
  {
    value: "PAYPAL",
    label: "PayPal",
    provider: "PAYPAL",
    publicDescription: "Continue securely with PayPal.",
  },
  {
    value: "CARD",
    label: "Credit or debit card",
    provider: "PAYPAL",
    publicDescription: "Pay securely by card through hosted payment fields.",
  },
] as const;

export type SupportedPaymentMethod =
  (typeof supportedPaymentMethods)[number]["value"];
