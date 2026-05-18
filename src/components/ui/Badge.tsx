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
        "px-3 py-1 rounded-md text-label-sm font-bold inline-flex items-center",
        className,
      )}
    >
      {children}
    </span>
  );
}

