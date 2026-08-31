"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FieldPath, useForm } from "react-hook-form";

import {
  createProductCategoryAction,
  updateProductCategoryAction,
} from "@/app/admin/categories/actions";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  type ProductCategoryAdminFormInput,
  productCategoryAdminFormSchema,
} from "@/schemas/product-category";

type AdminCategoryFormProps = {
  initialValues: ProductCategoryAdminFormInput;
  mode: "create" | "edit";
  categoryId?: string;
  lastKnownUpdatedAt?: string;
};

const fieldClassName =
  "min-h-12 w-full border border-[var(--color-border-strong)] bg-white px-4 text-sm text-[var(--color-ink)] outline-none transition focus:border-[var(--color-brand-blue)] focus:ring-2 focus:ring-[var(--color-brand-blue)]/20 disabled:cursor-not-allowed disabled:bg-[var(--color-surface-subtle)]";

function createSlug(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 100);
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? (
    <p className="mt-2 text-sm font-semibold text-red-700" id={id} role="alert">
      {message}
    </p>
  ) : null;
}

export function AdminCategoryForm({
  initialValues,
  mode,
  categoryId,
  lastKnownUpdatedAt,
}: AdminCategoryFormProps) {
  const router = useRouter();
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProductCategoryAdminFormInput>({
    resolver: zodResolver(productCategoryAdminFormSchema),
    mode: "onTouched",
    defaultValues: initialValues,
  });

  async function submitCategory(values: ProductCategoryAdminFormInput) {
    setSubmissionError(null);
    const result =
      mode === "create"
        ? await createProductCategoryAction(values)
        : await updateProductCategoryAction({
            ...values,
            categoryId: categoryId ?? "",
            lastKnownUpdatedAt: lastKnownUpdatedAt ?? "",
          });

    if (!result.ok) {
      Object.entries(result.fieldErrors ?? {}).forEach(([field, message]) => {
        if (message) {
          setError(field as FieldPath<ProductCategoryAdminFormInput>, {
            type: "server",
            message,
          });
        }
      });
      setSubmissionError(result.message);
      return;
    }

    router.push(`/admin/categories?${mode === "create" ? "created" : "updated"}=1`);
    router.refresh();
  }

  return (
    <form className="grid gap-8" noValidate onSubmit={handleSubmit(submitCategory)}>
      <section className="border border-[var(--color-border)] bg-white p-6 shadow-[0_0.8rem_2rem_rgb(11_41_66_/_0.05)] sm:p-8">
        <div className="mb-7 border-b border-[var(--color-border)] pb-5">
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--color-brand-teal)]">Private catalog structure</p>
          <h2 className="mt-2 text-3xl uppercase text-[var(--color-brand-navy)]">Category details</h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-bold" htmlFor="category-name">Category name</label>
            <input aria-describedby={errors.name ? "category-name-error" : undefined} aria-invalid={Boolean(errors.name)} className={fieldClassName} id="category-name" {...register("name")} />
            <FieldError id="category-name-error" message={errors.name?.message} />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold" htmlFor="category-order">Display order</label>
            <input aria-describedby={errors.displayOrder ? "category-order-error" : undefined} aria-invalid={Boolean(errors.displayOrder)} className={fieldClassName} id="category-order" min="0" step="1" type="number" {...register("displayOrder", { valueAsNumber: true })} />
            <FieldError id="category-order-error" message={errors.displayOrder?.message} />
          </div>

          <div className="lg:col-span-2">
            <div className="mb-2 flex flex-wrap items-end justify-between gap-2">
              <label className="block text-sm font-bold" htmlFor="category-slug">Category slug</label>
              <button className="text-xs font-extrabold uppercase tracking-[0.08em] text-[var(--color-brand-blue)] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]" onClick={() => setValue("slug", createSlug(getValues("name")), { shouldDirty: true, shouldValidate: true })} type="button">
                Generate from name
              </button>
            </div>
            <input aria-describedby={errors.slug ? "category-slug-error" : undefined} aria-invalid={Boolean(errors.slug)} className={fieldClassName} id="category-slug" spellCheck="false" {...register("slug")} />
            <FieldError id="category-slug-error" message={errors.slug?.message} />
          </div>

          <div className="lg:col-span-2">
            <label className="mb-2 block text-sm font-bold" htmlFor="category-description">Internal description <span className="font-normal text-[var(--color-ink-muted)]">(optional)</span></label>
            <textarea aria-describedby={errors.description ? "category-description-error" : "category-description-help"} aria-invalid={Boolean(errors.description)} className={`${fieldClassName} min-h-36 py-3`} id="category-description" rows={5} {...register("description")} />
            <p className="mt-2 text-xs leading-5 text-[var(--color-ink-muted)]" id="category-description-help">Use only client-approved wording. Categories and descriptions remain private while commerce is disabled.</p>
            <FieldError id="category-description-error" message={errors.description?.message} />
          </div>
        </div>
      </section>

      {submissionError ? (
        <div className="border-l-4 border-red-700 bg-red-50 px-5 py-4 text-sm font-semibold text-red-900" role="alert">{submissionError}</div>
      ) : null}

      <div className="flex flex-col-reverse justify-between gap-4 border-t border-[var(--color-border)] pt-6 sm:flex-row sm:items-center">
        <Link className={buttonVariants({ variant: "secondary" })} href="/admin/categories"><ArrowLeft aria-hidden="true" size={17} />Cancel</Link>
        <Button disabled={isSubmitting} type="submit"><Save aria-hidden="true" size={17} />{isSubmitting ? "Saving…" : mode === "create" ? "Create category" : "Save category changes"}</Button>
      </div>
    </form>
  );
}
