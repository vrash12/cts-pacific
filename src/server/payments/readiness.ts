import "server-only";

import { readServerEnvironment } from "@/config/env/server";

export function getPaymentReadiness() {
  const environment = readServerEnvironment();
  const credentialsConfigured = Boolean(
    environment.PAYPAL_CLIENT_ID && environment.PAYPAL_CLIENT_SECRET,
  );
  const webhookConfigured = Boolean(environment.PAYPAL_WEBHOOK_ID);

  return {
    environment: environment.PAYPAL_ENVIRONMENT,
    paypal: {
      configured: credentialsConfigured && webhookConfigured,
      credentialsConfigured,
      webhookConfigured,
    },
    card: {
      configured:
        credentialsConfigured &&
        webhookConfigured &&
        environment.PAYPAL_CARD_PAYMENTS_ENABLED,
      merchantEligibilityConfirmed:
        environment.PAYPAL_CARD_PAYMENTS_ENABLED,
    },
  } as const;
}
