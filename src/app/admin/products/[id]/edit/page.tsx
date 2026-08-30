import { FilePenLine } from "lucide-react";
import { notFound, redirect } from "next/navigation";

import { AdminProductArchiveControl } from "@/components/admin/admin-product-archive-control";
import { AdminProductForm } from "@/components/admin/admin-product-form";
import { AdminProductStatus } from "@/components/admin/admin-product-status";
import { AdminShell } from "@/components/admin/admin-shell";
import { formatMinorUnitsForInput } from "@/modules/products/money";
import {
  getAdminProductForEdit,
  getAdminProductFormCategories,
} from "@/modules/products/queries";
import { productIdSchema } from "@/schemas/product";
import { canManageCatalog } from "@/server/auth/roles";
import { requireAdmin } from "@/server/auth/require-admin";

export const dynamic = "force-dynamic";

type EditAdminProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditAdminProductPage({
  params,
}: EditAdminProductPageProps) {
  const access = await requireAdmin();

  if (access.status !== "authorized") {
    redirect("/admin");
  }

  if (!canManageCatalog(access.actor.role)) {
    redirect("/admin/products?permission=read-only");
  }

  const { id } = await params;
  const parsedId = productIdSchema.safeParse(id);

  if (!parsedId.success) {
    notFound();
  }

  const [product, categories] = await Promise.all([
    getAdminProductForEdit(access.actor, parsedId.data),
    getAdminProductFormCategories(access.actor),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <AdminShell actor={access.actor}>
      <section className="grid gap-7 border-b border-[var(--color-border)] pb-10 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <FilePenLine aria-hidden="true" className="mb-7 text-[var(--color-brand-blue)]" size={34} strokeWidth={1.6} />
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--color-brand-teal)]">
            Private catalog
          </p>
          <h1 className="mt-4 max-w-4xl text-[clamp(3rem,6vw,5.6rem)] uppercase text-[var(--color-brand-navy)]">
            Edit product.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--color-ink-muted)]">
            Changes remain private while ecommerce is disabled. Publishing is intentionally outside this administration increment.
          </p>
        </div>
        <AdminProductStatus status={product.status} />
      </section>

      <div className="py-10">
        {product.primaryVariant ? (
          <AdminProductForm
            categories={categories}
            initialValues={{
              name: product.name,
              slug: product.slug,
              categoryId: product.categoryId,
              description: product.description ?? "",
              sku: product.primaryVariant.sku,
              variantName: product.primaryVariant.name,
              price: formatMinorUnitsForInput(product.primaryVariant.priceMinor),
              currency: "USD",
              inventoryPolicy: product.primaryVariant.inventoryPolicy,
              inventoryQuantity: product.primaryVariant.inventoryQuantity,
            }}
            lastKnownUpdatedAt={product.updatedAt.toISOString()}
            mode="edit"
            productId={product.id}
          />
        ) : (
          <div className="border-l-4 border-red-700 bg-red-50 px-6 py-5 text-sm leading-7 text-red-950" role="alert">
            This product is missing its primary variant. It cannot be edited through this form until the data is repaired by an administrator.
          </div>
        )}
      </div>

      <section aria-labelledby="archive-product-title" className="border-t border-[var(--color-border)] pt-10">
        <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--color-brand-teal)]">
          Lifecycle
        </p>
        <h2 className="mt-2 text-3xl uppercase text-[var(--color-brand-navy)]" id="archive-product-title">
          {product.status === "ARCHIVED" ? "Restore this product" : "Archive this product"}
        </h2>
        <p className="mb-6 mt-4 max-w-2xl text-sm leading-7 text-[var(--color-ink-muted)]">
          {product.status === "ARCHIVED"
            ? "Restoring returns the record to draft. It still will not appear publicly."
            : "Archiving removes the record from active catalog work without permanently deleting its history."}
        </p>
        <AdminProductArchiveControl
          productId={product.id}
          productName={product.name}
          status={product.status}
        />
      </section>
    </AdminShell>
  );
}
