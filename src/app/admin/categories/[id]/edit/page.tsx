import { FolderPen } from "lucide-react";
import { notFound, redirect } from "next/navigation";

import { AdminCategoryForm } from "@/components/admin/admin-category-form";
import { AdminCategoryStatusControl } from "@/components/admin/admin-category-status-control";
import { AdminShell } from "@/components/admin/admin-shell";
import { getAdminProductCategoryForEdit } from "@/modules/products/queries";
import { productCategoryIdSchema } from "@/schemas/product-category";
import { canManageCatalog } from "@/server/auth/roles";
import { requireAdmin } from "@/server/auth/require-admin";

export const dynamic = "force-dynamic";

type EditAdminCategoryPageProps = { params: Promise<{ id: string }> };

export default async function EditAdminCategoryPage({ params }: EditAdminCategoryPageProps) {
  const access = await requireAdmin();
  if (access.status !== "authorized") redirect("/admin");
  if (!canManageCatalog(access.actor.role)) redirect("/admin/categories?permission=read-only");

  const { id } = await params;
  const parsedId = productCategoryIdSchema.safeParse(id);
  if (!parsedId.success) notFound();

  const category = await getAdminProductCategoryForEdit(access.actor, parsedId.data);
  if (!category) notFound();

  return (
    <AdminShell actor={access.actor}>
      <section className="grid gap-7 border-b border-[var(--color-border)] pb-10 lg:grid-cols-[1fr_auto] lg:items-end">
        <div><FolderPen aria-hidden="true" className="mb-7 text-[var(--color-brand-blue)]" size={34} strokeWidth={1.6} /><p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--color-brand-teal)]">Private catalog</p><h1 className="mt-4 max-w-4xl text-[clamp(3rem,6vw,5.6rem)] uppercase text-[var(--color-brand-navy)]">Edit category.</h1><p className="mt-6 max-w-3xl text-base leading-8 text-[var(--color-ink-muted)]">Category changes affect only the private product workspace while ecommerce remains disabled.</p></div>
        <span className={`inline-flex min-h-9 items-center border px-4 text-xs font-extrabold uppercase tracking-[0.1em] ${category.isActive ? "border-emerald-300 bg-emerald-50 text-emerald-900" : "border-slate-300 bg-slate-100 text-slate-700"}`}>{category.isActive ? "Active" : "Archived"}</span>
      </section>

      <div className="py-10"><AdminCategoryForm categoryId={category.id} initialValues={{ name: category.name, slug: category.slug, description: category.description ?? "", displayOrder: category.displayOrder }} lastKnownUpdatedAt={category.updatedAt.toISOString()} mode="edit" /></div>

      <section aria-labelledby="category-lifecycle-title" className="border-t border-[var(--color-border)] pt-10">
        <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--color-brand-teal)]">Lifecycle</p>
        <h2 className="mt-2 text-3xl uppercase text-[var(--color-brand-navy)]" id="category-lifecycle-title">{category.isActive ? "Archive this category" : "Restore this category"}</h2>
        <p className="mb-6 mt-4 max-w-2xl text-sm leading-7 text-[var(--color-ink-muted)]">{category.isActive ? "Archiving removes this option from new product forms. Existing product records and their history are preserved." : "Restoring makes this category available to new and edited product records again."}</p>
        <AdminCategoryStatusControl categoryId={category.id} categoryName={category.name} isActive={category.isActive} />
      </section>
    </AdminShell>
  );
}
