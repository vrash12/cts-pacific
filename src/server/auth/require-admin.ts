import "server-only";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

import { readServerEnvironment } from "@/config/env/server";
import type { AdminRole } from "@/server/auth/roles";
import {
  createSupabaseServerClient,
  isSupabaseAuthConfigured,
} from "@/server/auth/supabase-server";
import { getDatabase } from "@/server/db/client";
import { adminProfiles } from "@/server/db/schema";

type AdminSetupReason = "SUPABASE_AUTH" | "DATABASE" | "DATABASE_SCHEMA";

export type AdminActor = {
  id: string;
  email: string | null;
  displayName: string;
  role: AdminRole;
};

export type AdminAccess =
  | { status: "setup-required"; reason: AdminSetupReason }
  | { status: "forbidden"; email: string | null }
  | {
      status: "authorized";
      actor: AdminActor;
    };

export async function requireAdmin(): Promise<AdminAccess> {
  if (!isSupabaseAuthConfigured()) {
    return { status: "setup-required", reason: "SUPABASE_AUTH" };
  }

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return { status: "setup-required", reason: "SUPABASE_AUTH" };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { DATABASE_URL } = readServerEnvironment();

  if (!DATABASE_URL) {
    return { status: "setup-required", reason: "DATABASE" };
  }

  try {
    const database = getDatabase();
    const profile = await database.query.adminProfiles.findFirst({
      columns: {
        id: true,
        displayName: true,
        role: true,
        isActive: true,
      },
      where: eq(adminProfiles.id, user.id),
    });

    if (!profile?.isActive) {
      return { status: "forbidden", email: user.email ?? null };
    }

    return {
      status: "authorized",
      actor: {
        id: profile.id,
        email: user.email ?? null,
        displayName: profile.displayName,
        role: profile.role,
      },
    };
  } catch {
    return { status: "setup-required", reason: "DATABASE_SCHEMA" };
  }
}
