import Link from "next/link";

import { leadStatusLabels } from "@/modules/leads/presentation";
import {
  type LeadStatus,
  leadStatusOptions,
} from "@/schemas/lead-admin";

type AdminLeadFiltersProps = {
  basePath: string;
  currentStatus?: LeadStatus;
};

export function AdminLeadFilters({
  basePath,
  currentStatus,
}: AdminLeadFiltersProps) {
  const filters: { label: string; status?: LeadStatus }[] = [
    { label: "All" },
    ...leadStatusOptions.map((status) => ({
      label: leadStatusLabels[status],
      status,
    })),
  ];

  return (
    <nav aria-label="Filter leads by status" className="flex flex-wrap gap-2">
      {filters.map((filter) => {
        const active = filter.status === currentStatus;
        const href = filter.status
          ? `${basePath}?status=${filter.status}`
          : basePath;

        return (
          <Link
            aria-current={active ? "page" : undefined}
            className={`inline-flex min-h-10 items-center border px-4 text-xs font-extrabold uppercase tracking-[0.08em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] ${
              active
                ? "border-[var(--color-brand-navy)] bg-[var(--color-brand-navy)] text-white"
                : "border-[var(--color-border-strong)] bg-white text-[var(--color-brand-navy)] hover:border-[var(--color-brand-blue)]"
            }`}
            href={href}
            key={filter.label}
          >
            {filter.label}
          </Link>
        );
      })}
    </nav>
  );
}
