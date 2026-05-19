"use client";

import { useState } from "react";
import type { RegistrationType } from "@/types";
import { TeamRegistrationForm } from "./TeamRegistrationForm";
import { ProjectRegistrationForm } from "./ProjectRegistrationForm";

export function RegistrationForm() {
  const [chosen, setChosen] = useState<RegistrationType | null>(null);

  if (chosen === "team")    return <TeamRegistrationForm    onBack={() => setChosen(null)} />;
  if (chosen === "project") return <ProjectRegistrationForm onBack={() => setChosen(null)} />;

  return (
    <div className="text-right space-y-8" dir="rtl">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center flex-shrink-0">
          <span className="material-symbols-outlined text-white text-3xl" style={{ fontVariationSettings: '"FILL" 1' }}>edit_document</span>
        </div>
        <div>
          <h2 className="font-h2 text-h2 text-on-surface">استمارة الانضمام</h2>
          <p className="text-sm text-on-surface-variant mt-1">أكاديمية جيل الترجيح</p>
        </div>
      </div>

      <p className="text-on-surface-variant leading-relaxed">
        اختر نوع الانضمام الذي تريده. يمكنك الانضمام إلى فريق تخصصي أو الانخراط في أحد مشاريع الأكاديمية.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => setChosen("team")}
          className="group flex flex-col items-center gap-4 p-7 rounded-2xl border-2 border-outline-variant bg-surface-container hover:border-primary hover:bg-primary/5 active:scale-[0.98] transition-all text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/10 group-hover:bg-primary flex items-center justify-center transition-all">
            <span
              className="material-symbols-outlined text-3xl text-primary group-hover:text-white transition-all"
              style={{ fontVariationSettings: '"FILL" 1' }}
              aria-hidden
            >
              groups
            </span>
          </div>
          <div>
            <p className="font-semibold text-on-surface text-base">انضم لفريق</p>
            <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
              انخرط في إحدى الفرق التخصصية وساهم في بناء الأكاديمية من الداخل
            </p>
          </div>
          <span className="flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
            ابدأ الاستمارة
            <span className="material-symbols-outlined text-base" aria-hidden>arrow_back</span>
          </span>
        </button>

        <button
          type="button"
          onClick={() => setChosen("project")}
          className="group flex flex-col items-center gap-4 p-7 rounded-2xl border-2 border-outline-variant bg-surface-container hover:border-primary hover:bg-primary/5 active:scale-[0.98] transition-all text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/10 group-hover:bg-primary flex items-center justify-center transition-all">
            <span
              className="material-symbols-outlined text-3xl text-primary group-hover:text-white transition-all"
              style={{ fontVariationSettings: '"FILL" 1' }}
              aria-hidden
            >
              rocket_launch
            </span>
          </div>
          <div>
            <p className="font-semibold text-on-surface text-base">انضم لمشروع</p>
            <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
              شارك في أحد المشاريع الميدانية وساهم في صناعة أثر حقيقي في المجتمع
            </p>
          </div>
          <span className="flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
            ابدأ الاستمارة
            <span className="material-symbols-outlined text-base" aria-hidden>arrow_back</span>
          </span>
        </button>
      </div>
    </div>
  );
}
