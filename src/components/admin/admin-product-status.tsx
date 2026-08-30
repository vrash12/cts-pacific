import { CheckCircle2, EyeOff, FilePenLine } from "lucide-react";

type ProductStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

const statusPresentation = {
  DRAFT: {
    label: "Draft",
    className: "bg-amber-100 text-amber-900",
    icon: FilePenLine,
  },
  PUBLISHED: {
    label: "Published",
    className: "bg-emerald-100 text-emerald-800",
    icon: CheckCircle2,
  },
  ARCHIVED: {
    label: "Archived",
    className: "bg-slate-200 text-slate-700",
    icon: EyeOff,
  },
} as const;

export function AdminProductStatus({ status }: { status: ProductStatus }) {
  const presentation = statusPresentation[status];
  const Icon = presentation.icon;

  return (
    <span
      className={`inline-flex w-fit items-center gap-2 px-3 py-1 text-[0.65rem] font-extrabold uppercase tracking-[0.1em] ${presentation.className}`}
    >
      <Icon aria-hidden="true" size={14} />
      {presentation.label}
    </span>
  );
}
