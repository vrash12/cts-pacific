import {
  Boxes,
  Camera,
  CheckCircle2,
  Construction,
  EyeOff,
  FileText,
  Mail,
  PackagePlus,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { AdminShell } from "@/components/admin/admin-shell";
import { AdminSignOutButton } from "@/components/admin/admin-sign-out-button";
import { publicEnvironment } from "@/config/env/public";
import { featureFlags } from "@/config/features";
import { getAdminLeadOverview } from "@/modules/leads/queries";
import { getAdminCatalogOverview } from "@/modules/products/queries";
import { canManageCatalog, canManageLeads } from "@/server/auth/roles";
import { requireAdmin } from "@/server/auth/require-admin";

export const dynamic = "force-dynamic";

const setupMessages = {
  SUPABASE_AUTH: {
    title: "Connect Supabase Auth",
    description:
      "The admin workspace is locked until the public Supabase URL and anonymous key are configured.",
  },
  DATABASE: {
    title: "Connect the database",
    description:
      "Authentication is available, but DATABASE_URL is required before administrative records can be authorized.",
  },
  DATABASE_SCHEMA: {
    title: "Apply the admin and commerce migration",
    description:
      "The database is connected, but the admin profile or commerce tables are not ready yet.",
  },
} as const;

function AdminSetupRequired({
  reason,
}: {
  reason: keyof typeof setupMessages;
}) {
  const message = setupMessages[reason];

  return (
    <main className="grid min-h-screen place-items-center bg-[var(--color-surface-muted)] px-6 py-14">
      <div className="w-full max-w-3xl border-t-4 border-[var(--color-brand-blue)] bg-white p-7 shadow-[0_1.5rem_4rem_rgb(11_41_66_/_0.1)] sm:p-12">
        <Image
          alt="CTS Pacific"
          className="mb-10 h-auto w-44"
          height={777}
          priority
          src="/images/logo.png"
          width={2024}
        />
        <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--color-brand-teal)]">Secure admin setup</p>
        <h1 className="mt-4 max-w-2xl text-[clamp(2.4rem,6vw,4.5rem)] uppercase text-[var(--color-brand-navy)]">{message.title}</h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--color-ink-muted)]">{message.description}</p>

        <ol className="mt-9 grid gap-px border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-3">
          {[
            "Configure Supabase environment variables",
            "Run the reviewed Drizzle migration",
            "Create an active admin profile for the Auth user",
          ].map((step, index) => (
            <li className="bg-white p-5 text-sm leading-6" key={step}>
              <span className="mb-3 block text-xs font-extrabold text-[var(--color-brand-blue)]">0{index + 1}</span>
              {step}
            </li>
          ))}
        </ol>

        <div className="mt-9 flex flex-wrap gap-3">
          <Link className="inline-flex min-h-12 items-center bg-[var(--color-brand-navy)] px-5 text-xs font-extrabold uppercase tracking-[0.1em] text-white" href="/admin/login">
            Open admin sign in
          </Link>
          <Link className="inline-flex min-h-12 items-center border border-[var(--color-border-strong)] px-5 text-xs font-extrabold uppercase tracking-[0.1em] text-[var(--color-brand-navy)]" href="/">
            Return to website
          </Link>
        </div>
      </div>
    </main>
  );
}

function AdminForbidden({ email }: { email: string | null }) {
  const supabaseUrl = publicEnvironment.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = publicEnvironment.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  return (
    <main className="grid min-h-screen place-items-center bg-[var(--color-brand-navy-deep)] px-6 py-14 text-white">
      <div className="max-w-xl text-center">
        <ShieldCheck aria-hidden="true" className="mx-auto mb-7 text-[#78d2d4]" size={42} />
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#78d2d4]">Access restricted</p>
        <h1 className="mt-4 text-[clamp(2.6rem,7vw,4.8rem)] uppercase">Administrator access required.</h1>
        <p className="mt-6 leading-8 text-white/65">
          {email ?? "This account"} is authenticated but does not have an active CTS Pacific admin profile.
        </p>
        {supabaseUrl && supabaseAnonKey ? (
          <div className="mt-8 flex justify-center">
            <AdminSignOutButton supabaseAnonKey={supabaseAnonKey} supabaseUrl={supabaseUrl} />
          </div>
        ) : null}
      </div>
    </main>
  );
}

