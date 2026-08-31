"use client";

import { useState } from "react";
import { Archive, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  archiveProductCategoryAction,
  restoreProductCategoryAction,
} from "@/app/admin/categories/actions";
import { Button } from "@/components/ui/button";

type AdminCategoryStatusControlProps = {
  categoryId: string;
  categoryName: string;
  isActive: boolean;
};

export function AdminCategoryStatusControl({
  categoryId,
  categoryName,
  isActive,
}: AdminCategoryStatusControlProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function changeStatus() {
    const actionLabel = isActive ? "archive" : "restore";
    if (!window.confirm(`${actionLabel === "archive" ? "Archive" : "Restore"} ${categoryName}?`)) return;

    setPending(true);
    setError(null);
    const result = isActive
      ? await archiveProductCategoryAction(categoryId)
      : await restoreProductCategoryAction(categoryId);

    if (!result.ok) {
      setError(result.message);
      setPending(false);
      return;
    }

    router.push(`/admin/categories?${isActive ? "archived" : "restored"}=1`);
    router.refresh();
  }

  return (
    <div>
      <Button disabled={pending} onClick={changeStatus} type="button" variant="secondary">
        {isActive ? <Archive aria-hidden="true" size={17} /> : <RotateCcw aria-hidden="true" size={17} />}
        {pending ? "Updating…" : isActive ? "Archive category" : "Restore category"}
      </Button>
      {error ? <p className="mt-3 text-sm font-semibold text-red-700" role="alert">{error}</p> : null}
    </div>
  );
}
