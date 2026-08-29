import "server-only";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { publicEnvironment } from "@/config/env/public";

export function isSupabaseAuthConfigured() {
  return Boolean(
    publicEnvironment.NEXT_PUBLIC_SUPABASE_URL &&
      publicEnvironment.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

export async function createSupabaseServerClient() {
  const supabaseUrl = publicEnvironment.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = publicEnvironment.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Components cannot always write cookies. The route proxy
          // handles session refreshes for every /admin request.
        }
      },
    },
  });
}
