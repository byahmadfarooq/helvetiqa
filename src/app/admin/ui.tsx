"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLoginClient() {
  const router = useRouter();
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) router.push("/admin/dashboard");
    });
  }, [router, supabase]);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!supabase) return;
    setStatus("loading");
    setError(null);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setStatus("idle");
      setError(authError.message);
      return;
    }

    router.push("/admin/dashboard");
  }

  return (
    <main id="main" className="dot-grid bg-bg">
      <section className="mx-auto max-w-xl px-6 py-20 md:py-32">
        <h1 className="font-display text-6xl leading-none tracking-tight md:text-7xl">Admin</h1>
        <p className="mt-4 text-sm leading-relaxed text-black/75">
          Sign in with your Supabase email and password.
        </p>

        {!supabase && (
          <div className="mt-10 rounded-none border border-orange/40 bg-white p-6">
            <p className="font-display text-xl tracking-wide text-text">Missing config.</p>
            <p className="mt-3 text-sm leading-relaxed text-black/75">
              Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to use admin login.
            </p>
          </div>
        )}

        <form onSubmit={onSubmit} className="mt-10 rounded-none border border-black/10 bg-white p-6">
          <div>
            <label className="font-display text-sm tracking-wide text-black/60" htmlFor="admin-email">
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 h-12 w-full rounded-none border border-black/15 bg-white px-4 font-body text-sm text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
            />
          </div>

          <div className="mt-5">
            <label className="font-display text-sm tracking-wide text-black/60" htmlFor="admin-password">
              Password
            </label>
            <div className="mt-2 flex gap-2">
              <input
                id="admin-password"
                type={show ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 w-full rounded-none border border-black/15 bg-white px-4 font-body text-sm text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
              />
              <button
                type="button"
                onClick={() => setShow((v) => !v)}
                className="h-12 flex-none rounded-none border border-black/15 bg-bg px-4 font-display text-sm tracking-wide text-text transition-transform duration-200 ease-out hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
                aria-label={show ? "Hide password" : "Show password"}
              >
                {show ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="mt-7 flex items-center justify-between gap-4">
            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex h-12 items-center justify-center rounded-none bg-text px-6 font-display text-lg tracking-wide text-white transition-transform duration-200 ease-out hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
            >
              {status === "loading" ? "Signing in" : "Sign in"}
            </button>
            {error && (
              <p className="text-sm text-orange" aria-live="polite">
                {error}
              </p>
            )}
          </div>
        </form>
      </section>
    </main>
  );
}
