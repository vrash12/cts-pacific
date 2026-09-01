import { ArrowRight, FileText, Inbox, Mail } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { AdminShell } from "@/components/admin/admin-shell";
import { getAdminLeadOverview } from "@/modules/leads/queries";
import { canManageLeads } from "@/server/auth/roles";
import { requireAdmin } from "@/server/auth/require-admin";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  const access = await requireAdmin();

  if (access.status !== "authorized" || !canManageLeads(access.actor.role)) {
    redirect("/admin");
  }

  const overview = await getAdminLeadOverview(access.actor);
  const inboxes = [
    {
      title: "Project quote requests",
      description:
        "Review submitted services, project environments, timelines, and contact details.",
      href: "/admin/leads/quotes",
      icon: FileText,
      summary: overview.quotes,
    },
    {
      title: "Contact inquiries",
      description:
        "Handle general, service, and project-coordination messages from the contact page.",
      href: "/admin/leads/contacts",
      icon: Mail,
      summary: overview.contacts,
    },
  ] as const;

  return (
    <AdminShell
      actor={access.actor}
      newLeadCount={overview.quotes.new + overview.contacts.new}
    >
      <section className="border-b border-[var(--color-border)] pb-10">
        <p className="mb-4 flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--color-brand-teal)]">
          <Inbox aria-hidden="true" size={16} />
          Lead operations
        </p>
        <h1 className="max-w-4xl text-[clamp(3rem,6vw,5.8rem)] uppercase text-[var(--color-brand-navy)]">
          Customer inquiry center.
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--color-ink-muted)]">
          Review incoming project requests and general inquiries without exposing lead information to the public website.
        </p>
      </section>

      <section aria-labelledby="lead-inboxes-title" className="py-10">
        <h2 className="text-3xl uppercase text-[var(--color-brand-navy)]" id="lead-inboxes-title">
          Lead inboxes
        </h2>
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {inboxes.map((inbox) => (
            <article
              className="grid min-h-80 grid-rows-[auto_1fr_auto] border border-[var(--color-border)] bg-white p-7 shadow-[0_0.8rem_2rem_rgb(11_41_66_/_0.05)]"
              key={inbox.href}
            >
              <div className="flex items-start justify-between gap-5">
                <inbox.icon
                  aria-hidden="true"
                  className="text-[var(--color-brand-blue)]"
                  size={30}
                  strokeWidth={1.6}
                />
                <span className="bg-sky-100 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.1em] text-sky-900">
                  {inbox.summary.new} new
                </span>
              </div>
              <div className="self-center py-8">
                <p className="text-5xl font-extrabold text-[var(--color-brand-navy)]">
                  {inbox.summary.all}
                </p>
                <h3 className="mt-4 text-3xl uppercase text-[var(--color-brand-navy)]">
                  {inbox.title}
                </h3>
                <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--color-ink-muted)]">
                  {inbox.description}
                </p>
              </div>
              <Link
                className="inline-flex min-h-11 items-center gap-2 border-t border-[var(--color-border)] pt-5 text-xs font-extrabold uppercase tracking-[0.1em] text-[var(--color-brand-blue)]"
                href={inbox.href}
              >
                Open inbox
                <ArrowRight aria-hidden="true" size={16} />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </AdminShell>
  );
}
