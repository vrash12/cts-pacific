import "server-only";

import { count, desc, eq, inArray } from "drizzle-orm";

import type { LeadStatus } from "@/schemas/lead-admin";
import { assertLeadManagerRole } from "@/server/auth/roles";
import type { AdminActor } from "@/server/auth/require-admin";
import { getDatabase } from "@/server/db/client";
import {
  contactSubmissions,
  quoteRequests,
  quoteRequestServices,
} from "@/server/db/schema";

function assertLeadManager(actor: AdminActor) {
  assertLeadManagerRole(actor.role);
}

function summarizeStatuses(
  rows: readonly { status: LeadStatus; count: number }[],
) {
  const summary = {
    all: 0,
    new: 0,
    reviewing: 0,
    contacted: 0,
    closed: 0,
  };

  rows.forEach((row) => {
    summary.all += row.count;
    if (row.status === "NEW") summary.new = row.count;
    if (row.status === "REVIEWING") summary.reviewing = row.count;
    if (row.status === "CONTACTED") summary.contacted = row.count;
    if (row.status === "CLOSED") summary.closed = row.count;
  });

  return summary;
}

export async function getAdminLeadOverview(actor: AdminActor) {
  assertLeadManager(actor);
  const database = getDatabase();
  const [quoteCounts, contactCounts] = await Promise.all([
    database
      .select({ status: quoteRequests.status, count: count() })
      .from(quoteRequests)
      .groupBy(quoteRequests.status),
    database
      .select({ status: contactSubmissions.status, count: count() })
      .from(contactSubmissions)
      .groupBy(contactSubmissions.status),
  ]);

  return {
    quotes: summarizeStatuses(quoteCounts),
    contacts: summarizeStatuses(contactCounts),
  };
}

export async function getAdminNewLeadCount(actor: AdminActor) {
  assertLeadManager(actor);
  const database = getDatabase();
  const [quoteRows, contactRows] = await Promise.all([
    database
      .select({ count: count() })
      .from(quoteRequests)
      .where(eq(quoteRequests.status, "NEW")),
    database
      .select({ count: count() })
      .from(contactSubmissions)
      .where(eq(contactSubmissions.status, "NEW")),
  ]);

  return (quoteRows[0]?.count ?? 0) + (contactRows[0]?.count ?? 0);
}

export async function getAdminQuoteRequests(
  actor: AdminActor,
  status?: LeadStatus,
) {
  assertLeadManager(actor);
  const database = getDatabase();
  const rows = await database
    .select({
      id: quoteRequests.id,
      referenceNumber: quoteRequests.referenceNumber,
      contactName: quoteRequests.contactName,
      company: quoteRequests.company,
      email: quoteRequests.email,
      projectLocation: quoteRequests.projectLocation,
      projectType: quoteRequests.projectType,
      targetTimeline: quoteRequests.targetTimeline,
      status: quoteRequests.status,
      createdAt: quoteRequests.createdAt,
    })
    .from(quoteRequests)
    .where(status ? eq(quoteRequests.status, status) : undefined)
    .orderBy(desc(quoteRequests.createdAt))
    .limit(100);

  if (rows.length === 0) {
    return [];
  }

  const serviceRows = await database
    .select({
      quoteRequestId: quoteRequestServices.quoteRequestId,
      service: quoteRequestServices.service,
    })
    .from(quoteRequestServices)
    .where(inArray(quoteRequestServices.quoteRequestId, rows.map((row) => row.id)));
  const servicesByRequest = new Map<string, string[]>();

  serviceRows.forEach((row) => {
    const services = servicesByRequest.get(row.quoteRequestId) ?? [];
    services.push(row.service);
    servicesByRequest.set(row.quoteRequestId, services);
  });

  return rows.map((row) => ({
    ...row,
    services: servicesByRequest.get(row.id) ?? [],
  }));
}

export async function getAdminQuoteRequest(actor: AdminActor, id: string) {
  assertLeadManager(actor);
  const database = getDatabase();
  const [request] = await database
    .select()
    .from(quoteRequests)
    .where(eq(quoteRequests.id, id))
    .limit(1);

  if (!request) {
    return null;
  }

  const services = await database
    .select({ service: quoteRequestServices.service })
    .from(quoteRequestServices)
    .where(eq(quoteRequestServices.quoteRequestId, id));

  return { ...request, services: services.map((row) => row.service) };
}

export async function getAdminContactSubmissions(
  actor: AdminActor,
  status?: LeadStatus,
) {
  assertLeadManager(actor);

  return getDatabase()
    .select({
      id: contactSubmissions.id,
      referenceNumber: contactSubmissions.referenceNumber,
      name: contactSubmissions.name,
      company: contactSubmissions.company,
      email: contactSubmissions.email,
      inquiryType: contactSubmissions.inquiryType,
      subject: contactSubmissions.subject,
      status: contactSubmissions.status,
      createdAt: contactSubmissions.createdAt,
    })
    .from(contactSubmissions)
    .where(status ? eq(contactSubmissions.status, status) : undefined)
    .orderBy(desc(contactSubmissions.createdAt))
    .limit(100);
}

export async function getAdminContactSubmission(actor: AdminActor, id: string) {
  assertLeadManager(actor);
  const [submission] = await getDatabase()
    .select()
    .from(contactSubmissions)
    .where(eq(contactSubmissions.id, id))
    .limit(1);

  return submission ?? null;
}
