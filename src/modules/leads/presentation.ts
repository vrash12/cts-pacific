import type { LeadStatus } from "@/schemas/lead-admin";

export const leadStatusLabels: Record<LeadStatus, string> = {
  NEW: "New",
  REVIEWING: "Reviewing",
  CONTACTED: "Contacted",
  CLOSED: "Closed",
};

export function humanizeLeadValue(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function formatLeadDate(value: Date) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Pacific/Guam",
  }).format(value);
}
