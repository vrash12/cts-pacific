import Image from "next/image";
import Link from "next/link";
import { LockKeyhole } from "lucide-react";
import { redirect } from "next/navigation";

import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { publicEnvironment } from "@/config/env/public";
import { createSupabaseServerClient } from "@/server/auth/supabase-server";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const supabaseUrl = publicEnvironment.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = publicEnvironment.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseAnonKey) {
    const supabase = await createSupabaseServerClient();
    const { data } = (await supabase?.auth.getUser()) ?? { data: { user: null } };

    if (data.user) {
      redirect("/admin");
    }
  }

  return (
    <main className="grid min-h-screen bg-[var(--color-surface-muted)] lg:grid-cols-[0.9fr_1.1fr]">
      <section className="flex min-h-[38vh] flex-col justify-between bg-[var(--color-brand-navy-deep)] p-7 text-white sm:p-12 lg:min-h-screen lg:p-16">
        <Link href="/" aria-label="Return to the CTS Pacific website">
          <Image
            alt="CTS Pacific"
            className="h-auto w-44 brightness-0 invert"
            height={777}
            priority
            src="/images/logo.png"
            width={2024}
          />
        </Link>

        <div className="mt-16 max-w-xl lg:mt-0">
          <p className="mb-5 flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.16em] text-[#78d2d4]">
            <span className="h-px w-9 bg-current" />
            Internal workspace
          </p>
          <h1 className="text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.9] uppercase tracking-[-0.055em]">
            Commerce administration.
          </h1>
          <p className="mt-7 max-w-lg text-base leading-7 text-white/68">
            Prepare products and payment configuration privately before any storefront is enabled.
          </p>
        </div>

        <p className="mt-12 text-xs text-white/50">Corerin Technical Solutions, LLC dba CTS Pacific</p>
      </section>

      <section className="flex items-center px-6 py-14 sm:px-12 lg:px-[clamp(4rem,9vw,9rem)]">
        <div className="w-full max-w-md">
          <LockKeyhole aria-hidden="true" className="mb-7 text-[var(--color-brand-teal)]" size={30} strokeWidth={1.7} />
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--color-brand-teal)]">Authorized personnel only</p>
          <h2 className="mt-3 text-4xl uppercase text-[var(--color-brand-navy)] sm:text-5xl">Sign in</h2>
          <p className="mt-5 mb-8 text-sm leading-7 text-[var(--color-ink-muted)]">
            Administration access is verified through Supabase Auth and the active CTS Pacific administrator profile.
          </p>

          {supabaseUrl && supabaseAnonKey ? (
            <AdminLoginForm
              supabaseAnonKey={supabaseAnonKey}
              supabaseUrl={supabaseUrl}
            />
          ) : (
            <div className="border-l-4 border-amber-500 bg-amber-50 p-5 text-sm leading-7 text-amber-950">
              <strong className="block font-extrabold uppercase tracking-[0.08em]">Admin authentication is not configured</strong>
              Add <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</code>, then restart the server.
            </div>
          )}

          <Link className="mt-8 inline-flex text-xs font-extrabold uppercase tracking-[0.1em] text-[var(--color-brand-navy)] underline decoration-[var(--color-brand-blue)] underline-offset-4" href="/">
            Return to public website
          </Link>
        </div>
      </section>
    </main>
  );
}
