import Link from "next/link";
import type { Team } from "@/types";
import { cn } from "@/lib/utils";

export function TeamCard({ team }: { team: Team }) {
  const available = team.availability === "available";

  return (
    <div className="group bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col">
      <div className="p-6 flex flex-col flex-1 text-right">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-pale-orange flex items-center justify-center flex-shrink-0">
              <span
                className="material-symbols-outlined text-primary text-2xl"
                style={{ fontVariationSettings: '"FILL" 1' }}
              >
                {team.icon}
              </span>
            </div>
            <div>
              <h3 className="font-h3 text-lg text-on-surface mb-1">{team.name}</h3>
              <p className="text-label-sm text-on-surface-variant">{team.category}</p>
            </div>
          </div>
          <span
            className={cn(
              "px-3 py-1 rounded-lg font-label-sm text-label-sm flex-shrink-0",
              available
                ? "bg-pale-orange text-primary"
                : "bg-surface-variant text-on-surface-variant",
            )}
          >
            {available ? "متاح" : "مكتمل"}
          </span>
        </div>

        <p className="font-body-md text-body-md text-on-surface-variant mb-6 line-clamp-3 leading-relaxed">
          {team.description}
        </p>

        <div className="mt-auto flex items-center justify-end">
          <Link
            className="text-primary font-bold flex items-center gap-2 hover:underline group-hover:gap-3 transition-all"
            href={`/teams/${team.slug}`}
          >
            عرض التفاصيل
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
