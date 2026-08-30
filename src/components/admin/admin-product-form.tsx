"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FieldPath, useForm, useWatch } from "react-hook-form";

import {
  createProductAction,
  updateProductAction,
} from "@/app/admin/products/actions";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  type ProductAdminFormInput,
  productAdminFormSchema,
} from "@/schemas/product";

type ProductCategoryOption = {
  id: string;
  name: string;
  slug: string;
};

type AdminProductFormProps = {
  categories: ProductCategoryOption[];
  initialValues: ProductAdminFormInput;
  mode: "create" | "edit";
  productId?: string;
  lastKnownUpdatedAt?: string;
};

type SubmissionState =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "error"; message: string };

const fieldClassName =
  "min-h-12 w-full border border-[var(--color-border-strong)] bg-white px-4 text-sm text-[var(--color-ink)] outline-none transition focus:border-[var(--color-brand-blue)] focus:ring-2 focus:ring-[var(--color-brand-blue)]/20 disabled:cursor-not-allowed disabled:bg-[var(--color-surface-subtle)] disabled:text-[var(--color-ink-muted)]";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) {
    return null;
  }

  return (
    <p className="mt-2 text-sm font-semibold text-red-700" id={id} role="alert">
      {message}
    </p>
  );
}

function createSlug(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 140);
}

