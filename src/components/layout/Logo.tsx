import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("font-display text-3xl leading-none tracking-tight", className)}>
      h<span className="text-orange">.</span>
    </span>
  );
}

