"use client";

import type { Post, PostCategory } from "@/lib/posts";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";

const categories: Array<"All" | PostCategory> = [
  "All",
  "Growth Frameworks",
  "Content Systems",
  "Philosophy",
  "Brand Strategy",
  "Productivity Systems",
];

function formatDate(iso: string) {
  const date = new Date(`${iso}T00:00:00Z`);
  return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

export function BlogIndex({ posts }: { posts: Post[] }) {
  const [active, setActive] = useState<(typeof categories)[number]>("All");

  const filtered = useMemo(() => {
    if (active === "All") return posts;
    return posts.filter((p) => p.category === active);
  }, [active, posts]);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => {
          const selected = active === c;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setActive(c)}
              className={cn(
                "rounded-none border px-4 py-2 font-display text-sm tracking-wide transition-transform duration-200 ease-out hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange",
                selected ? "border-text bg-text text-white" : "border-black/15 bg-white text-text"
              )}
            >
              {c}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-12 rounded-none border border-black/10 bg-white p-8">
          <p className="font-display text-2xl leading-none tracking-tight">No posts in this category.</p>
          <p className="mt-3 text-sm leading-relaxed text-black/75">
            Pick another filter. Or check back soon.
          </p>
        </div>
      ) : (
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {filtered.map((p) => (
            <TransitionLink
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="block rounded-none border border-black/10 bg-white p-6 transition-transform duration-200 ease-out hover:scale-[1.01] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
            >
              <p className="font-display text-sm tracking-wide text-black/60">{p.category}</p>
              <p className="mt-3 font-display text-3xl leading-none tracking-tight text-text">{p.title}</p>
              <p className="mt-4 text-sm leading-relaxed text-black/75">{p.excerpt}</p>
              <p className="mt-6 font-display text-sm tracking-wide text-black/60">
                {formatDate(p.date)} · {p.readTime} min read
              </p>
            </TransitionLink>
          ))}
        </div>
      )}
    </div>
  );
}

