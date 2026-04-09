"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function animateIn() {
      const { gsap } = await import("gsap");
      if (cancelled) return;
      gsap.fromTo(
        rootRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power1.out" }
      );
    }

    animateIn();
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return (
    <div ref={rootRef} id="page" className="min-h-dvh">
      {children}
    </div>
  );
}

