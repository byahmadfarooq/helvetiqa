"use client";

import { githubCreatePost, githubUpdatePost } from "@/app/admin/actions";
import { kebabCase } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const categories = [
  "Growth Frameworks",
  "Content Systems",
  "Philosophy",
  "Brand Strategy",
  "Productivity Systems",
] as const;

type Category = (typeof categories)[number];

export function PostEditor(props: {
  mode: "new" | "edit";
  initial?: {
    title: string;
    slug: string;
    date: string;
    excerpt: string;
    category: Category;
    body: string;
    published: boolean;
    sha?: string;
  };
}) {
  const router = useRouter();

  const initial = props.initial;
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [date, setDate] = useState(initial?.date ?? new Date().toISOString().slice(0, 10));
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [category, setCategory] = useState<Category>(initial?.category ?? "Growth Frameworks");
  const [body, setBody] = useState(initial?.body ?? "");
  const [published, setPublished] = useState(initial?.published ?? false);
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const [error, setError] = useState<string | null>(null);

  const autoSlug = useMemo(() => kebabCase(title), [title]);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("loading");
    setError(null);

    try {
      if (props.mode === "new") {
        const res = await githubCreatePost({
          title,
          slug: slug || autoSlug,
          category,
          excerpt,
          body,
          published,
        });

        if (!res.ok) {
          setError(res.error);
          setStatus("idle");
          return;
        }

        router.push("/admin/dashboard");
        return;
      }

      if (!initial?.sha) {
        setError("Missing SHA.");
        setStatus("idle");
        return;
      }

      await githubUpdatePost({
        slug,
        sha: initial.sha,
        title,
        date,
        category,
        excerpt,
        body,
        published,
      });

      router.push("/admin/dashboard");
    } catch {
      setError("Save failed. Try again.");
      setStatus("idle");
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-none border border-black/10 bg-white p-6">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label className="font-display text-sm tracking-wide text-black/60" htmlFor="post-title">
            Title
          </label>
          <input
            id="post-title"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 h-12 w-full rounded-none border border-black/15 bg-white px-4 font-body text-sm text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
          />
        </div>

        <div>
          <label className="font-display text-sm tracking-wide text-black/60" htmlFor="post-slug">
            Slug
          </label>
          <input
            id="post-slug"
            type="text"
            required
            value={slug}
            onChange={(e) => setSlug(kebabCase(e.target.value))}
            onFocus={() => {
              if (!slug) setSlug(autoSlug);
            }}
            className="mt-2 h-12 w-full rounded-none border border-black/15 bg-white px-4 font-body text-sm text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
          />
          {props.mode === "new" && (
            <p className="mt-2 text-xs text-black/60">Auto from title. You can edit it.</p>
          )}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label className="font-display text-sm tracking-wide text-black/60" htmlFor="post-category">
            Category
          </label>
          <select
            id="post-category"
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="mt-2 h-12 w-full rounded-none border border-black/15 bg-white px-4 font-body text-sm text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-display text-sm tracking-wide text-black/60" htmlFor="post-date">
            Date
          </label>
          <input
            id="post-date"
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-2 h-12 w-full rounded-none border border-black/15 bg-white px-4 font-body text-sm text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
          />
        </div>
      </div>

      <div className="mt-6">
        <label className="font-display text-sm tracking-wide text-black/60" htmlFor="post-excerpt">
          Excerpt
        </label>
        <textarea
          id="post-excerpt"
          required
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={3}
          className="mt-2 w-full rounded-none border border-black/15 bg-white px-4 py-3 font-body text-sm text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
        />
      </div>

      <div className="mt-6">
        <label className="font-display text-sm tracking-wide text-black/60" htmlFor="post-body">
          Body
        </label>
        <textarea
          id="post-body"
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={14}
          className="mt-2 w-full rounded-none border border-black/15 bg-white px-4 py-3 font-body text-sm text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
        />
      </div>

      <div className="mt-6 flex items-center gap-3">
        <input
          id="post-published"
          type="checkbox"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
          className="h-4 w-4 rounded-none border-black/30 text-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
        />
        <label htmlFor="post-published" className="text-sm text-text">
          Published
        </label>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex h-12 items-center justify-center rounded-none bg-lime px-6 font-display text-lg tracking-wide text-text transition-transform duration-200 ease-out hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
        >
          {status === "loading" ? "Saving" : "Save"}
        </button>
        {error && (
          <p className="text-sm text-orange" aria-live="polite">
            {error}
          </p>
        )}
      </div>
    </form>
  );
}

