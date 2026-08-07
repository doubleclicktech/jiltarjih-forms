import type { Project } from "@/types";
import { cn } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { getTrackNameForProject } from "@/data/tracks";
import { CardCTA } from "./CardCTA";

export function ProjectCard({ project }: { project: Project }) {
  const trackName = getTrackNameForProject(project.slug) ?? project.category;

  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border bg-surface-container-lowest",
        "transition-all duration-300 hover:-translate-y-1.5",
        "border-outline-variant/70 shadow-card hover:border-primary/40 hover:shadow-[0_20px_36px_-18px_rgba(79,204,182,0.4)]",
      )}
    >
      {/* decorative glow */}
      <div
        className="pointer-events-none absolute -top-12 -left-12 h-36 w-36 rounded-full bg-primary/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden
      />
      {/* top accent line */}
      <div
        className="h-[3px] w-full bg-gradient-to-l from-primary via-secondary to-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden
      />

      <div className="relative flex flex-1 flex-col p-6 text-right">
        <div className="mb-5 flex items-start justify-between gap-3">
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 ring-1 ring-primary/10 transition-transform duration-300 group-hover:scale-105 group-hover:ring-primary/30">
            <span
              className="material-symbols-outlined text-2xl text-primary"
              style={{ fontVariationSettings: '"FILL" 1' }}
            >
              {project.icon}
            </span>
          </div>

          <StatusBadge status={project.status} />
        </div>

        <span className="mb-3 inline-flex w-fit items-center gap-1 rounded-full bg-surface-container px-2.5 py-1 text-[11px] font-semibold text-on-surface-variant">
          <span className="material-symbols-outlined text-[14px] text-primary" aria-hidden>
            alt_route
          </span>
          {trackName}
        </span>

        <h3 className="font-h3 text-lg text-on-surface mb-2">{project.title}</h3>

        <p className="font-body-md text-body-md text-on-surface-variant mb-6 line-clamp-3 flex-1 leading-relaxed">
          {project.description}
        </p>

        <div className="mt-auto flex items-center justify-end border-t border-outline-variant/60 pt-4">
          <CardCTA href={`/projects/${project.slug}`} label="تفاصيل المشروع" />
        </div>
      </div>
    </div>
  );
}
