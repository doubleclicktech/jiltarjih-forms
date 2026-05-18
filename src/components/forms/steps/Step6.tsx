"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { teams } from "@/data/teams";
import { TEAM_QUESTIONS } from "@/data/team-questions";
import type { StepProps } from "../form-types";
import { Label, TextInput, Textarea, RadioCards, CheckboxChips, SectionTitle } from "../form-ui";

export function Step6({ data, set }: StepProps) {
  const [activeTeam, setActiveTeam] = useState(data.selectedTeams[0] ?? "");
  const selectedTeamConfigs = teams.filter(t => data.selectedTeams.includes(t.id));

  const setTeamAnswer = useCallback((teamId: string, fieldId: string, value: string | string[]) => {
    set("teamAnswers", {
      ...data.teamAnswers,
      [teamId]: { ...(data.teamAnswers[teamId] ?? {}), [fieldId]: value },
    });
  }, [data.teamAnswers, set]);

  if (selectedTeamConfigs.length === 0) {
    return (
      <div className="text-center py-12 text-on-surface-variant">
        <span className="material-symbols-outlined text-4xl mb-3 block" aria-hidden>groups</span>
        <p>لم يتم اختيار أي فريق. يرجى العودة للخطوة السابقة.</p>
      </div>
    );
  }

  const team = selectedTeamConfigs.find(t => t.id === activeTeam) ?? selectedTeamConfigs[0];
  const questions = TEAM_QUESTIONS[team.id] ?? [];
  const answers = data.teamAnswers[team.id] ?? {};

  return (
    <div className="space-y-5">
      <SectionTitle icon="quiz" title="أسئلة تخصصية" sub="أسئلة مخصصة لكل فريق اخترته" />

      {selectedTeamConfigs.length > 1 && (
        <nav aria-label="تبديل بين فرق الأسئلة" className="flex gap-2 overflow-x-auto pb-1">
          {selectedTeamConfigs.map(t => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTeam(t.id)}
              aria-current={activeTeam === t.id ? "true" : undefined}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl border text-sm whitespace-nowrap transition-all flex-shrink-0",
                activeTeam === t.id
                  ? "border-primary bg-primary/10 text-primary font-semibold"
                  : "border-outline-variant text-on-surface hover:border-primary/40"
              )}
            >
              <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: '"FILL" 1' }} aria-hidden>{t.icon}</span>
              {t.name}
            </button>
          ))}
        </nav>
      )}

      <div className="bg-surface-container border border-primary/20 rounded-2xl p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
          <span className="material-symbols-outlined text-white text-lg" style={{ fontVariationSettings: '"FILL" 1' }} aria-hidden>{team.icon}</span>
        </div>
        <div>
          <p className="font-semibold text-primary text-right">{team.name}</p>
          <p className="text-xs text-on-surface-variant text-right">{team.description}</p>
        </div>
      </div>

      <div className="space-y-4">
        {questions.map((q, idx) => {
          const val = answers[q.id] ?? (q.type === "checkbox" ? [] : "");
          return (
            <div key={q.id} className="space-y-1.5">
              <Label>
                <span className="text-primary/60 text-xs ml-1" aria-hidden>{idx + 1}.</span>
                {q.label}
              </Label>
              {q.type === "textarea" && (
                <Textarea value={val as string} onChange={v => setTeamAnswer(team.id, q.id, v)} placeholder="اكتب إجابتك هنا..." />
              )}
              {q.type === "text" && (
                <TextInput value={val as string} onChange={v => setTeamAnswer(team.id, q.id, v)} placeholder="اكتب إجابتك..." />
              )}
              {q.type === "radio" && q.options && (
                <RadioCards
                  value={val as string}
                  onChange={v => setTeamAnswer(team.id, q.id, v)}
                  legend={q.label}
                  options={q.options.map(o => ({ value: o, label: o }))}
                />
              )}
              {q.type === "checkbox" && q.options && (
                <CheckboxChips
                  options={q.options}
                  value={val as string[]}
                  onChange={v => setTeamAnswer(team.id, q.id, v)}
                />
              )}
            </div>
          );
        })}
      </div>

      {selectedTeamConfigs.length > 1 && (
        <div className="flex justify-between items-center pt-2">
          {(() => {
            const idx  = selectedTeamConfigs.findIndex(t => t.id === activeTeam);
            const prev = selectedTeamConfigs[idx - 1];
            const next = selectedTeamConfigs[idx + 1];
            return (
              <>
                {next ? (
                  <button type="button" onClick={() => setActiveTeam(next.id)}
                    className="flex items-center gap-2 text-sm text-primary font-medium hover:underline">
                    <span className="material-symbols-outlined text-base" aria-hidden>arrow_back</span>
                    {next.name}
                  </button>
                ) : <div />}
                {prev ? (
                  <button type="button" onClick={() => setActiveTeam(prev.id)}
                    className="flex items-center gap-2 text-sm text-primary font-medium hover:underline">
                    {prev.name}
                    <span className="material-symbols-outlined text-base" aria-hidden>arrow_forward</span>
                  </button>
                ) : <div />}
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
}
