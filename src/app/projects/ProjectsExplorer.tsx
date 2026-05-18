"use client";

import { useMemo, useState } from "react";
import type { Project, ProjectStatus } from "@/types";
import { SearchInput } from "@/components/ui/SearchInput";
import { FilterChips } from "@/components/ui/FilterChips";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { EmptyState } from "@/components/ui/EmptyState";

type FilterId = "all" | ProjectStatus;

export function ProjectsExplorer({ items }: { items: Project[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterId>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((p) => {
      const matchesFilter = filter === "all" ? true : p.status === filter;
      const blob = `${p.title} ${p.category} ${p.description}`.toLowerCase();
      const matchesQuery = q ? blob.includes(q) : true;
      return matchesFilter && matchesQuery;
    });
  }, [items, query, filter]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        <div className="lg:col-span-2">
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="ابحث عن مشروع..."
          />
        </div>
        <div className="lg:col-span-1 text-right">
          <p className="font-body-md text-body-md text-on-surface-variant ">
            تصفية حسب:
          </p>
          <FilterChips
            options={[
              { id: "all", label: "الكل" },
              { id: "open", label: "مفتوح للتسجيل" },
              { id: "active", label: "قيد التنفيذ" },
              { id: "completed", label: "مكتمل" },
            ]}
            activeId={filter}
            onChange={(id) => setFilter(id as FilterId)}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState message="لا توجد نتائج مطابقة حالياً." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      )}
    </div>
  );
}

