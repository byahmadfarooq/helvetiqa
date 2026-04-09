import { cn } from "@/lib/utils";
import { TransitionLink } from "@/components/ui/TransitionLink";

type Variant = "primary" | "ghost" | "dark";

const base =
  "inline-flex items-center justify-center rounded-none px-6 py-4 font-display text-lg tracking-wide transition-transform duration-200 ease-out hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4";

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  "aria-label": ariaLabel,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  "aria-label"?: string;
}) {
  const styles =
    variant === "primary"
      ? "bg-lime text-text focus-visible:outline-orange"
      : variant === "dark"
        ? "bg-text text-white focus-visible:outline-lime"
        : "border border-black/15 bg-transparent text-text focus-visible:outline-orange";

  return (
    <TransitionLink href={href} aria-label={ariaLabel} className={cn(base, styles, className)}>
      {children}
    </TransitionLink>
  );
}

