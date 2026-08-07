import { cn } from "@/lib/utils";

export function Badge({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "px-3 py-1 rounded-full text-label-sm font-bold inline-flex items-center gap-1.5",
        className,
      )}
    >
      {children}
    </span>
  );
}