export function AdminProductForm({
  categories,
  initialValues,
  mode,
  productId,
  lastKnownUpdatedAt,
}: AdminProductFormProps) {
  const router = useRouter();
  const [submission, setSubmission] = useState<SubmissionState>({
    state: "idle",
  });
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    setValue,
    control,
    formState: { errors },
  } = useForm<ProductAdminFormInput>({
    resolver: zodResolver(productAdminFormSchema),
    mode: "onTouched",
    defaultValues: initialValues,
  });
  const inventoryPolicy = useWatch({ control, name: "inventoryPolicy" });

  async function submitProduct(values: ProductAdminFormInput) {
    setSubmission({ state: "submitting" });

    const result =
      mode === "create"
        ? await createProductAction(values)
        : await updateProductAction({
            ...values,
            productId: productId ?? "",
            lastKnownUpdatedAt: lastKnownUpdatedAt ?? "",
          });

    if (!result.ok) {
      Object.entries(result.fieldErrors ?? {}).forEach(([field, message]) => {
        if (message) {
          setError(field as FieldPath<ProductAdminFormInput>, {
            type: "server",
            message,
          });
        }
      });
      setSubmission({ state: "error", message: result.message });
      return;
    }

    router.push(
      `/admin/products?${mode === "create" ? "created" : "updated"}=1`,
    );
    router.refresh();
  }

  return (
    <form
      className="grid gap-8"
      noValidate
      onSubmit={handleSubmit(submitProduct)}
    >
      <section
        aria-labelledby="product-details-title"
        className="border border-[var(--color-border)] bg-white p-6 shadow-[0_0.8rem_2rem_rgb(11_41_66_/_0.05)] sm:p-8"
      >
        <div className="mb-7 border-b border-[var(--color-border)] pb-5">
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--color-brand-teal)]">
            Product record
          </p>
          <h2
            className="mt-2 text-3xl uppercase text-[var(--color-brand-navy)]"
            id="product-details-title"
          >
            Catalog details
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-bold" htmlFor="product-name">
              Product name
            </label>
            <input
              aria-describedby={errors.name ? "product-name-error" : undefined}
              aria-invalid={Boolean(errors.name)}
              className={fieldClassName}
              id="product-name"
              {...register("name")}
            />
            <FieldError id="product-name-error" message={errors.name?.message} />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold" htmlFor="product-category">
              Category
            </label>
            <select
              aria-describedby={errors.categoryId ? "product-category-error" : undefined}
              aria-invalid={Boolean(errors.categoryId)}
              className={fieldClassName}
              id="product-category"
              {...register("categoryId")}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <FieldError id="product-category-error" message={errors.categoryId?.message} />
          </div>

          <div className="lg:col-span-2">
            <div className="mb-2 flex flex-wrap items-end justify-between gap-2">
              <label className="block text-sm font-bold" htmlFor="product-slug">
                URL slug
              </label>
              <button
                className="text-xs font-extrabold uppercase tracking-[0.08em] text-[var(--color-brand-blue)] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]"
                onClick={() => {
                  setValue("slug", createSlug(getValues("name")), {
                    shouldDirty: true,
                    shouldValidate: true,
                  });
                }}
                type="button"
              >
                Generate from name
              </button>
            </div>
            <div className="flex min-h-12 items-stretch">
              <span className="hidden items-center border border-r-0 border-[var(--color-border-strong)] bg-[var(--color-surface-muted)] px-4 text-sm text-[var(--color-ink-muted)] sm:flex">
                /products/
              </span>
              <input
                aria-describedby={`product-slug-help${errors.slug ? " product-slug-error" : ""}`}
                aria-invalid={Boolean(errors.slug)}
                className={fieldClassName}
                id="product-slug"
                spellCheck="false"
                {...register("slug")}
              />
            </div>
            <p className="mt-2 text-xs leading-5 text-[var(--color-ink-muted)]" id="product-slug-help">
              Reserved for a future product URL. The public route remains disabled.
            </p>
            <FieldError id="product-slug-error" message={errors.slug?.message} />
          </div>

          <div className="lg:col-span-2">
            <label className="mb-2 block text-sm font-bold" htmlFor="product-description">
              Description <span className="font-normal text-[var(--color-ink-muted)]">(optional for drafts)</span>
            </label>
            <textarea
              aria-describedby={errors.description ? "product-description-error" : undefined}
              aria-invalid={Boolean(errors.description)}
              className={`${fieldClassName} min-h-40 py-3`}
              id="product-description"
              rows={6}
              {...register("description")}
            />
            <FieldError id="product-description-error" message={errors.description?.message} />
          </div>
        </div>
      </section>

      <section
        aria-labelledby="variant-details-title"
        className="border border-[var(--color-border)] bg-white p-6 shadow-[0_0.8rem_2rem_rgb(11_41_66_/_0.05)] sm:p-8"
      >
        <div className="mb-7 border-b border-[var(--color-border)] pb-5">
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--color-brand-teal)]">
            Primary variant
          </p>
          <h2
            className="mt-2 text-3xl uppercase text-[var(--color-brand-navy)]"
            id="variant-details-title"
          >
            Price and inventory
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <label className="mb-2 block text-sm font-bold" htmlFor="variant-name">
              Variant name
            </label>
            <input
              aria-describedby={errors.variantName ? "variant-name-error" : undefined}
              aria-invalid={Boolean(errors.variantName)}
              className={fieldClassName}
              id="variant-name"
              {...register("variantName")}
            />
            <FieldError id="variant-name-error" message={errors.variantName?.message} />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold" htmlFor="product-sku">
              SKU
            </label>
            <input
              aria-describedby={errors.sku ? "product-sku-error" : undefined}
              aria-invalid={Boolean(errors.sku)}
              autoCapitalize="characters"
              className={fieldClassName}
              id="product-sku"
              spellCheck="false"
              {...register("sku")}
            />
            <FieldError id="product-sku-error" message={errors.sku?.message} />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold" htmlFor="product-price">
              Price (USD)
            </label>
            <div className="flex">
              <span className="flex items-center border border-r-0 border-[var(--color-border-strong)] bg-[var(--color-surface-muted)] px-4 text-sm font-bold">
                $
              </span>
              <input
                aria-describedby={`product-price-help${errors.price ? " product-price-error" : ""}`}
                aria-invalid={Boolean(errors.price)}
                className={fieldClassName}
                id="product-price"
                inputMode="decimal"
                placeholder="0.00"
                {...register("price")}
              />
              <input type="hidden" {...register("currency")} />
            </div>
            <p className="mt-2 text-xs text-[var(--color-ink-muted)]" id="product-price-help">
              Stored as exact integer cents.
            </p>
            <FieldError id="product-price-error" message={errors.price?.message} />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold" htmlFor="inventory-policy">
              Inventory policy
            </label>
            <select
              className={fieldClassName}
              id="inventory-policy"
              {...register("inventoryPolicy", {
                onChange: (event) => {
                  if (event.target.value === "DO_NOT_TRACK") {
                    setValue("inventoryQuantity", 0, { shouldValidate: true });
                  }
                },
              })}
            >
              <option value="TRACK">Track quantity</option>
              <option value="DO_NOT_TRACK">Do not track</option>
            </select>
          </div>

          <div className="md:col-start-2 xl:col-start-4">
            <label className="mb-2 block text-sm font-bold" htmlFor="inventory-quantity">
              Inventory quantity
            </label>
            <input
              aria-describedby={errors.inventoryQuantity ? "inventory-quantity-error" : undefined}
              aria-invalid={Boolean(errors.inventoryQuantity)}
              className={fieldClassName}
              disabled={inventoryPolicy === "DO_NOT_TRACK"}
              id="inventory-quantity"
              min="0"
              step="1"
              type="number"
              {...register("inventoryQuantity", { valueAsNumber: true })}
            />
            <FieldError id="inventory-quantity-error" message={errors.inventoryQuantity?.message} />
          </div>
        </div>
      </section>

      {submission.state === "error" ? (
        <div
          className="border-l-4 border-red-700 bg-red-50 px-5 py-4 text-sm font-semibold text-red-900"
          role="alert"
        >
          {submission.message}
        </div>
      ) : null}

      <div className="flex flex-col-reverse justify-between gap-4 border-t border-[var(--color-border)] pt-6 sm:flex-row sm:items-center">
        <Link
          className={buttonVariants({ variant: "secondary" })}
          href="/admin/products"
        >
          <ArrowLeft aria-hidden="true" size={17} />
          Cancel
        </Link>
        <Button disabled={submission.state === "submitting"} type="submit">
          <Save aria-hidden="true" size={17} />
          {submission.state === "submitting"
            ? "Saving…"
            : mode === "create"
              ? "Create draft product"
              : "Save product changes"}
        </Button>
      </div>
    </form>
  );
}
