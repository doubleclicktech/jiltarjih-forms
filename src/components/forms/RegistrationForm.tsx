"use client";

import Link from "next/link";
import { useState } from "react";
import type { RegistrationType } from "@/types";
import { TeamRegistrationForm } from "./TeamRegistrationForm";
import { ProjectRegistrationForm } from "./ProjectRegistrationForm";

export function RegistrationForm() {
  const [chosen, setChosen] = useState<RegistrationType | null>(null);

  if (chosen === "team") return <TeamRegistrationForm onBack={() => setChosen(null)} />;
  if (chosen === "project") return <ProjectRegistrationForm onBack={() => setChosen(null)} />;

  return (
    <div className="text-right space-y-8" dir="rtl">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center flex-shrink-0">
          <span className="material-symbols-outlined text-white text-3xl" style={{ fontVariationSettings: '"FILL" 1' }}>
            edit_document
          </span>
        </div>
        <div>
          <p className="text-sm font-semibold text-secondary mb-1">ابدأ مسار فاعليتك</p>
          <h2 className="font-h2 text-h2 text-on-surface">انضم إلى منارة</h2>
          <p className="text-sm text-on-surface-variant mt-1">منصّة المشاريع والفرق في أكاديمية جيل الترجيح</p>
        </div>
      </div>

      <p className="text-on-surface-variant leading-relaxed">
        اختر المساحة الأقرب إلى قدراتك واهتماماتك؛ وانضم إلى فريق عملٍ يوظّف مهاراتك، أو إلى مشروعٍ ميداني تسهم من خلاله في الإنجاز وصناعة الأثر.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          type="button"
          onClick={() => setChosen("team")}
          className="group flex flex-col items-center gap-4 p-7 rounded-2xl border-2 border-outline-variant bg-surface-container hover:border-primary hover:bg-primary/5 active:scale-[0.98] transition-all text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/10 group-hover:bg-primary flex items-center justify-center transition-all">
            <span className="material-symbols-outlined text-3xl text-primary group-hover:text-white transition-all" style={{ fontVariationSettings: '"FILL" 1' }}>
              groups
            </span>
          </div>
          <div>
            <p className="font-semibold text-on-surface text-base">انضم إلى فريق عمل</p>
            <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
              وظّف معرفتك أو مهارتك أو موهبتك ضمن فريقٍ منظّم، وشارك في تطوير الأعمال والبرامج والمبادرات.
            </p>
          </div>
          <span className="flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
            ابدأ طلب الانضمام
            <span className="material-symbols-outlined text-base" aria-hidden>arrow_back</span>
          </span>
        </button>

        <button
          type="button"
          onClick={() => setChosen("project")}
          className="group flex flex-col items-center gap-4 p-7 rounded-2xl border-2 border-outline-variant bg-surface-container hover:border-primary hover:bg-primary/5 active:scale-[0.98] transition-all text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/10 group-hover:bg-primary flex items-center justify-center transition-all">
            <span className="material-symbols-outlined text-3xl text-primary group-hover:text-white transition-all" style={{ fontVariationSettings: '"FILL" 1' }}>
              rocket_launch
            </span>
          </div>
          <div>
            <p className="font-semibold text-on-surface text-base">انضم إلى مشروع</p>
            <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
              شارك في مشروعٍ ميداني، واكتسب خبرةً في العمل الجماعي والإنجاز، وأسهم في بناء مؤسسةٍ ذات أثرٍ نهضويّ.
            </p>
          </div>
          <span className="flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
            اطلب الانضمام
            <span className="material-symbols-outlined text-base" aria-hidden>arrow_back</span>
          </span>
        </button>

        <Link
          href="/companions"
          className="group flex flex-col items-center gap-4 p-7 rounded-2xl border-2 border-secondary/40 bg-secondary/10 hover:border-secondary hover:bg-secondary/15 active:scale-[0.98] transition-all text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-secondary/15 group-hover:bg-secondary flex items-center justify-center transition-all">
            <span className="material-symbols-outlined text-3xl text-secondary group-hover:text-on-secondary transition-all" style={{ fontVariationSettings: '"FILL" 1' }}>
              diversity_3
            </span>
          </div>
          <div>
            <p className="font-semibold text-on-surface text-base">استمارة المرافقين</p>
            <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
              لأفراد الدفعات السابقة الراغبين في مرافقة الفرق ودعم المنسقين ونقل الخبرات.
            </p>
          </div>
          <span className="flex items-center gap-1 text-secondary text-sm font-medium group-hover:gap-2 transition-all">
            افتح الاستمارة
            <span className="material-symbols-outlined text-base" aria-hidden>arrow_back</span>
          </span>
        </Link>
      </div>
    </div>
  );
}
