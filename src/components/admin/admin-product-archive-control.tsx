"use client";

import { useState, useTransition } from "react";
import { ArchiveRestore, ArchiveX } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  archiveProductAction,
  restoreProductAction,
} from "@/app/admin/products/actions";
import { Button } from "@/components/ui/button";

export function AdminProductArchiveControl({
  productId,
  productName,
  status,
}: {
  productId: string;
  productName: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const archived = status === "ARCHIVED";

  function changeStatus() {
    if (
      !archived &&
      !window.confirm(
        `Archive “${productName}”? It will remain private and can be restored later.`,
      )
    ) {
      return;
    }

    setError(null);
    startTransition(async () => {
      const result = archived
        ? await restoreProductAction(productId)
        : await archiveProductAction(productId);

      if (!result.ok) {
        setError(result.message);
        return;
      }

      router.push(
        `/admin/products?${archived ? "restored" : "archived"}=1`,
      );
      router.refresh();
    });
  }

  return (
    <div>
      <Button
        disabled={isPending}
        onClick={changeStatus}
        type="button"
        variant="secondary"
      >
        {archived ? (
          <ArchiveRestore aria-hidden="true" size={17} />
        ) : (
          <ArchiveX aria-hidden="true" size={17} />
        )}
        {isPending
          ? "Updating…"
          : archived
            ? "Restore to draft"
            : "Archive product"}
      </Button>
      {error ? (
        <p className="mt-3 max-w-md text-sm font-semibold text-red-700" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
