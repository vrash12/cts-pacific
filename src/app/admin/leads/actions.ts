"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  updateContactSubmissionStatus,
  updateQuoteRequestStatus,
} from "@/modules/leads/commands";
import { leadStatusUpdateSchema } from "@/schemas/lead-admin";
import { canManageLeads } from "@/server/auth/roles";
import { requireAdmin } from "@/server/auth/require-admin";

async function getLeadActionActor() {
  const access = await requireAdmin();

  if (access.status !== "authorized" || !canManageLeads(access.actor.role)) {
    return null;
  }

  return access.actor;
}

function parseStatusForm(formData: FormData) {
  return leadStatusUpdateSchema.safeParse({
    leadId: formData.get("leadId"),
    status: formData.get("status"),
  });
}

export async function updateQuoteLeadStatusAction(formData: FormData) {
  const actor = await getLeadActionActor();
  const parsed = parseStatusForm(formData);

  if (!actor || !parsed.success) {
    redirect("/admin/leads/quotes?error=status");
  }

  let destination = `/admin/leads/quotes/${parsed.data.leadId}?updated=1`;

  try {
    await updateQuoteRequestStatus(actor, parsed.data);
    revalidatePath("/admin");
    revalidatePath("/admin/leads");
    revalidatePath("/admin/leads/quotes");
    revalidatePath(`/admin/leads/quotes/${parsed.data.leadId}`);
  } catch {
    destination = `/admin/leads/quotes/${parsed.data.leadId}?error=status`;
  }

  redirect(destination);
}

export async function updateContactLeadStatusAction(formData: FormData) {
  const actor = await getLeadActionActor();
  const parsed = parseStatusForm(formData);

  if (!actor || !parsed.success) {
    redirect("/admin/leads/contacts?error=status");
  }

  let destination = `/admin/leads/contacts/${parsed.data.leadId}?updated=1`;

  try {
    await updateContactSubmissionStatus(actor, parsed.data);
    revalidatePath("/admin");
    revalidatePath("/admin/leads");
    revalidatePath("/admin/leads/contacts");
    revalidatePath(`/admin/leads/contacts/${parsed.data.leadId}`);
  } catch {
    destination = `/admin/leads/contacts/${parsed.data.leadId}?error=status`;
  }

  redirect(destination);
}
