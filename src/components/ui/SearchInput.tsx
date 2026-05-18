"use client";

import { cn } from "@/lib/utils";

export function SearchInput({
  value,
  onChange,
  placeholder,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
}) {
  return (
    <div className={cn("relative w-full", className)}>
      <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-primary">
        search
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-surface-container-low border border-outline-variant rounded-lg pr-12 pl-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-body-md text-right"
      />
    </div>
  );
}