function StatusPill({ ready, children }: { ready: boolean; children: React.ReactNode }) {
  return (
    <span className={`inline-flex w-fit items-center gap-2 px-3 py-1 text-[0.65rem] font-extrabold uppercase tracking-[0.1em] ${ready ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-900"}`}>
      {ready ? <CheckCircle2 aria-hidden="true" size={14} /> : <TriangleAlert aria-hidden="true" size={14} />}
      {children}
    </span>
  );
}

export default async function AdminPage() {
  const access = await requireAdmin();

  if (access.status === "setup-required") {
    return <AdminSetupRequired reason={access.reason} />;
  }

  if (access.status === "forbidden") {
    return <AdminForbidden email={access.email} />;
  }

  const mayManageCatalog = canManageCatalog(access.actor.role);
  const mayManageLeads = canManageLeads(access.actor.role);
  const [catalog, leadOverview] = await Promise.all([
    getAdminCatalogOverview(access.actor),
    mayManageLeads ? getAdminLeadOverview(access.actor) : Promise.resolve(null),
  ]);

  return (
    <AdminShell
      actor={access.actor}
      newLeadCount={(leadOverview?.quotes.new ?? 0) + (leadOverview?.contacts.new ?? 0)}
    >
      <section className="grid gap-7 border-b border-[var(--color-border)] pb-10 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="mb-4 flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--color-brand-teal)]">
            <span className="h-px w-9 bg-current" />
            Administrative operations
          </p>
          <h1 className="max-w-4xl text-[clamp(3rem,6vw,5.8rem)] uppercase text-[var(--color-brand-navy)]">
            CTS Pacific control center.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--color-ink-muted)]">
            Review incoming leads and prepare future catalog records through server-authorized administrative modules. Nothing in this workspace is exposed publicly.
          </p>
        </div>

        <div className="flex items-center gap-3 border-l-4 border-emerald-600 bg-white px-5 py-4 shadow-sm">
          <EyeOff aria-hidden="true" className="text-emerald-700" size={22} />
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-emerald-800">Storefront hidden</p>
            <p className="text-xs text-[var(--color-ink-muted)]">Public commerce flag: {String(featureFlags.ecommerce)}</p>
          </div>
        </div>
      </section>

      {leadOverview ? (
        <section aria-labelledby="lead-summary-title" className="border-b border-[var(--color-border)] py-10">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--color-brand-teal)]">Lead operations</p>
              <h2 className="mt-2 text-3xl uppercase text-[var(--color-brand-navy)]" id="lead-summary-title">Customer inquiries</h2>
            </div>
            <Link className="inline-flex min-h-12 items-center gap-2 border border-[var(--color-brand-blue)] bg-[var(--color-brand-blue)] px-5 text-xs font-extrabold uppercase tracking-[0.1em] text-white transition hover:border-[var(--color-brand-navy)] hover:bg-[var(--color-brand-navy)]" href="/admin/leads">
              Open lead center
            </Link>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            {[
              { label: "Project quote requests", icon: FileText, href: "/admin/leads/quotes", summary: leadOverview.quotes },
              { label: "Contact inquiries", icon: Mail, href: "/admin/leads/contacts", summary: leadOverview.contacts },
            ].map((item) => (
              <Link className="grid grid-cols-[auto_1fr_auto] items-center gap-5 border border-[var(--color-border)] bg-white p-6 shadow-[0_0.8rem_2rem_rgb(11_41_66_/_0.05)] transition hover:border-[var(--color-brand-blue)]" href={item.href} key={item.href}>
                <item.icon aria-hidden="true" className="text-[var(--color-brand-blue)]" size={25} />
                <div>
                  <span className="block text-sm font-extrabold uppercase tracking-[0.08em] text-[var(--color-brand-navy)]">{item.label}</span>
                  <span className="mt-1 block text-xs text-[var(--color-ink-muted)]">{item.summary.new} new · {item.summary.reviewing} reviewing</span>
                </div>
                <strong className="text-4xl text-[var(--color-brand-navy)]">{item.summary.all}</strong>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section aria-labelledby="catalog-summary-title" className="py-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--color-brand-teal)]">Catalog summary</p>
            <h2 className="mt-2 text-3xl uppercase text-[var(--color-brand-navy)]" id="catalog-summary-title">Product readiness</h2>
          </div>
          <Link
            className="inline-flex min-h-12 items-center gap-2 border border-[var(--color-brand-blue)] bg-[var(--color-brand-blue)] px-5 text-xs font-extrabold uppercase tracking-[0.1em] text-white transition hover:border-[var(--color-brand-navy)] hover:bg-[var(--color-brand-navy)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2"
            href={mayManageCatalog ? "/admin/products/new" : "/admin/products"}
          >
            {mayManageCatalog ? (
              <PackagePlus aria-hidden="true" size={17} />
            ) : (
              <Boxes aria-hidden="true" size={17} />
            )}
            {mayManageCatalog ? "Add draft product" : "View products"}
          </Link>
        </div>

        <div className="grid gap-px border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "All products", value: catalog.totals.all, icon: Boxes },
            { label: "Draft", value: catalog.totals.draft, icon: PackagePlus },
            { label: "Published", value: catalog.totals.published, icon: CheckCircle2 },
            { label: "Archived", value: catalog.totals.archived, icon: EyeOff },
          ].map((item) => (
            <article className="bg-white p-6" key={item.label}>
              <item.icon aria-hidden="true" className="mb-8 text-[var(--color-brand-blue)]" size={22} strokeWidth={1.7} />
              <strong className="block font-[var(--font-heading)] text-5xl text-[var(--color-brand-navy)]">{item.value}</strong>
              <span className="mt-2 block text-xs font-extrabold uppercase tracking-[0.1em] text-[var(--color-ink-muted)]">{item.label}</span>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="categories-title" className="border-t border-[var(--color-border)] py-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--color-brand-teal)]">Approved structure</p>
            <h2 className="mt-2 text-3xl uppercase text-[var(--color-brand-navy)]" id="categories-title">Product categories</h2>
          </div>
          <Link className="text-xs font-extrabold uppercase tracking-[0.1em] text-[var(--color-brand-blue)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]" href="/admin/categories">
            Manage categories
          </Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {catalog.categories.map((category) => {
            const Icon = category.slug === "cameras"
              ? Camera
              : category.slug === "construction-equipment"
                ? Construction
                : Boxes;
            return (
              <article className="grid min-h-64 grid-rows-[auto_1fr_auto] border border-[var(--color-border)] bg-white p-7 shadow-[0_0.8rem_2rem_rgb(11_41_66_/_0.05)]" key={category.id}>
                <div className="flex items-start justify-between gap-4">
                  <Icon aria-hidden="true" className="text-[var(--color-brand-blue)]" size={29} strokeWidth={1.6} />
                  <StatusPill ready={category.isActive}>{category.isActive ? "Active category" : "Inactive"}</StatusPill>
                </div>
                <div className="self-center py-7">
                  <h3 className="text-[clamp(2rem,4vw,3.4rem)] uppercase text-[var(--color-brand-navy)]">{category.name}</h3>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--color-ink-muted)]">{category.description}</p>
                </div>
                <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-5 text-xs font-extrabold uppercase tracking-[0.1em] text-[var(--color-ink-muted)]">
                  <span>{category.productCount} products</span>
                  <span>/{category.slug}</span>
                </div>
              </article>
            );
          })}
        </div>
      </section>

    </AdminShell>
  );
}
