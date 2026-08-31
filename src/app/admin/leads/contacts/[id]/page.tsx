import { ArrowLeft, Building2, CalendarClock, Mail, MessageSquareText, Phone, UserRound } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { AdminLeadNotice } from "@/components/admin/admin-lead-notice";
import { AdminLeadStatus } from "@/components/admin/admin-lead-status";
import { AdminLeadStatusForm } from "@/components/admin/admin-lead-status-form";
import { AdminShell } from "@/components/admin/admin-shell";
import { formatLeadDate, humanizeLeadValue } from "@/modules/leads/presentation";
import { getAdminContactSubmission } from "@/modules/leads/queries";
import { leadIdSchema } from "@/schemas/lead-admin";
import { canManageLeads } from "@/server/auth/roles";
import { requireAdmin } from "@/server/auth/require-admin";

import { updateContactLeadStatusAction } from "../../actions";

export const dynamic = "force-dynamic";

type AdminContactDetailPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AdminContactDetailPage({ params, searchParams }: AdminContactDetailPageProps) {
  const access = await requireAdmin();

  if (access.status !== "authorized" || !canManageLeads(access.actor.role)) {
    redirect("/admin");
  }

  const { id } = await params;
  const parsedId = leadIdSchema.safeParse(id);

  if (!parsedId.success) {
    notFound();
  }

  const [submission, resolvedSearchParams] = await Promise.all([
    getAdminContactSubmission(access.actor, parsedId.data),
    searchParams,
  ]);

  if (!submission) {
    notFound();
  }

  const facts = [
    { label: "Contact", value: submission.name, icon: UserRound },
    { label: "Company", value: submission.company ?? "Not supplied", icon: Building2 },
    { label: "Inquiry type", value: humanizeLeadValue(submission.inquiryType), icon: MessageSquareText },
    { label: "Received", value: `${formatLeadDate(submission.createdAt)} ChST`, icon: CalendarClock },
  ] as const;

  return (
    <AdminShell actor={access.actor}>
      <Link className="inline-flex min-h-10 items-center gap-2 text-xs font-extrabold uppercase tracking-[0.1em] text-[var(--color-brand-blue)]" href="/admin/leads/contacts">
        <ArrowLeft aria-hidden="true" size={16} /> Back to contact inquiries
      </Link>

      <section className="mt-6 grid gap-8 border-b border-[var(--color-border)] pb-10 lg:grid-cols-[1fr_auto] lg:items-start">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <AdminLeadStatus status={submission.status} />
            <span className="font-mono text-xs text-[var(--color-ink-muted)]">{submission.referenceNumber}</span>
          </div>
          <h1 className="mt-5 max-w-5xl text-[clamp(2.8rem,5.4vw,5.2rem)] uppercase text-[var(--color-brand-navy)]">
            {submission.subject}
          </h1>
        </div>
        <div className="grid gap-2 text-sm">
          <a className="inline-flex min-h-11 items-center gap-2 text-[var(--color-brand-blue)]" href={`mailto:${submission.email}`}><Mail aria-hidden="true" size={17} />{submission.email}</a>
          {submission.phone ? (
            <a className="inline-flex min-h-11 items-center gap-2 text-[var(--color-brand-blue)]" href={`tel:${submission.phone}`}><Phone aria-hidden="true" size={17} />{submission.phone}</a>
          ) : null}
        </div>
      </section>

      <AdminLeadNotice error={resolvedSearchParams.error} updated={resolvedSearchParams.updated} />

      <div className="grid gap-8 py-10 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="grid gap-8">
          <section aria-labelledby="contact-facts-title" className="border border-[var(--color-border)] bg-white p-6 sm:p-8">
            <h2 className="text-2xl uppercase text-[var(--color-brand-navy)]" id="contact-facts-title">Contact information</h2>
            <dl className="mt-6 grid gap-px border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-2">
              {facts.map((fact) => (
                <div className="bg-white p-5" key={fact.label}>
                  <dt className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.09em] text-[var(--color-ink-muted)]"><fact.icon aria-hidden="true" size={15} />{fact.label}</dt>
                  <dd className="mt-3 font-semibold leading-6 text-[var(--color-brand-navy)]">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="contact-message-title" className="border border-[var(--color-border)] bg-white p-6 sm:p-8">
            <h2 className="text-2xl uppercase text-[var(--color-brand-navy)]" id="contact-message-title">Message</h2>
            <p className="mt-5 whitespace-pre-wrap text-base leading-8 text-[var(--color-ink-muted)]">{submission.message}</p>
          </section>
        </div>

        <aside aria-label="Contact inquiry actions">
          <AdminLeadStatusForm action={updateContactLeadStatusAction} leadId={submission.id} status={submission.status} />
        </aside>
      </div>
    </AdminShell>
  );
}
