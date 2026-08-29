import { sql } from "drizzle-orm";
import {
  type AnyPgColumn,
  boolean,
  check,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const productStatus = pgEnum("product_status", [
  "DRAFT",
  "PUBLISHED",
  "ARCHIVED",
]);

export const inventoryPolicy = pgEnum("inventory_policy", [
  "TRACK",
  "DO_NOT_TRACK",
]);

export const orderStatus = pgEnum("order_status", [
  "DRAFT",
  "PENDING_PAYMENT",
  "PAID",
  "CANCELLED",
  "REFUNDED",
]);

export const paymentProvider = pgEnum("payment_provider", ["PAYPAL"]);

export const paymentMethod = pgEnum("payment_method", ["PAYPAL", "CARD"]);

export const paymentStatus = pgEnum("payment_status", [
  "CREATED",
  "APPROVED",
  "CAPTURED",
  "FAILED",
  "CANCELLED",
  "REFUNDED",
]);

export const paymentEventVerification = pgEnum("payment_event_verification", [
  "PENDING",
  "VERIFIED",
  "REJECTED",
]);

export const productCategories = pgTable(
  "product_categories",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    parentId: uuid("parent_id").references(
      (): AnyPgColumn => productCategories.id,
      { onDelete: "set null" },
    ),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    description: text("description"),
    displayOrder: integer("display_order").default(0).notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("product_categories_slug_unique").on(table.slug),
    index("product_categories_parent_display_idx").on(
      table.parentId,
      table.displayOrder,
    ),
    check("product_categories_display_order_nonnegative", sql`${table.displayOrder} >= 0`),
    check("product_categories_no_self_parent", sql`${table.parentId} is null or ${table.parentId} <> ${table.id}`),
  ],
);

export const products = pgTable(
  "products",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    categoryId: uuid("category_id")
      .notNull()
      .references(() => productCategories.id, { onDelete: "restrict" }),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    description: text("description"),
    status: productStatus("status").default("DRAFT").notNull(),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("products_slug_unique").on(table.slug),
    index("products_category_status_idx").on(table.categoryId, table.status),
  ],
);

export const productVariants = pgTable(
  "product_variants",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    productId: uuid("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    sku: text("sku").notNull(),
    name: text("name").notNull(),
    priceMinor: integer("price_minor").notNull(),
    currency: varchar("currency", { length: 3 }).default("USD").notNull(),
    inventoryPolicy: inventoryPolicy("inventory_policy")
      .default("TRACK")
      .notNull(),
    inventoryQuantity: integer("inventory_quantity").default(0).notNull(),
    allowBackorder: boolean("allow_backorder").default(false).notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("product_variants_sku_unique").on(table.sku),
    index("product_variants_product_active_idx").on(table.productId, table.isActive),
    check("product_variants_price_nonnegative", sql`${table.priceMinor} >= 0`),
    check("product_variants_inventory_nonnegative", sql`${table.inventoryQuantity} >= 0`),
    check("product_variants_currency_iso", sql`${table.currency} ~ '^[A-Z]{3}$'`),
  ],
);

