import Link from "next/link";

type AdminLeadNavLinkProps = {
  newLeadCount: number;
};

export function AdminLeadNavLink({ newLeadCount }: AdminLeadNavLinkProps) {
  const normalizedCount = Math.max(0, Math.trunc(newLeadCount));
  const visibleCount = normalizedCount > 99 ? "99+" : String(normalizedCount);

  return (
    <Link
      aria-label={
        normalizedCount > 0
          ? `Leads, ${normalizedCount} new ${normalizedCount === 1 ? "lead" : "leads"}`
          : "Leads"
      }
      className="inline-flex min-h-10 shrink-0 items-center gap-2 px-4 text-xs font-extrabold uppercase tracking-[0.1em] text-white/75 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
      href="/admin/leads"
    >
      Leads
      {normalizedCount > 0 ? (
        <span className="inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-[#78d2d4] px-1.5 text-[0.62rem] leading-none tracking-normal text-[var(--color-brand-navy-deep)] shadow-[0_0_0_2px_rgb(255_255_255_/_0.12)]">
          <span aria-hidden="true">{visibleCount}</span>
        </span>
      ) : null}
    </Link>
  );
}
