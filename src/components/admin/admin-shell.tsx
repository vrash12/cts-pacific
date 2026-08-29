import Image from "next/image";
import Link from "next/link";

import { AdminSignOutButton } from "@/components/admin/admin-sign-out-button";
import { publicEnvironment } from "@/config/env/public";
import type { AdminActor } from "@/server/auth/require-admin";

type AdminShellProps = {
  actor: AdminActor;
  children: React.ReactNode;
};

export function AdminShell({ actor, children }: AdminShellProps) {
  const supabaseUrl = publicEnvironment.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = publicEnvironment.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  return (
    <div className="min-h-screen bg-[#f3f6f8] text-[var(--color-ink)]">
      <a className="skip-link" href="#admin-main">
        Skip to admin content
      </a>

      <header className="bg-[var(--color-brand-navy-deep)] text-white">
        <div className="mx-auto flex min-h-20 w-[min(calc(100%-2.5rem),88rem)] items-center justify-between gap-5">
          <div className="flex min-w-0 items-center gap-5">
            <Link className="shrink-0" href="/admin" aria-label="CTS Pacific administration home">
              <Image
                alt="CTS Pacific"
                className="h-auto w-36 brightness-0 invert"
                height={777}
                priority
                src="/images/logo.png"
                width={2024}
              />
            </Link>
            <span className="hidden h-8 w-px bg-white/20 sm:block" />
            <div className="hidden min-w-0 sm:block">
              <p className="truncate text-sm font-bold">{actor.displayName}</p>
              <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.14em] text-[#78d2d4]">
                {actor.role.replaceAll("_", " ")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              className="hidden min-h-11 items-center border border-white/20 px-4 text-xs font-bold uppercase tracking-[0.1em] text-white transition hover:border-white/50 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:inline-flex"
              href="/"
            >
              View public site
            </Link>
            {supabaseUrl && supabaseAnonKey ? (
              <AdminSignOutButton
                supabaseAnonKey={supabaseAnonKey}
                supabaseUrl={supabaseUrl}
              />
            ) : null}
          </div>
        </div>
      </header>

      <main className="mx-auto w-[min(calc(100%-2.5rem),88rem)] py-10 sm:py-14" id="admin-main">
        {children}
      </main>
    </div>
  );
}
