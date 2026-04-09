"use client";

import { useEffect, useMemo, useRef } from "react";

export function TickerStrip({
  text = "HELVETIQA · MULTIDISCIPLINARY STUDIO · FAST. FEARLESS. CREATIVE.",
}: {
  text?: string;
}) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const items = useMemo(() => Array.from({ length: 12 }).map(() => text), [text]);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    let cancelled = false;

    async function run() {
      const { gsap } = await import("gsap");
      if (cancelled) return;

      const track = trackRef.current;
      if (!track) return;

      ctx = gsap.context(() => {
        const totalWidth = track.scrollWidth / 2;
        gsap.set(track, { x: 0 });
        gsap.to(track, {
          x: -totalWidth,
          duration: 18,
          ease: "none",
          repeat: -1,
        });
      });
    }

    run();
    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <section className="border-y border-black/10 bg-white">
      <div className="overflow-hidden">
        <div ref={trackRef} className="flex w-max">
          {items.concat(items).map((item, idx) => (
            <div
              key={idx}
              className="flex-none px-6 py-4 font-display text-xl tracking-wide text-text md:text-2xl"
              aria-hidden={idx >= items.length}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

