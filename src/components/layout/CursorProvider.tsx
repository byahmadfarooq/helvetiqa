"use client";

import { cn } from "@/lib/utils";
import { useEffect, useMemo, useRef, useState } from "react";

type CursorMode = "default" | "hover";

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const [mode, setMode] = useState<CursorMode>("default");
  const [isDark, setIsDark] = useState(false);

  const colors = useMemo(() => {
    return {
      dotDefault: "#E8341A",
      ringDefault: "#0A0A0A",
      dotDark: "#FFFFFF",
      ringDark: "#FFFFFF",
      hoverFillLight: "rgba(200,241,53,0.20)",
      hoverFillDark: "rgba(255,255,255,0.20)",
    };
  }, []);

  useEffect(() => {
    function onMove(event: MouseEvent) {
      mouse.current.x = event.clientX;
      mouse.current.y = event.clientY;
    }

    function computeDark(target: EventTarget | null) {
      const el = target instanceof Element ? target : null;
      const inDark = Boolean(el?.closest?.('[data-theme="dark"]'));
      setIsDark(inDark);
    }

    function onPointerOver(event: PointerEvent) {
      const target = event.target instanceof Element ? event.target : null;
      computeDark(target);
      const interactive = Boolean(target?.closest?.("a,button,[data-cursor-hover]"));
      if (interactive) setMode("hover");
    }

    function onPointerOut(event: PointerEvent) {
      const target = event.relatedTarget instanceof Element ? event.relatedTarget : null;
      computeDark(target);
      const interactive = Boolean(target?.closest?.("a,button,[data-cursor-hover]"));
      setMode(interactive ? "hover" : "default");
    }

    function tick() {
      const dot = dotRef.current;
      const ringEl = ringRef.current;
      if (!dot || !ringEl) return;

      const targetX = mouse.current.x;
      const targetY = mouse.current.y;
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate3d(-50%, -50%, 0) scale(${
        mode === "hover" ? 0 : 1
      })`;

      const lag = 0.18;
      ring.current.x += (targetX - ring.current.x) * lag;
      ring.current.y += (targetY - ring.current.y) * lag;

      const scale = mode === "hover" ? 60 / 36 : 1;
      ringEl.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate3d(-50%, -50%, 0) scale(${scale})`;

      rafRef.current = window.requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("pointerover", onPointerOver, { passive: true });
    window.addEventListener("pointerout", onPointerOut, { passive: true });

    rafRef.current = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("pointerover", onPointerOver);
      window.removeEventListener("pointerout", onPointerOut);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, [mode]);

  useEffect(() => {
    const dot = dotRef.current;
    const ringEl = ringRef.current;
    if (!dot || !ringEl) return;

    const dotColor = isDark ? colors.dotDark : colors.dotDefault;
    const ringColor = isDark ? colors.ringDark : colors.ringDefault;
    dot.style.backgroundColor = dotColor;
    ringEl.style.borderColor = ringColor;

    if (mode === "hover") {
      ringEl.style.backgroundColor = isDark ? colors.hoverFillDark : colors.hoverFillLight;
    } else {
      ringEl.style.backgroundColor = "transparent";
    }
  }, [colors, isDark, mode]);

  return (
    <>
      <div className="cursor-ui pointer-events-none fixed left-0 top-0 z-[9998] hidden md:block">
        <div
          ref={ringRef}
          className={cn(
            "fixed left-0 top-0 h-9 w-9 rounded-full border-[1.5px] transition-colors duration-150"
          )}
          aria-hidden="true"
        />
        <div
          ref={dotRef}
          className="fixed left-0 top-0 h-2 w-2 rounded-full transition-colors duration-150"
          aria-hidden="true"
        />
      </div>
      {children}
    </>
  );
}
