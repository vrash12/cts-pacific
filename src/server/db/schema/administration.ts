import {
  boolean,
  index,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const adminRole = pgEnum("admin_role", ["ADMIN"]);

export const adminProfiles = pgTable(
  "admin_profiles",
  {
    id: uuid("id").primaryKey(),
    role: adminRole("role").notNull(),
    displayName: text("display_name").notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("admin_profiles_role_active_idx").on(table.role, table.isActive),
  ],
);

export const auditLogs = pgTable(
  "audit_logs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    actorId: uuid("actor_id").references(() => adminProfiles.id, {
      onDelete: "set null",
    }),
    actorEmailSnapshot: text("actor_email_snapshot"),
    action: text("action").notNull(),
    entityType: text("entity_type").notNull(),
    entityId: uuid("entity_id"),
    metadata: jsonb("metadata")
      .$type<Record<string, string | number | boolean | null>>()
      .default({})
      .notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("audit_logs_actor_created_at_idx").on(
      table.actorId,
      table.createdAt,
    ),
    index("audit_logs_entity_created_at_idx").on(
      table.entityType,
      table.entityId,
      table.createdAt,
    ),
  ],
);
