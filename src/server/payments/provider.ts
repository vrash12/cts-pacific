import "server-only";

import type { SupportedPaymentMethod } from "@/modules/payments/payment-methods";

export type AuthoritativePaymentAmount = {
  amountMinor: number;
  currency: string;
};

export type CreateProviderOrderInput = {
  orderId: string;
  idempotencyKey: string;
  method: SupportedPaymentMethod;
  amount: AuthoritativePaymentAmount;
};

export type ProviderOrder = {
  provider: "PAYPAL";
  providerOrderId: string;
  status: "CREATED" | "APPROVED";
};

export interface PaymentProviderAdapter {
  createOrder(input: CreateProviderOrderInput): Promise<ProviderOrder>;
  captureOrder(providerOrderId: string, idempotencyKey: string): Promise<void>;
  verifyWebhook(headers: Headers, rawBody: string): Promise<boolean>;
}

// Implementations must receive amount from an order loaded on the server.
// Product prices, totals, payment status, and card data are never accepted
// from the browser as authoritative values.
