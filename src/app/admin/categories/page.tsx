import { ArrowRight, FolderPlus, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { AdminShell } from "@/components/admin/admin-shell";
import { buttonVariants } from "@/components/ui/button";
import { getAdminProductCategories } from "@/modules/products/queries";
import { canManageCatalog } from "@/server/auth/roles";
import { requireAdmin } from "@/server/auth/require-admin";

export const dynamic = "force-dynamic";

type CategoryListPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function getStatusNotice(searchParams: Record<string, string | string[] | undefined>) {
  if (searchParams.created === "1") return "Category created.";
  if (searchParams.updated === "1") return "Category changes saved.";
  if (searchParams.archived === "1") return "Category archived.";
  if (searchParams.restored === "1") return "Category restored.";
  if (searchParams.permission === "read-only") return "Your role has read-only catalog access.";
  return null;
}

export default async function AdminCategoriesPage({ searchParams }: CategoryListPageProps) {
  const access = await requireAdmin();
  if (access.status !== "authorized") redirect("/admin");

  const [categories, resolvedSearchParams] = await Promise.all([
    getAdminProductCategories(access.actor),
    searchParams,
  ]);
  const mayManageCatalog = canManageCatalog(access.actor.role);
  const notice = getStatusNotice(resolvedSearchParams);

  return (
    <AdminShell actor={access.actor}>
      <section className="grid gap-7 border-b border-[var(--color-border)] pb-10 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="mb-4 flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--color-brand-teal)]"><span className="h-px w-9 bg-current" />Private catalog</p>
          <h1 className="max-w-4xl text-[clamp(3rem,6vw,5.8rem)] uppercase text-[var(--color-brand-navy)]">Category administration.</h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--color-ink-muted)]">Organize future camera, electronics, and construction-equipment records without exposing a storefront. Archiving is recoverable and keeps existing product history intact.</p>
        </div>
        {mayManageCatalog ? (
          <Link className={buttonVariants({ size: "large" })} href="/admin/categories/new"><FolderPlus aria-hidden="true" size={18} />Add category</Link>
        ) : (
          <div className="flex max-w-xs items-start gap-3 border-l-4 border-amber-600 bg-white px-5 py-4 text-sm leading-6 text-[var(--color-ink-muted)]"><ShieldCheck aria-hidden="true" className="mt-0.5 shrink-0 text-amber-800" size={20} />Your role can review categories but cannot change catalog data.</div>
        )}
      </section>

      {notice ? <p className="mt-8 border-l-4 border-emerald-700 bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-900" role="status">{notice}</p> : null}

      <section aria-labelledby="category-list-title" className="py-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div><p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--color-brand-teal)]">Catalog structure</p><h2 className="mt-2 text-3xl uppercase text-[var(--color-brand-navy)]" id="category-list-title">{categories.length} {categories.length === 1 ? "category" : "categories"}</h2></div>
          <Link className="text-xs font-extrabold uppercase tracking-[0.1em] text-[var(--color-brand-blue)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]" href="/admin/products">View products</Link>
        </div>

        <div className="overflow-x-auto border border-[var(--color-border)] bg-white shadow-[0_0.8rem_2rem_rgb(11_41_66_/_0.05)]">
          <table className="w-full min-w-[56rem] border-collapse text-left text-sm">
            <caption className="visually-hidden">CTS Pacific private product categories</caption>
            <thead className="bg-[var(--color-brand-navy)] text-white"><tr>{["Order", "Category", "Products", "Status", "Action"].map((heading) => <th className="px-5 py-4 text-xs font-extrabold uppercase tracking-[0.1em]" key={heading} scope="col">{heading}</th>)}</tr></thead>
            <tbody>
              {categories.map((category) => (
                <tr className="border-t border-[var(--color-border)] align-top" key={category.id}>
                  <td className="px-5 py-5 font-mono text-xs font-semibold">{category.displayOrder}</td>
                  <th className="px-5 py-5" scope="row"><span className="block font-bold text-[var(--color-brand-navy)]">{category.name}</span><span className="mt-1 block text-xs text-[var(--color-ink-muted)]">/{category.slug}</span>{category.description ? <span className="mt-3 block max-w-xl text-xs font-normal leading-5 text-[var(--color-ink-muted)]">{category.description}</span> : null}</th>
                  <td className="px-5 py-5 text-[var(--color-ink-muted)]">{category.productCount}</td>
                  <td className="px-5 py-5"><span className={`inline-flex min-h-7 items-center border px-3 text-[0.65rem] font-extrabold uppercase tracking-[0.1em] ${category.isActive ? "border-emerald-300 bg-emerald-50 text-emerald-900" : "border-slate-300 bg-slate-100 text-slate-700"}`}>{category.isActive ? "Active" : "Archived"}</span></td>
                  <td className="px-5 py-5">{mayManageCatalog ? <Link className="inline-flex min-h-10 items-center gap-2 font-extrabold uppercase tracking-[0.08em] text-[var(--color-brand-blue)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]" href={`/admin/categories/${category.id}/edit`}>Edit<ArrowRight aria-hidden="true" size={15} /></Link> : <span className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--color-ink-muted)]">Read only</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </AdminShell>
  );
}
