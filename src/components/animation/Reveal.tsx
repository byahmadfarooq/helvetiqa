"use client";

import { useEffect, useRef } from "react";

export function Reveal({
  children,
  stagger = false,
}: {
  children: React.ReactNode;
  stagger?: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    let cancelled = false;

    async function run() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);
      if (cancelled) return;

      const root = ref.current;
      if (!root) return;

      ctx = gsap.context(() => {
        const targets = stagger ? Array.from(root.children) : [root];
        gsap.set(targets, { opacity: 0, y: 30 });

        gsap.to(targets, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          stagger: stagger ? 0.12 : 0,
          scrollTrigger: {
            trigger: root,
            start: "top 85%",
          },
        });
      }, root);
    }

    run();
    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [stagger]);

  return <div ref={ref}>{children}</div>;
}

