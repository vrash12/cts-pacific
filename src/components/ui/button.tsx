import type { ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex min-h-12 items-center justify-center gap-2 border px-6 text-sm font-bold tracking-[0.08em] uppercase transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "border-[var(--color-brand-blue)] bg-[var(--color-brand-blue)] text-white hover:border-[var(--color-brand-navy)] hover:bg-[var(--color-brand-navy)]",
        secondary:
          "border-[var(--color-border-strong)] bg-transparent text-[var(--color-ink)] hover:bg-[var(--color-surface-muted)]",
        inverse:
          "border-white bg-white text-[var(--color-brand-navy)] hover:border-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue)] hover:text-white",
        ghost:
          "border-transparent bg-transparent px-0 text-current hover:text-[var(--color-brand-blue)]",
      },
      size: {
        default: "min-h-12 px-6",
        large: "min-h-14 px-7",
        compact: "min-h-11 px-4 text-xs",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

