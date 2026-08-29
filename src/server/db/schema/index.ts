import { sql } from "drizzle-orm";
import {
  check,
  index,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

export * from "@/server/db/schema/administration";
export * from "@/server/db/schema/commerce";

export const quoteProjectType = pgEnum("quote_project_type", [
  "commercial",
  "government",
  "industrial",
  "residential",
]);

export const quoteTargetTimeline = pgEnum("quote_target_timeline", [
  "as-soon-as-possible",
  "within-30-days",
  "one-to-three-months",
  "three-to-six-months",
  "six-plus-months",
  "planning-stage",
]);

export const quoteRequestStatus = pgEnum("quote_request_status", [
  "NEW",
  "REVIEWING",
  "CONTACTED",
  "CLOSED",
]);

export const quoteRequests = pgTable(
  "quote_requests",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    submissionId: uuid("submission_id").notNull(),
    referenceNumber: text("reference_number").notNull(),
    projectLocation: text("project_location").notNull(),
    projectType: quoteProjectType("project_type").notNull(),
    targetTimeline: quoteTargetTimeline("target_timeline").notNull(),
    description: text("description").notNull(),
    contactName: text("contact_name").notNull(),
    company: text("company"),
    email: text("email").notNull(),
    phone: text("phone").notNull(),
    status: quoteRequestStatus("status").default("NEW").notNull(),
    sourcePage: text("source_page").default("/quote").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("quote_requests_submission_id_unique").on(table.submissionId),
    uniqueIndex("quote_requests_reference_number_unique").on(table.referenceNumber),
    index("quote_requests_status_created_at_idx").on(table.status, table.createdAt),
    index("quote_requests_email_idx").on(table.email),
    check("quote_requests_description_length", sql`char_length(${table.description}) between 20 and 4000`),
  ],
);

export const quoteRequestServices = pgTable(
  "quote_request_services",
  {
    quoteRequestId: uuid("quote_request_id")
      .notNull()
      .references(() => quoteRequests.id, { onDelete: "cascade" }),
    service: text("service").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.quoteRequestId, table.service] }),
    index("quote_request_services_service_idx").on(table.service),
  ],
);
