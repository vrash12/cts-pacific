import "server-only";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { readServerEnvironment } from "@/config/env/server";
import * as schema from "@/server/db/schema";

let database: ReturnType<typeof drizzle<typeof schema>> | undefined;

export function getDatabase() {
  if (database) {
    return database;
  }

  const { DATABASE_URL } = readServerEnvironment();

  if (!DATABASE_URL) {
    throw new Error("QUOTE_DATABASE_NOT_CONFIGURED");
  }

  const client = postgres(DATABASE_URL, {
    max: 5,
    prepare: false,
    idle_timeout: 20,
    connect_timeout: 10,
  });

  database = drizzle(client, { schema });
  return database;
}
