import { ArrowLeft, Building2, CalendarClock, Mail, MapPin, Phone, UserRound } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { AdminLeadNotice } from "@/components/admin/admin-lead-notice";
import { AdminLeadStatus } from "@/components/admin/admin-lead-status";
import { AdminLeadStatusForm } from "@/components/admin/admin-lead-status-form";
import { AdminShell } from "@/components/admin/admin-shell";
import { formatLeadDate, humanizeLeadValue } from "@/modules/leads/presentation";
import { getAdminQuoteRequest } from "@/modules/leads/queries";
import { leadIdSchema } from "@/schemas/lead-admin";
import { canManageLeads } from "@/server/auth/roles";
import { requireAdmin } from "@/server/auth/require-admin";

import { updateQuoteLeadStatusAction } from "../../actions";

export const dynamic = "force-dynamic";

type AdminQuoteDetailPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AdminQuoteDetailPage({
  params,
  searchParams,
}: AdminQuoteDetailPageProps) {
  const access = await requireAdmin();

  if (access.status !== "authorized" || !canManageLeads(access.actor.role)) {
    redirect("/admin");
  }

  const { id } = await params;
  const parsedId = leadIdSchema.safeParse(id);

  if (!parsedId.success) {
    notFound();
  }

  const [request, resolvedSearchParams] = await Promise.all([
    getAdminQuoteRequest(access.actor, parsedId.data),
    searchParams,
  ]);

  if (!request) {
    notFound();
  }

  const facts = [
    { label: "Contact", value: request.contactName, icon: UserRound },
    { label: "Company", value: request.company ?? "Not supplied", icon: Building2 },
    { label: "Location", value: request.projectLocation, icon: MapPin },
    { label: "Project type", value: humanizeLeadValue(request.projectType), icon: Building2 },
    { label: "Timeline", value: humanizeLeadValue(request.targetTimeline), icon: CalendarClock },
    { label: "Received", value: `${formatLeadDate(request.createdAt)} ChST`, icon: CalendarClock },
  ] as const;

  return (
    <AdminShell actor={access.actor}>
      <Link className="inline-flex min-h-10 items-center gap-2 text-xs font-extrabold uppercase tracking-[0.1em] text-[var(--color-brand-blue)]" href="/admin/leads/quotes">
        <ArrowLeft aria-hidden="true" size={16} /> Back to quote requests
      </Link>

      <section className="mt-6 grid gap-8 border-b border-[var(--color-border)] pb-10 lg:grid-cols-[1fr_auto] lg:items-start">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <AdminLeadStatus status={request.status} />
            <span className="font-mono text-xs text-[var(--color-ink-muted)]">{request.referenceNumber}</span>
          </div>
          <h1 className="mt-5 max-w-5xl text-[clamp(2.8rem,5.4vw,5.2rem)] uppercase text-[var(--color-brand-navy)]">
            {request.contactName}&apos;s project request.
          </h1>
        </div>
        <div className="grid gap-2 text-sm">
          <a className="inline-flex min-h-11 items-center gap-2 text-[var(--color-brand-blue)]" href={`mailto:${request.email}`}><Mail aria-hidden="true" size={17} />{request.email}</a>
          <a className="inline-flex min-h-11 items-center gap-2 text-[var(--color-brand-blue)]" href={`tel:${request.phone}`}><Phone aria-hidden="true" size={17} />{request.phone}</a>
        </div>
      </section>

      <AdminLeadNotice error={resolvedSearchParams.error} updated={resolvedSearchParams.updated} />

      <div className="grid gap-8 py-10 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="grid gap-8">
          <section aria-labelledby="quote-facts-title" className="border border-[var(--color-border)] bg-white p-6 sm:p-8">
            <h2 className="text-2xl uppercase text-[var(--color-brand-navy)]" id="quote-facts-title">Project information</h2>
            <dl className="mt-6 grid gap-px border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-2">
              {facts.map((fact) => (
                <div className="bg-white p-5" key={fact.label}>
                  <dt className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.09em] text-[var(--color-ink-muted)]"><fact.icon aria-hidden="true" size={15} />{fact.label}</dt>
                  <dd className="mt-3 font-semibold leading-6 text-[var(--color-brand-navy)]">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="quote-services-title" className="border border-[var(--color-border)] bg-white p-6 sm:p-8">
            <h2 className="text-2xl uppercase text-[var(--color-brand-navy)]" id="quote-services-title">Requested services</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {request.services.map((service) => (
                <span className="bg-[var(--color-surface-muted)] px-4 py-2 text-xs font-extrabold uppercase tracking-[0.08em] text-[var(--color-brand-navy)]" key={service}>{humanizeLeadValue(service)}</span>
              ))}
            </div>
          </section>

          <section aria-labelledby="quote-description-title" className="border border-[var(--color-border)] bg-white p-6 sm:p-8">
            <h2 className="text-2xl uppercase text-[var(--color-brand-navy)]" id="quote-description-title">Project description</h2>
            <p className="mt-5 whitespace-pre-wrap text-base leading-8 text-[var(--color-ink-muted)]">{request.description}</p>
          </section>
        </div>

        <aside aria-label="Quote request actions">
          <AdminLeadStatusForm action={updateQuoteLeadStatusAction} leadId={request.id} status={request.status} />
        </aside>
      </div>
    </AdminShell>
  );
}
