import { ArrowRight, PackagePlus, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { AdminProductStatus } from "@/components/admin/admin-product-status";
import { AdminShell } from "@/components/admin/admin-shell";
import { buttonVariants } from "@/components/ui/button";
import { formatMoney } from "@/modules/products/money";
import { getAdminProducts } from "@/modules/products/queries";
import { canManageCatalog } from "@/server/auth/roles";
import { requireAdmin } from "@/server/auth/require-admin";

export const dynamic = "force-dynamic";

type ProductListPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function getStatusNotice(
  searchParams: Record<string, string | string[] | undefined>,
) {
  if (searchParams.created === "1") return "Draft product created.";
  if (searchParams.updated === "1") return "Product changes saved.";
  if (searchParams.archived === "1") return "Product archived.";
  if (searchParams.restored === "1") return "Product restored to draft.";
  if (searchParams.permission === "read-only") {
    return "Your role has read-only catalog access.";
  }

  return null;
}

export default async function AdminProductsPage({
  searchParams,
}: ProductListPageProps) {
  const access = await requireAdmin();

  if (access.status !== "authorized") {
    redirect("/admin");
  }

  const [catalogProducts, resolvedSearchParams] = await Promise.all([
    getAdminProducts(access.actor),
    searchParams,
  ]);
  const mayManageCatalog = canManageCatalog(access.actor.role);
  const notice = getStatusNotice(resolvedSearchParams);

  return (
    <AdminShell actor={access.actor}>
      <section className="grid gap-7 border-b border-[var(--color-border)] pb-10 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="mb-4 flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--color-brand-teal)]">
            <span className="h-px w-9 bg-current" />
            Private catalog
          </p>
          <h1 className="max-w-4xl text-[clamp(3rem,6vw,5.8rem)] uppercase text-[var(--color-brand-navy)]">
            Product administration.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--color-ink-muted)]">
            Create and maintain approved draft products for the future storefront. Catalog records remain inaccessible on the public site while ecommerce is disabled.
          </p>
        </div>

        {mayManageCatalog ? (
          <Link className={buttonVariants({ size: "large" })} href="/admin/products/new">
            <PackagePlus aria-hidden="true" size={18} />
            Add draft product
          </Link>
        ) : (
          <div className="flex max-w-xs items-start gap-3 border-l-4 border-amber-600 bg-white px-5 py-4 text-sm leading-6 text-[var(--color-ink-muted)]">
            <ShieldCheck aria-hidden="true" className="mt-0.5 shrink-0 text-amber-800" size={20} />
            Your role can review products but cannot change catalog data.
          </div>
        )}
      </section>

      {notice ? (
        <p
          className="mt-8 border-l-4 border-emerald-700 bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-900"
          role="status"
        >
          {notice}
        </p>
      ) : null}

      <section aria-labelledby="product-list-title" className="py-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--color-brand-teal)]">
              Catalog records
            </p>
            <h2 className="mt-2 text-3xl uppercase text-[var(--color-brand-navy)]" id="product-list-title">
              {catalogProducts.length} {catalogProducts.length === 1 ? "product" : "products"}
            </h2>
          </div>
          <Link
            className="text-xs font-extrabold uppercase tracking-[0.1em] text-[var(--color-brand-blue)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]"
            href="/admin"
          >
            Return to dashboard
          </Link>
        </div>

        {catalogProducts.length === 0 ? (
          <div className="grid min-h-72 place-items-center border border-dashed border-[var(--color-border-strong)] bg-white px-6 py-12 text-center">
            <div className="max-w-xl">
              <PackagePlus aria-hidden="true" className="mx-auto text-[var(--color-brand-blue)]" size={34} strokeWidth={1.6} />
              <h3 className="mt-6 text-3xl uppercase text-[var(--color-brand-navy)]">
                No products have been entered.
              </h3>
              <p className="mt-4 text-sm leading-7 text-[var(--color-ink-muted)]">
                Add only client-approved products, descriptions, SKUs, prices, and inventory information. Do not use placeholder products in production.
              </p>
              {mayManageCatalog ? (
                <Link className={`${buttonVariants()} mt-7`} href="/admin/products/new">
                  Create the first draft
                  <ArrowRight aria-hidden="true" size={17} />
                </Link>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto border border-[var(--color-border)] bg-white shadow-[0_0.8rem_2rem_rgb(11_41_66_/_0.05)]">
            <table className="w-full min-w-[64rem] border-collapse text-left text-sm">
              <caption className="visually-hidden">
                CTS Pacific private product catalog
              </caption>
              <thead className="bg-[var(--color-brand-navy)] text-white">
                <tr>
                  {[
                    "Product",
                    "Category",
                    "SKU",
                    "Price",
                    "Inventory",
                    "Status",
                    "Action",
                  ].map((heading) => (
                    <th className="px-5 py-4 text-xs font-extrabold uppercase tracking-[0.1em]" key={heading} scope="col">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {catalogProducts.map((product) => {
                  const variant = product.primaryVariant;
                  return (
                    <tr className="border-t border-[var(--color-border)] align-top" key={product.id}>
                      <th className="px-5 py-5" scope="row">
                        <span className="block max-w-xs font-bold text-[var(--color-brand-navy)]">{product.name}</span>
                        <span className="mt-1 block max-w-xs truncate text-xs text-[var(--color-ink-muted)]">/{product.slug}</span>
                      </th>
                      <td className="px-5 py-5 text-[var(--color-ink-muted)]">{product.categoryName}</td>
                      <td className="px-5 py-5 font-mono text-xs font-semibold">{variant?.sku ?? "Variant missing"}</td>
                      <td className="px-5 py-5 font-semibold text-[var(--color-brand-navy)]">
                        {variant ? formatMoney(variant.priceMinor, variant.currency) : "—"}
                      </td>
                      <td className="px-5 py-5 text-[var(--color-ink-muted)]">
                        {variant
                          ? variant.inventoryPolicy === "TRACK"
                            ? variant.inventoryQuantity
                            : "Not tracked"
                          : "—"}
                      </td>
                      <td className="px-5 py-5">
                        <AdminProductStatus status={product.status} />
                      </td>
                      <td className="px-5 py-5">
                        {mayManageCatalog ? (
                          <Link
                            className="inline-flex min-h-10 items-center gap-2 font-extrabold uppercase tracking-[0.08em] text-[var(--color-brand-blue)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]"
                            href={`/admin/products/${product.id}/edit`}
                          >
                            Edit
                            <ArrowRight aria-hidden="true" size={15} />
                          </Link>
                        ) : (
                          <span className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--color-ink-muted)]">
                            Read only
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </AdminShell>
  );
}
