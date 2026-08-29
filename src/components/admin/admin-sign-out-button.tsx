"use client";

import { createBrowserClient } from "@supabase/ssr";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type AdminSignOutButtonProps = {
  supabaseUrl: string;
  supabaseAnonKey: string;
};

export function AdminSignOutButton({
  supabaseUrl,
  supabaseAnonKey,
}: AdminSignOutButtonProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  async function signOut() {
    setIsPending(true);
    const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);
    await supabase.auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <button
      className="inline-flex min-h-11 items-center gap-2 border border-white/20 px-4 text-xs font-bold uppercase tracking-[0.1em] text-white transition hover:border-white/50 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:opacity-60"
      disabled={isPending}
      onClick={signOut}
      type="button"
    >
      <LogOut aria-hidden="true" size={16} />
      {isPending ? "Signing out" : "Sign out"}
    </button>
  );
}
