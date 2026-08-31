import { leadStatusLabels } from "@/modules/leads/presentation";
import type { LeadStatus } from "@/schemas/lead-admin";

const statusClasses: Record<LeadStatus, string> = {
  NEW: "bg-sky-100 text-sky-900",
  REVIEWING: "bg-amber-100 text-amber-900",
  CONTACTED: "bg-violet-100 text-violet-900",
  CLOSED: "bg-slate-200 text-slate-800",
};

export function AdminLeadStatus({ status }: { status: LeadStatus }) {
  return (
    <span
      className={`inline-flex min-h-7 items-center px-3 text-[0.65rem] font-extrabold uppercase tracking-[0.09em] ${statusClasses[status]}`}
    >
      {leadStatusLabels[status]}
    </span>
  );
}
