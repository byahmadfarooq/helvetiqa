"use client";

import { services } from "@/lib/site";
import { useMemo, useState } from "react";

const howFoundOptions = ["LinkedIn", "Google", "Referral", "Other"] as const;

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [howFound, setHowFound] = useState<(typeof howFoundOptions)[number]>("LinkedIn");
  const [selected, setSelected] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState<string | null>(null);

  const serviceOptions = useMemo(() => services.map((s) => s.name), []);

  function toggleService(service: string) {
    setSelected((prev) => (prev.includes(service) ? prev.filter((s) => s !== service) : prev.concat(service)));
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("loading");
    setFeedback(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          source: "work_with_us",
          services: selected,
          howFound,
        }),
      });

      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      if (!res.ok) {
        setStatus("error");
        setFeedback(data?.error ?? "Something broke. Try again.");
        return;
      }

      setStatus("success");
      setFeedback("Sent. We will reply by email.");
      setName("");
      setEmail("");
      setMessage("");
      setSelected([]);
    } catch {
      setStatus("error");
      setFeedback("Network error. Try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-none border border-black/10 bg-white p-6">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label className="font-display text-sm tracking-wide text-black/60" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 h-12 w-full rounded-none border border-black/15 bg-white px-4 font-body text-sm text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
          />
        </div>
        <div>
          <label className="font-display text-sm tracking-wide text-black/60" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 h-12 w-full rounded-none border border-black/15 bg-white px-4 font-body text-sm text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
          />
        </div>
      </div>

      <div className="mt-6">
        <p className="font-display text-sm tracking-wide text-black/60">Services needed</p>
        <ul role="list" className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {serviceOptions.map((s) => {
            const checked = selected.includes(s);
            return (
              <li key={s}>
                <label className="flex cursor-pointer items-center gap-3 rounded-none border border-black/10 bg-bg px-4 py-3">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleService(s)}
                    className="h-4 w-4 rounded-none border-black/30 text-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
                  />
                  <span className="text-sm text-text">{s}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-6">
        <label className="font-display text-sm tracking-wide text-black/60" htmlFor="message">
          Tell us more
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
          className="mt-2 w-full rounded-none border border-black/15 bg-white px-4 py-3 font-body text-sm text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
        />
      </div>

      <div className="mt-6">
        <label className="font-display text-sm tracking-wide text-black/60" htmlFor="howFound">
          How did you find us
        </label>
        <select
          id="howFound"
          value={howFound}
          onChange={(e) => setHowFound(e.target.value as (typeof howFoundOptions)[number])}
          className="mt-2 h-12 w-full rounded-none border border-black/15 bg-white px-4 font-body text-sm text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
        >
          {howFoundOptions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex h-12 items-center justify-center rounded-none bg-lime px-6 font-display text-lg tracking-wide text-text transition-transform duration-200 ease-out hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
        >
          {status === "loading" ? "Sending" : "Send"}
        </button>
        {feedback && (
          <p
            className="text-sm"
            aria-live="polite"
            style={{ color: status === "success" ? "#0A0A0A" : "#E8341A" }}
          >
            {feedback}
          </p>
        )}
      </div>
    </form>
  );
}

