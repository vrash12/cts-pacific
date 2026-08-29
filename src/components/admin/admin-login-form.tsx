"use client";

import { createBrowserClient } from "@supabase/ssr";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

type AdminLoginFormProps = {
  supabaseUrl: string;
  supabaseAnonKey: string;
};

export function AdminLoginForm({
  supabaseUrl,
  supabaseAnonKey,
}: AdminLoginFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError("The email or password was not accepted.");
      setIsSubmitting(false);
      return;
    }

    router.replace("/admin");
    router.refresh();
  }

  return (
    <form className="grid gap-5" onSubmit={handleSubmit}>
      <div className="grid gap-2">
        <label className="text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--color-brand-navy)]" htmlFor="admin-email">
          Email address
        </label>
        <input
          autoComplete="email"
          className="min-h-12 border border-[var(--color-border-strong)] bg-white px-4 text-base text-[var(--color-ink)] outline-none transition focus:border-[var(--color-brand-blue)] focus:ring-2 focus:ring-[var(--color-focus)]/20"
          id="admin-email"
          name="email"
          required
          type="email"
        />
      </div>

      <div className="grid gap-2">
        <label className="text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--color-brand-navy)]" htmlFor="admin-password">
          Password
        </label>
        <input
          autoComplete="current-password"
          className="min-h-12 border border-[var(--color-border-strong)] bg-white px-4 text-base text-[var(--color-ink)] outline-none transition focus:border-[var(--color-brand-blue)] focus:ring-2 focus:ring-[var(--color-focus)]/20"
          id="admin-password"
          minLength={8}
          name="password"
          required
          type="password"
        />
      </div>

      {error ? (
        <p className="border-l-4 border-red-600 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
          {error}
        </p>
      ) : null}

      <button
        className="inline-flex min-h-13 items-center justify-center gap-3 bg-[var(--color-brand-blue)] px-6 text-sm font-extrabold uppercase tracking-[0.1em] text-white transition hover:bg-[var(--color-brand-navy)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-60"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? (
          <LoaderCircle aria-hidden="true" className="animate-spin" size={18} />
        ) : (
          <ArrowRight aria-hidden="true" size={18} />
        )}
        {isSubmitting ? "Signing in" : "Sign in to administration"}
      </button>
    </form>
  );
}
