"use client";

import { useMemo, useState } from "react";

export function EmailCapture({
  source,
  title = "Get the framework notes.",
  subtitle = "One email. No spam. Real systems.",
}: {
  source: string;
  title?: string;
  subtitle?: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  const disabled = useMemo(() => status === "loading", [status]);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("loading");
    setMessage(null);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, source }),
      });

      const data = (await res.json().catch(() => null)) as { error?: string } | null;

      if (!res.ok) {
        setStatus("error");
        setMessage(data?.error ?? "Something broke. Try again.");
        return;
      }

      setStatus("success");
      setMessage("You are in. Check your inbox.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Network error. Try again.");
    }
  }

  return (
    <section className="dot-grid bg-bg py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-display text-5xl leading-none tracking-tight md:text-6xl">{title}</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-black/75 md:text-base">{subtitle}</p>
          </div>

          <form onSubmit={onSubmit} className="w-full max-w-lg">
            <label className="sr-only" htmlFor={`email-${source}`}>
              Email
            </label>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
              <input
                id={`email-${source}`}
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 w-full rounded-none border border-black/15 bg-white px-4 font-body text-sm text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
              />
              <button
                type="submit"
                disabled={disabled}
                className="h-14 rounded-none bg-text px-6 font-display text-lg tracking-wide text-white transition-transform duration-200 ease-out hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
              >
                {status === "loading" ? "Saving" : "Join"}
              </button>
            </div>

            {message && (
              <p
                className="mt-3 text-sm"
                aria-live="polite"
                style={{ color: status === "success" ? "#0A0A0A" : "#E8341A" }}
              >
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
