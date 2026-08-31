import { leadStatusLabels } from "@/modules/leads/presentation";
import {
  type LeadStatus,
  leadStatusOptions,
} from "@/schemas/lead-admin";

type AdminLeadStatusFormProps = {
  action: (formData: FormData) => Promise<void>;
  leadId: string;
  status: LeadStatus;
};

export function AdminLeadStatusForm({
  action,
  leadId,
  status,
}: AdminLeadStatusFormProps) {
  return (
    <form
      action={action}
      className="border-t-4 border-[var(--color-brand-blue)] bg-white p-6 shadow-[0_0.8rem_2rem_rgb(11_41_66_/_0.06)]"
    >
      <input name="leadId" type="hidden" value={leadId} />
      <label
        className="block text-xs font-extrabold uppercase tracking-[0.1em] text-[var(--color-brand-navy)]"
        htmlFor={`lead-status-${leadId}`}
      >
        Lead status
      </label>
      <select
        className="mt-3 min-h-12 w-full border border-[var(--color-border-strong)] bg-white px-3 text-sm text-[var(--color-brand-navy)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]"
        defaultValue={status}
        id={`lead-status-${leadId}`}
        name="status"
      >
        {leadStatusOptions.map((option) => (
          <option key={option} value={option}>
            {leadStatusLabels[option]}
          </option>
        ))}
      </select>
      <button
        className="mt-4 inline-flex min-h-12 w-full items-center justify-center bg-[var(--color-brand-navy)] px-5 text-xs font-extrabold uppercase tracking-[0.1em] text-white transition hover:bg-[var(--color-brand-blue)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2"
        type="submit"
      >
        Save status
      </button>
      <p className="mt-3 text-xs leading-5 text-[var(--color-ink-muted)]">
        Every status change is recorded in the administrative audit log.
      </p>
    </form>
  );
}
