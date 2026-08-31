import { ArrowRight, Mail } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { AdminLeadFilters } from "@/components/admin/admin-lead-filters";
import { AdminLeadNotice } from "@/components/admin/admin-lead-notice";
import { AdminLeadStatus } from "@/components/admin/admin-lead-status";
import { AdminShell } from "@/components/admin/admin-shell";
import {
  formatLeadDate,
  humanizeLeadValue,
} from "@/modules/leads/presentation";
import { getAdminContactSubmissions } from "@/modules/leads/queries";
import { leadStatusSchema } from "@/schemas/lead-admin";
import { canManageLeads } from "@/server/auth/roles";
import { requireAdmin } from "@/server/auth/require-admin";

export const dynamic = "force-dynamic";

type AdminContactsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AdminContactsPage({ searchParams }: AdminContactsPageProps) {
  const access = await requireAdmin();

  if (access.status !== "authorized" || !canManageLeads(access.actor.role)) {
    redirect("/admin");
  }

  const resolvedSearchParams = await searchParams;
  const parsedStatus = leadStatusSchema.safeParse(resolvedSearchParams.status);
  const currentStatus = parsedStatus.success ? parsedStatus.data : undefined;
  const submissions = await getAdminContactSubmissions(access.actor, currentStatus);

  return (
    <AdminShell actor={access.actor}>
      <section className="grid gap-7 border-b border-[var(--color-border)] pb-10 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="mb-4 flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--color-brand-teal)]">
            <Mail aria-hidden="true" size={16} />
            Lead operations
          </p>
          <h1 className="max-w-4xl text-[clamp(3rem,6vw,5.8rem)] uppercase text-[var(--color-brand-navy)]">
            Contact inquiries.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--color-ink-muted)]">
            Review the latest 100 general, service, and coordination inquiries submitted from the public contact page.
          </p>
        </div>
        <Link className="text-xs font-extrabold uppercase tracking-[0.1em] text-[var(--color-brand-blue)] hover:underline" href="/admin/leads">
          All lead inboxes
        </Link>
      </section>

      <AdminLeadNotice error={resolvedSearchParams.error} />

      <section aria-labelledby="contact-list-title" className="py-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-5">
          <h2 className="text-3xl uppercase text-[var(--color-brand-navy)]" id="contact-list-title">
            {submissions.length} {submissions.length === 1 ? "inquiry" : "inquiries"}
          </h2>
          <AdminLeadFilters basePath="/admin/leads/contacts" currentStatus={currentStatus} />
        </div>

        {submissions.length === 0 ? (
          <div className="grid min-h-72 place-items-center border border-dashed border-[var(--color-border-strong)] bg-white p-10 text-center">
            <div>
              <Mail aria-hidden="true" className="mx-auto text-[var(--color-brand-blue)]" size={34} />
              <h3 className="mt-5 text-3xl uppercase text-[var(--color-brand-navy)]">No matching inquiries.</h3>
              <p className="mt-3 text-sm text-[var(--color-ink-muted)]">New contact submissions will appear here after database configuration.</p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto border border-[var(--color-border)] bg-white shadow-[0_0.8rem_2rem_rgb(11_41_66_/_0.05)]">
            <table className="w-full min-w-[68rem] border-collapse text-left text-sm">
              <caption className="visually-hidden">CTS Pacific contact inquiries</caption>
              <thead className="bg-[var(--color-brand-navy)] text-white">
                <tr>
                  {["Reference", "Contact", "Inquiry", "Subject", "Received", "Status", "Action"].map((heading) => (
                    <th className="px-5 py-4 text-xs font-extrabold uppercase tracking-[0.1em]" key={heading} scope="col">{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission) => (
                  <tr className="border-t border-[var(--color-border)] align-top" key={submission.id}>
                    <th className="px-5 py-5 font-mono text-xs text-[var(--color-brand-navy)]" scope="row">{submission.referenceNumber}</th>
                    <td className="px-5 py-5">
                      <span className="block font-bold text-[var(--color-brand-navy)]">{submission.name}</span>
                      <span className="mt-1 block text-xs text-[var(--color-ink-muted)]">{submission.company ?? submission.email}</span>
                    </td>
                    <td className="px-5 py-5 text-[var(--color-ink-muted)]">{humanizeLeadValue(submission.inquiryType)}</td>
                    <td className="max-w-sm px-5 py-5 text-[var(--color-ink-muted)]">{submission.subject}</td>
                    <td className="whitespace-nowrap px-5 py-5 text-xs text-[var(--color-ink-muted)]">{formatLeadDate(submission.createdAt)}</td>
                    <td className="px-5 py-5"><AdminLeadStatus status={submission.status} /></td>
                    <td className="px-5 py-5">
                      <Link className="inline-flex min-h-10 items-center gap-2 font-extrabold uppercase tracking-[0.08em] text-[var(--color-brand-blue)]" href={`/admin/leads/contacts/${submission.id}`}>
                        Review <ArrowRight aria-hidden="true" size={15} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </AdminShell>
  );
}
