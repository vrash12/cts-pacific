import {
  boolean,
  index,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const adminRole = pgEnum("admin_role", [
  "SUPER_ADMIN",
  "ADMIN",
  "CONTENT_EDITOR",
  "ORDER_MANAGER",
]);

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
