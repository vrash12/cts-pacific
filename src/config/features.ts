import { publicEnvironment } from "@/config/env/public";

export const featureFlags = {
  ecommerce: publicEnvironment.NEXT_PUBLIC_ECOMMERCE_ENABLED,
} as const;

