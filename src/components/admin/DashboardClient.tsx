"use client";

import { githubDeletePost } from "@/app/admin/actions";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Row = {
  title: string;
  date: string;
  category: string;
  published: boolean;
  slug: string;
  sha: string;
};

function formatDate(iso: string) {
  const date = new Date(`${iso}T00:00:00Z`);
  return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

export function DashboardClient({ rows }: { rows: Row[] }) {
  const router = useRouter();
  const [confirm, setConfirm] = useState<Row | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onDelete() {
    if (!confirm) return;
    setBusy(true);
    setError(null);
    try {
      await githubDeletePost({ slug: confirm.slug, sha: confirm.sha, title: confirm.title });
      setConfirm(null);
      router.refresh();
    } catch {
      setError("Delete failed. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-none border border-black/10 bg-white">
      <div className="flex items-center justify-between gap-4 border-b border-black/10 p-5">
        <p className="font-display text-lg tracking-wide text-text">Posts</p>
        <TransitionLink
          href="/admin/new"
          className="inline-flex items-center justify-center rounded-none bg-lime px-5 py-3 font-display text-lg tracking-wide text-text transition-transform duration-200 ease-out hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
        >
          New Post
        </TransitionLink>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="min-w-[880px] w-full border-collapse">
          <thead>
            <tr className="border-b border-black/10 text-left">
              <th className="p-5 font-display text-sm tracking-wide text-black/60">Title</th>
              <th className="p-5 font-display text-sm tracking-wide text-black/60">Date</th>
              <th className="p-5 font-display text-sm tracking-wide text-black/60">Category</th>
              <th className="p-5 font-display text-sm tracking-wide text-black/60">Status</th>
              <th className="p-5 font-display text-sm tracking-wide text-black/60">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.slug} className="border-b border-black/10">
                <td className="p-5 text-sm text-text">{r.title}</td>
                <td className="p-5 text-sm text-black/75">{formatDate(r.date)}</td>
                <td className="p-5 text-sm text-black/75">{r.category}</td>
                <td className="p-5">
                  <span
                    className={
                      r.published
                        ? "rounded-none border border-black/10 bg-bg px-3 py-1 text-xs text-text"
                        : "rounded-none border border-orange/40 bg-white px-3 py-1 text-xs text-orange"
                    }
                  >
                    {r.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="p-5">
                  <div className="flex items-center gap-3">
                    <TransitionLink
                      href={`/admin/edit/${r.slug}`}
                      className="rounded-none border border-black/15 bg-white px-4 py-2 font-display text-sm tracking-wide text-text transition-transform duration-200 ease-out hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
                    >
                      Edit
                    </TransitionLink>
                    <button
                      type="button"
                      onClick={() => setConfirm(r)}
                      className="rounded-none border border-orange/40 bg-white px-4 py-2 font-display text-sm tracking-wide text-orange transition-transform duration-200 ease-out hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td className="p-5 text-sm text-black/75" colSpan={5}>
                  No posts yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {confirm && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Confirm delete"
        >
          <div className="w-full max-w-md rounded-none border border-black/10 bg-white p-6">
            <p className="font-display text-2xl leading-none tracking-tight">Delete this post?</p>
            <p className="mt-3 text-sm leading-relaxed text-black/75">{confirm.title}</p>
            {error && (
              <p className="mt-3 text-sm text-orange" aria-live="polite">
                {error}
              </p>
            )}
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setConfirm(null)}
                className="flex-1 rounded-none border border-black/15 bg-white px-5 py-3 font-display text-lg tracking-wide text-text transition-transform duration-200 ease-out hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={onDelete}
                className="flex-1 rounded-none bg-text px-5 py-3 font-display text-lg tracking-wide text-white transition-transform duration-200 ease-out hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
              >
                {busy ? "Deleting" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

