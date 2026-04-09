"use client";

import { services } from "@/lib/site";
import { Chip } from "@/components/ui/Chip";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useRef, useState } from "react";

function Arrow({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex h-7 w-7 items-center justify-center rounded-none border border-black/10 bg-white text-sm transition-transform duration-200 ease-out",
        open && "rotate-90"
      )}
    >
      →
    </span>
  );
}

export function ServiceRows({ variant = "preview" }: { variant?: "preview" | "full" }) {
  const [openSlug, setOpenSlug] = useState(services[0]?.slug ?? "linkedin");
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [heights, setHeights] = useState<Record<string, number>>({});

  const list = useMemo(() => services, []);

  useEffect(() => {
    const ro = new ResizeObserver(() => {
      const next: Record<string, number> = {};
      for (const s of list) {
        const el = contentRefs.current[s.slug];
        if (el) next[s.slug] = el.scrollHeight;
      }
      setHeights(next);
    });

    for (const s of list) {
      const el = contentRefs.current[s.slug];
      if (el) ro.observe(el);
    }

    return () => ro.disconnect();
  }, [list]);

  return (
    <div className="border-t border-black/10">
      {list.map((s) => {
        const open = openSlug === s.slug;
        const desc =
          variant === "preview"
            ? s.description
            : `${s.description} Deliverables are designed to fit your stage and speed.`;

        return (
          <div
            key={s.slug}
            className="border-b border-black/10"
            onMouseEnter={() => setOpenSlug(s.slug)}
          >
            <button
              type="button"
              className="flex w-full items-center justify-between gap-6 px-0 py-7 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
              aria-expanded={open}
              onClick={() => setOpenSlug(s.slug)}
            >
              <div className="flex items-center gap-6">
                <span className="w-10 font-display text-xl tracking-wide text-black/60">{s.number}</span>
                <span className="font-display text-3xl tracking-tight text-text md:text-4xl">{s.name}</span>
              </div>
              <Arrow open={open} />
            </button>

            <div
              className={cn(
                "overflow-hidden transition-[height] duration-500 ease-out",
                open ? "opacity-100" : "opacity-100"
              )}
              style={{ height: open ? (heights[s.slug] ?? 0) : 0 }}
            >
              <div
                ref={(el) => {
                  contentRefs.current[s.slug] = el;
                }}
                className="pb-8"
              >
                <p className="max-w-3xl text-sm leading-relaxed text-black/75 md:text-base">{desc}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {s.deliverables.map((d) => (
                    <Chip key={d}>{d}</Chip>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
