import { CreditCard, WalletCards } from "lucide-react";

import { featureFlags } from "@/config/features";
import { supportedPaymentMethods } from "@/modules/payments/payment-methods";

type PaymentMethodButtonsProps = {
  disabled?: boolean;
  name?: string;
};

export function PaymentMethodButtons({
  disabled = false,
  name = "paymentMethod",
}: PaymentMethodButtonsProps) {
  if (!featureFlags.ecommerce) {
    return null;
  }

  return (
    <fieldset disabled={disabled}>
      <legend className="text-sm font-extrabold uppercase tracking-[0.1em] text-[var(--color-brand-navy)]">
        Payment method
      </legend>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {supportedPaymentMethods.map((method) => {
          const Icon = method.value === "PAYPAL" ? WalletCards : CreditCard;

          return (
            <label className="flex min-h-16 cursor-pointer items-center gap-3 border border-[var(--color-border-strong)] bg-white px-5 has-[:checked]:border-[var(--color-brand-blue)] has-[:checked]:ring-2 has-[:checked]:ring-[var(--color-brand-blue)]/20" key={method.value}>
              <input name={name} required type="radio" value={method.value} />
              <Icon aria-hidden="true" size={20} />
              <span className="font-bold">{method.label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
