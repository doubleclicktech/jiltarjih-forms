import { cn } from "@/lib/utils";
import { teams } from "@/data/teams";
import type { StepProps } from "../form-types";
import { SectionTitle } from "../form-ui";

export function Step5({ data, set, errors }: StepProps) {
  const toggle = (id: string) => {
    const cur = data.selectedTeams;
    set("selectedTeams", cur.includes(id) ? cur.filter(x => x !== id) : [...cur, id]);
  };

  return (
    <div className="space-y-5">
      <SectionTitle icon="groups" title="اختيار الفريق" sub="اختر فريقاً واحداً أو أكثر حسب اهتماماتك ومهاراتك" />

      {data.selectedTeams.length > 0 && (
        <div className="bg-primary/10 border border-primary/30 rounded-xl px-4 py-3 flex items-center gap-2 text-sm text-primary" role="status">
          <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: '"FILL" 1' }}>check_circle</span>
          تم اختيار {data.selectedTeams.length} {data.selectedTeams.length === 1 ? "فريق" : "فرق"}
        </div>
      )}

      {errors.selectedTeams && (
        <p className="flex items-center gap-1.5 text-xs text-error font-medium" role="alert">
          <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>error</span>
          {errors.selectedTeams}
        </p>
      )}

      <fieldset>
        <legend className="sr-only">اختر الفرق</legend>
        <div className={cn(
          "grid grid-cols-1 sm:grid-cols-2 gap-3 rounded-xl transition-all",
          errors.selectedTeams && "p-2 ring-1 ring-error bg-error/5"
        )}>
          {teams.map(team => {
            const selected = data.selectedTeams.includes(team.id);
            return (
              <label
                key={team.id}
                className={cn(
                  "flex items-start gap-4 p-4 rounded-2xl border-2 text-right transition-all cursor-pointer select-none w-full",
                  selected
                    ? "border-primary bg-primary/10"
                    : "border-outline-variant bg-surface-container hover:border-primary/50 hover:bg-primary/5"
                )}
              >
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={() => toggle(team.id)}
                  className="sr-only"
                  aria-label={team.name}
                />
                <div className={cn(
                  "w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all",
                  selected ? "bg-primary" : "bg-surface-container"
                )}>
                  <span
                    className={cn("material-symbols-outlined text-xl", selected ? "text-white" : "text-on-surface-variant")}
                    style={{ fontVariationSettings: '"FILL" 1' }}
                    aria-hidden
                  >
                    {team.icon}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={cn("font-semibold text-sm leading-snug", selected ? "text-primary" : "text-on-surface")}>{team.name}</p>
                    <div
                      className={cn(
                        "w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all",
                        selected ? "border-primary bg-primary" : "border-outline-variant"
                      )}
                      aria-hidden
                    >
                      {selected && (
                        <span className="material-symbols-outlined text-white text-xs" style={{ fontVariationSettings: '"FILL" 1, "wght" 700' }}>check</span>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">{team.description}</p>
                </div>
              </label>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}
