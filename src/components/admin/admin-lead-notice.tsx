type AdminLeadNoticeProps = {
  error?: string | string[];
  updated?: string | string[];
};

export function AdminLeadNotice({ error, updated }: AdminLeadNoticeProps) {
  if (error) {
    return (
      <p
        className="mt-8 border-l-4 border-red-700 bg-red-50 px-5 py-4 text-sm font-semibold text-red-900"
        role="alert"
      >
        The lead status could not be updated. Refresh the record and try again.
      </p>
    );
  }

  if (updated === "1") {
    return (
      <p
        className="mt-8 border-l-4 border-emerald-700 bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-900"
        role="status"
      >
        Lead status updated and recorded in the audit log.
      </p>
    );
  }

  return null;
}
