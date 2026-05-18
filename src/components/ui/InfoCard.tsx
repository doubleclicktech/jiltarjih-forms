import { cn } from "@/lib/utils";

export function InfoCard({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-6",
        className,
      )}
    >
      <h3 className="font-h3 text-lg text-on-surface mb-4">{title}</h3>
      {children}
    </div>
  );
}

