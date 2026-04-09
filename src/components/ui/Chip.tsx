import { cn } from "@/lib/utils";

export function Chip({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-none border border-black/10 bg-white px-3 py-1 text-xs font-body text-text",
        className
      )}
    >
      {children}
    </span>
  );
}

