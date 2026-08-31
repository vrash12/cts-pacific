import "server-only";

import { z } from "zod";

const serverEnvironmentSchema = z.object({
  DATABASE_URL: z.string().min(1).optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
  PAYPAL_CLIENT_ID: z.string().min(1).optional(),
  PAYPAL_CLIENT_SECRET: z.string().min(1).optional(),
  PAYPAL_WEBHOOK_ID: z.string().min(1).optional(),
  PAYPAL_ENVIRONMENT: z.enum(["sandbox", "live"]).default("sandbox"),
  PAYPAL_CARD_PAYMENTS_ENABLED: z
    .enum(["true", "false"])
    .default("false")
    .transform((value) => value === "true"),
  EMAIL_API_KEY: z.string().min(1).optional(),
  EMAIL_FROM: z.string().min(3).optional(),
  QUOTE_NOTIFICATION_EMAIL: z
    .email()
    .default("info@corerintechnicalsolutions.com"),
  CONTACT_NOTIFICATION_EMAIL: z
    .email()
    .default("info@corerintechnicalsolutions.com"),
  TURNSTILE_SITE_KEY: z.string().min(1).optional(),
  TURNSTILE_SECRET_KEY: z.string().min(1).optional(),
  AI_API_KEY: z.string().min(1).optional(),
});

export type ServerEnvironment = z.infer<typeof serverEnvironmentSchema>;

export function readServerEnvironment(): ServerEnvironment {
  return serverEnvironmentSchema.parse({
    DATABASE_URL: process.env.DATABASE_URL || undefined,
    SUPABASE_SERVICE_ROLE_KEY:
      process.env.SUPABASE_SERVICE_ROLE_KEY || undefined,
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || undefined,
    PAYPAL_CLIENT_SECRET: process.env.PAYPAL_CLIENT_SECRET || undefined,
    PAYPAL_WEBHOOK_ID: process.env.PAYPAL_WEBHOOK_ID || undefined,
    PAYPAL_ENVIRONMENT: process.env.PAYPAL_ENVIRONMENT,
    PAYPAL_CARD_PAYMENTS_ENABLED:
      process.env.PAYPAL_CARD_PAYMENTS_ENABLED,
    EMAIL_API_KEY: process.env.EMAIL_API_KEY || undefined,
    EMAIL_FROM: process.env.EMAIL_FROM || undefined,
    QUOTE_NOTIFICATION_EMAIL: process.env.QUOTE_NOTIFICATION_EMAIL,
    CONTACT_NOTIFICATION_EMAIL: process.env.CONTACT_NOTIFICATION_EMAIL,
    TURNSTILE_SITE_KEY: process.env.TURNSTILE_SITE_KEY || undefined,
    TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY || undefined,
    AI_API_KEY: process.env.AI_API_KEY || undefined,
  });
}
