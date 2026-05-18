"use client";

import { useMemo, useState } from "react";
import type { Team, TeamAvailability } from "@/types";
import { SearchInput } from "@/components/ui/SearchInput";
import { EmptyState } from "@/components/ui/EmptyState";
import { TeamCard } from "@/components/cards/TeamCard";
import { cn } from "@/lib/utils";

type AvailabilityFilter = "all" | TeamAvailability;

export function TeamsExplorer({
  items,
  categoryOptions,
}: {
  items: Team[];
  categoryOptions: Array<{ id: string; label: string }>;
}) {
  const [query, setQuery]             = useState("");
  const [category, setCategory]       = useState("all");
  const [availability, setAvailability] = useState<AvailabilityFilter>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((t) => {
      const matchesCategory   = category === "all" ? true : t.category === category;
      const matchesAvailability = availability === "all" ? true : t.availability === availability;
      const blob = `${t.name} ${t.category} ${t.description}`.toLowerCase();
      const matchesQuery = q ? blob.includes(q) : true;
      return matchesCategory && matchesAvailability && matchesQuery;
    });
  }, [items, query, category, availability]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-1">
            <label className="font-body-md text-body-md text-on-surface-variant mb-2 block">البحث</label>

          <SearchInput value={query} onChange={setQuery} placeholder="ابحث عن فريق..." />
        </div>

        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-right">
            <label className="font-body-md text-body-md text-on-surface-variant mb-2 block">التصنيف</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="appearance-none bg-white text-primary border border-outline-variant rounded-lg px-4 py-3 text-right font-body-md focus:ring-2 focus:ring-primary focus:border-primary outline-none w-full"
            >
              <option value="all">جميع التصنيفات</option>
              {categoryOptions.map((c) => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </div>

          <div className="text-right">
            <label className="font-body-md text-body-md text-on-surface-variant mb-2 block">حالة التوفر</label>
            <select
              value={availability}
              onChange={(e) => setAvailability(e.target.value as AvailabilityFilter)}
              className={cn(
                "appearance-none bg-white border text-primary border-outline-variant rounded-lg px-4 py-3 text-right font-body-md focus:ring-2 focus:ring-primary focus:border-primary outline-none w-full",
              )}
            >
              <option value="all">جميع الحالات</option>
              <option value="available">متاح للانضمام</option>
              <option value="full">مكتمل العدد</option>
            </select>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState message="لا توجد نتائج مطابقة حالياً." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((t) => (
            <TeamCard key={t.id} team={t} />
          ))}
        </div>
      )}
    </div>
  );
}
