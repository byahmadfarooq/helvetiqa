"use client";

import Link, { type LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { startTransition, useCallback } from "react";

type Props = LinkProps & {
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  "aria-label"?: string;
};

export function TransitionLink({ children, className, onClick, ...props }: Props) {
  const router = useRouter();

  const handleClick = useCallback<React.MouseEventHandler<HTMLAnchorElement>>(
    async (event) => {
      onClick?.(event);
      if (event.defaultPrevented) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (typeof props.href !== "string") return;

      event.preventDefault();

      const page = document.getElementById("page");
      if (page) {
        const { gsap } = await import("gsap");
        await gsap.to(page, { opacity: 0, duration: 0.3, ease: "power1.out" });
      }

      startTransition(() => {
        router.push(props.href as string);
      });
    },
    [onClick, props.href, router]
  );

  return (
    <Link {...props} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}

