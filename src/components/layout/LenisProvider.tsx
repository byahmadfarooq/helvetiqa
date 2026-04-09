"use client";

import Lenis from "lenis";
import { useEffect, useRef } from "react";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const tickerRef = useRef<((time: number) => void) | null>(null);

  useEffect(() => {
    let mounted = true;

    async function setup() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.1,
        smoothWheel: true,
        wheelMultiplier: 1,
      });

      lenis.on("scroll", () => {
        ScrollTrigger.update();
      });

      gsap.ticker.lagSmoothing(0);
      const onTick = (time: number) => {
        lenis.raf(time * 1000);
      };
      tickerRef.current = onTick;
      gsap.ticker.add(onTick);

      if (mounted) lenisRef.current = lenis;
    }

    setup();

    return () => {
      mounted = false;
      import("gsap").then(({ gsap }) => {
        if (tickerRef.current) gsap.ticker.remove(tickerRef.current);
        tickerRef.current = null;
      });
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
