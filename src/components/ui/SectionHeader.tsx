import { cn } from "@/lib/utils";

export function SectionHeader({
  title,
  description,
  className,
}: {
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("text-right mb-10", className)}>
      <h2 className="font-h2 text-h2 text-on-surface mb-3">{title}</h2>
      {description ? (
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl">
          {description}
        </p>
      ) : null}
    </div>
  );
}

