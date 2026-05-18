"use client";

import { cn } from "@/lib/utils";

export type ChipOption = { id: string; label: string };

export function FilterChips({
  options,
  activeId,
  onChange,
  className,
}: {
  options: ChipOption[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap gap-3 justify-start", className)}>
      {options.map((opt) => {
        const active = opt.id === activeId;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={cn(
              "px-6 py-2 rounded-full font-bold text-label-sm transition-colors",
              active
                ? "bg-secondary-fixed text-on-secondary-fixed-variant hover:bg-secondary-container"
                : "bg-surface-container-high text-on-surface-variant hover:bg-primary-fixed-dim hover:text-primary",
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