export const productImages = pgTable(
  "product_images",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    productId: uuid("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    storagePath: text("storage_path").notNull(),
    altText: text("alt_text").notNull(),
    displayOrder: integer("display_order").default(0).notNull(),
    width: integer("width"),
    height: integer("height"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("product_images_storage_path_unique").on(table.storagePath),
    index("product_images_product_display_idx").on(table.productId, table.displayOrder),
    check("product_images_display_order_nonnegative", sql`${table.displayOrder} >= 0`),
    check("product_images_width_positive", sql`${table.width} is null or ${table.width} > 0`),
    check("product_images_height_positive", sql`${table.height} is null or ${table.height} > 0`),
  ],
);

export const orders = pgTable(
  "orders",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    orderNumber: text("order_number").notNull(),
    emailSnapshot: text("email_snapshot").notNull(),
    status: orderStatus("status").default("DRAFT").notNull(),
    currency: varchar("currency", { length: 3 }).default("USD").notNull(),
    subtotalMinor: integer("subtotal_minor").notNull(),
    taxMinor: integer("tax_minor").default(0).notNull(),
    shippingMinor: integer("shipping_minor").default(0).notNull(),
    totalMinor: integer("total_minor").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("orders_order_number_unique").on(table.orderNumber),
    index("orders_status_created_at_idx").on(table.status, table.createdAt),
    index("orders_email_idx").on(table.emailSnapshot),
    check("orders_amounts_nonnegative", sql`${table.subtotalMinor} >= 0 and ${table.taxMinor} >= 0 and ${table.shippingMinor} >= 0 and ${table.totalMinor} >= 0`),
    check("orders_total_reconciles", sql`${table.totalMinor} = ${table.subtotalMinor} + ${table.taxMinor} + ${table.shippingMinor}`),
    check("orders_currency_iso", sql`${table.currency} ~ '^[A-Z]{3}$'`),
  ],
);

export const orderItems = pgTable(
  "order_items",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    orderId: uuid("order_id")
      .notNull()
      .references(() => orders.id, { onDelete: "cascade" }),
    variantId: uuid("variant_id")
      .notNull()
      .references(() => productVariants.id, { onDelete: "restrict" }),
    skuSnapshot: text("sku_snapshot").notNull(),
    nameSnapshot: text("name_snapshot").notNull(),
    unitPriceMinor: integer("unit_price_minor").notNull(),
    quantity: integer("quantity").notNull(),
    lineTotalMinor: integer("line_total_minor").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("order_items_order_idx").on(table.orderId),
    check("order_items_quantity_positive", sql`${table.quantity} > 0`),
    check("order_items_price_nonnegative", sql`${table.unitPriceMinor} >= 0 and ${table.lineTotalMinor} >= 0`),
    check("order_items_total_reconciles", sql`${table.lineTotalMinor} = ${table.unitPriceMinor} * ${table.quantity}`),
  ],
);

export const payments = pgTable(
  "payments",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    orderId: uuid("order_id")
      .notNull()
      .references(() => orders.id, { onDelete: "restrict" }),
    provider: paymentProvider("provider").default("PAYPAL").notNull(),
    method: paymentMethod("method").notNull(),
    providerOrderId: text("provider_order_id"),
    providerCaptureId: text("provider_capture_id"),
    amountMinor: integer("amount_minor").notNull(),
    currency: varchar("currency", { length: 3 }).notNull(),
    status: paymentStatus("status").default("CREATED").notNull(),
    idempotencyKey: text("idempotency_key").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("payments_idempotency_key_unique").on(table.idempotencyKey),
    uniqueIndex("payments_provider_order_id_unique").on(table.providerOrderId),
    uniqueIndex("payments_provider_capture_id_unique").on(table.providerCaptureId),
    index("payments_order_status_idx").on(table.orderId, table.status),
    check("payments_amount_nonnegative", sql`${table.amountMinor} >= 0`),
    check("payments_currency_iso", sql`${table.currency} ~ '^[A-Z]{3}$'`),
  ],
);

export const paymentEvents = pgTable(
  "payment_events",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    paymentId: uuid("payment_id").references(() => payments.id, {
      onDelete: "set null",
    }),
    providerEventId: text("provider_event_id").notNull(),
    eventType: text("event_type").notNull(),
    verification: paymentEventVerification("verification")
      .default("PENDING")
      .notNull(),
    redactedPayload: jsonb("redacted_payload")
      .$type<Record<string, unknown>>()
      .notNull(),
    processedAt: timestamp("processed_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("payment_events_provider_event_id_unique").on(table.providerEventId),
    index("payment_events_payment_created_idx").on(table.paymentId, table.createdAt),
  ],
);
