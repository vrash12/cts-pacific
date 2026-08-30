import { PackagePlus } from "lucide-react";
import { redirect } from "next/navigation";

import { AdminProductForm } from "@/components/admin/admin-product-form";
import { AdminShell } from "@/components/admin/admin-shell";
import { getAdminProductFormCategories } from "@/modules/products/queries";
import { canManageCatalog } from "@/server/auth/roles";
import { requireAdmin } from "@/server/auth/require-admin";

export const dynamic = "force-dynamic";

export default async function NewAdminProductPage() {
  const access = await requireAdmin();

  if (access.status !== "authorized") {
    redirect("/admin");
  }

  if (!canManageCatalog(access.actor.role)) {
    redirect("/admin/products?permission=read-only");
  }

  const categories = await getAdminProductFormCategories(access.actor);

  return (
    <AdminShell actor={access.actor}>
      <section className="border-b border-[var(--color-border)] pb-10">
        <PackagePlus aria-hidden="true" className="mb-7 text-[var(--color-brand-blue)]" size={34} strokeWidth={1.6} />
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--color-brand-teal)]">
          Private catalog
        </p>
        <h1 className="mt-4 max-w-4xl text-[clamp(3rem,6vw,5.6rem)] uppercase text-[var(--color-brand-navy)]">
          Create a draft product.
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--color-ink-muted)]">
          Enter only approved client catalog information. The record defaults to draft and cannot appear on the public website.
        </p>
      </section>

      <div className="py-10">
        {categories.length > 0 ? (
          <AdminProductForm
            categories={categories}
            initialValues={{
              name: "",
              slug: "",
              categoryId: categories[0]?.id ?? "",
              description: "",
              sku: "",
              variantName: "Default",
              price: "0.00",
              currency: "USD",
              inventoryPolicy: "TRACK",
              inventoryQuantity: 0,
            }}
            mode="create"
          />
        ) : (
          <div className="border-l-4 border-amber-600 bg-white px-6 py-5 text-sm leading-7 text-amber-950">
            No active approved product category is available. Apply the reviewed commerce migration or reactivate an approved category before creating products.
          </div>
        )}
      </div>
    </AdminShell>
  );
}
