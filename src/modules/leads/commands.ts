import "server-only";

import { eq } from "drizzle-orm";

import {
  type LeadStatusUpdateInput,
  leadStatusUpdateSchema,
} from "@/schemas/lead-admin";
import { assertLeadManagerRole } from "@/server/auth/roles";
import type { AdminActor } from "@/server/auth/require-admin";
import { getDatabase } from "@/server/db/client";
import {
  auditLogs,
  contactSubmissions,
  quoteRequests,
} from "@/server/db/schema";

export class LeadCommandError extends Error {
  constructor(public readonly code: "LEAD_NOT_FOUND") {
    super(code);
    this.name = "LeadCommandError";
  }
}

export async function updateQuoteRequestStatus(
  actor: AdminActor,
  input: LeadStatusUpdateInput,
) {
  assertLeadManagerRole(actor.role);
  const parsed = leadStatusUpdateSchema.parse(input);

  return getDatabase().transaction(async (transaction) => {
    const [request] = await transaction
      .select({
        id: quoteRequests.id,
        referenceNumber: quoteRequests.referenceNumber,
        status: quoteRequests.status,
      })
      .from(quoteRequests)
      .where(eq(quoteRequests.id, parsed.leadId))
      .limit(1)
      .for("update");

    if (!request) {
      throw new LeadCommandError("LEAD_NOT_FOUND");
    }

    if (request.status !== parsed.status) {
      await transaction
        .update(quoteRequests)
        .set({ status: parsed.status, updatedAt: new Date() })
        .where(eq(quoteRequests.id, request.id));
      await transaction.insert(auditLogs).values({
        actorId: actor.id,
        actorEmailSnapshot: actor.email,
        action: "QUOTE_REQUEST_STATUS_UPDATED",
        entityType: "QUOTE_REQUEST",
        entityId: request.id,
        metadata: {
          referenceNumber: request.referenceNumber,
          previousStatus: request.status,
          status: parsed.status,
        },
      });
    }

    return { id: request.id, status: parsed.status };
  });
}

export async function updateContactSubmissionStatus(
  actor: AdminActor,
  input: LeadStatusUpdateInput,
) {
  assertLeadManagerRole(actor.role);
  const parsed = leadStatusUpdateSchema.parse(input);

  return getDatabase().transaction(async (transaction) => {
    const [submission] = await transaction
      .select({
        id: contactSubmissions.id,
        referenceNumber: contactSubmissions.referenceNumber,
        status: contactSubmissions.status,
      })
      .from(contactSubmissions)
      .where(eq(contactSubmissions.id, parsed.leadId))
      .limit(1)
      .for("update");

    if (!submission) {
      throw new LeadCommandError("LEAD_NOT_FOUND");
    }

    if (submission.status !== parsed.status) {
      await transaction
        .update(contactSubmissions)
        .set({ status: parsed.status, updatedAt: new Date() })
        .where(eq(contactSubmissions.id, submission.id));
      await transaction.insert(auditLogs).values({
        actorId: actor.id,
        actorEmailSnapshot: actor.email,
        action: "CONTACT_SUBMISSION_STATUS_UPDATED",
        entityType: "CONTACT_SUBMISSION",
        entityId: submission.id,
        metadata: {
          referenceNumber: submission.referenceNumber,
          previousStatus: submission.status,
          status: parsed.status,
        },
      });
    }

    return { id: submission.id, status: parsed.status };
  });
}
