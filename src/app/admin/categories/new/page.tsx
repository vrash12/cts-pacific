import { FolderPlus } from "lucide-react";
import { redirect } from "next/navigation";

import { AdminCategoryForm } from "@/components/admin/admin-category-form";
import { AdminShell } from "@/components/admin/admin-shell";
import { canManageCatalog } from "@/server/auth/roles";
import { requireAdmin } from "@/server/auth/require-admin";

export const dynamic = "force-dynamic";

export default async function NewAdminCategoryPage() {
  const access = await requireAdmin();
  if (access.status !== "authorized") redirect("/admin");
  if (!canManageCatalog(access.actor.role)) redirect("/admin/categories?permission=read-only");

  return (
    <AdminShell actor={access.actor}>
      <section className="border-b border-[var(--color-border)] pb-10">
        <FolderPlus aria-hidden="true" className="mb-7 text-[var(--color-brand-blue)]" size={34} strokeWidth={1.6} />
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--color-brand-teal)]">Private catalog</p>
        <h1 className="mt-4 max-w-4xl text-[clamp(3rem,6vw,5.6rem)] uppercase text-[var(--color-brand-navy)]">Create a product category.</h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--color-ink-muted)]">Create structure only for client-approved merchandise types. The category remains private while ecommerce is disabled.</p>
      </section>
      <div className="py-10"><AdminCategoryForm initialValues={{ name: "", slug: "", description: "", displayOrder: 0 }} mode="create" /></div>
    </AdminShell>
  );
}
