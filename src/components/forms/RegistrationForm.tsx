"use client";

import { useState, useCallback } from "react";
import type { FullRegistrationFormData } from "@/types";
import { INITIAL } from "./form-types";
import type { FormErrors } from "./form-types";
import { getStepSchema } from "./step-schemas";
import { StepProgress } from "./form-ui";
import { StepPreamble } from "./steps/StepPreamble";
import { Step1 } from "./steps/Step1";
import { Step2 } from "./steps/Step2";
import { Step3 } from "./steps/Step3";
import { Step4 } from "./steps/Step4";
import { Step5 } from "./steps/Step5";
import { Step6 } from "./steps/Step6";
import { Step7 } from "./steps/Step7";

export function RegistrationForm() {
  const [step, setStep]               = useState(0);
  const [data, setData]               = useState<FullRegistrationFormData>(INITIAL);
  const [errors, setErrors]           = useState<FormErrors>({});
  const [loading, setLoading]         = useState(false);
  const [submitted, setSubmitted]     = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const set = useCallback(<K extends keyof FullRegistrationFormData>(
    key: K,
    value: FullRegistrationFormData[K],
  ) => {
    setData(prev => ({ ...prev, [key]: value }));
    setErrors(prev => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  function runValidation(s: number): FormErrors {
    const schema = getStepSchema(s);
    if (!schema) return {};
    const result = schema.safeParse(data);
    if (result.success || !result.error) return {};
    const errs: FormErrors = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0] as keyof FullRegistrationFormData;
      if (!errs[field]) errs[field] = issue.message;
    }
    return errs;
  }

  function goNext() {
    const errs = runValidation(step);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setTimeout(() => {
        document.querySelector("[role=alert]")?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 50);
      return;
    }
    setErrors({});
    setSubmitError(null);
    setStep(s => (s === 0 ? 1 : Math.min(7, s + 1)));
  }

  function goPrev() {
    setErrors({});
    setSubmitError(null);
    setStep(s => Math.max(0, s - 1));
  }

  async function submit() {
    const errs = runValidation(7);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setTimeout(() => {
        document.querySelector("[role=alert]")?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 50);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      const res  = await fetch("/api/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { ok: boolean };
      if (res.ok && json.ok) {
        setSubmitted(true);
      } else {
        setSubmitError("تعذر إرسال الاستمارة حالياً. يرجى المحاولة لاحقاً.");
      }
    } catch {
      setSubmitError("تعذر إرسال الاستمارة حالياً. يرجى المحاولة لاحقاً.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-12 space-y-4">
        <div className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center mx-auto">
          <span className="material-symbols-outlined text-5xl text-primary" style={{ fontVariationSettings: '"FILL" 1' }}>check_circle</span>
        </div>
        <h3 className="font-h3 text-lg text-on-surface">تم إرسال استمارتك بنجاح!</h3>
        <p className="text-on-surface-variant max-w-sm mx-auto">
          سيتم مراجعة استمارتك والتواصل معك قريباً. شكراً لاهتمامك بالانضمام إلى فرق أكاديمية جيل الترجيح.
        </p>
        <p className="text-primary font-semibold">معاً نحو صناعة جيل قيادي ✨</p>
      </div>
    );
  }

  const stepProps = { data, set, errors };
  const isLastStep = step === 7;
  const errorCount = Object.keys(errors).length;

  return (
    <form
      onSubmit={e => { e.preventDefault(); if (isLastStep) void submit(); }}
      className="space-y-6"
      noValidate
      dir="rtl"
    >
      {step > 0 && <StepProgress current={step} />}

      {errorCount > 0 && (
        <div
          className="flex items-start gap-3 bg-error-container text-on-error-container rounded-xl px-4 py-3 text-sm text-right border border-error/30"
          role="alert"
          aria-live="polite"
        >
          <span className="material-symbols-outlined text-lg flex-shrink-0 mt-0.5" style={{ fontVariationSettings: '"FILL" 1' }}>error</span>
          <div>
            <p className="font-semibold">
              {errorCount === 1 ? "يوجد حقل واحد يحتاج تصحيحاً" : `يوجد ${errorCount} حقول تحتاج تصحيحاً`}
            </p>
            <p className="text-xs mt-0.5 opacity-80">يرجى مراجعة الحقول المحددة بالأحمر أدناه</p>
          </div>
        </div>
      )}

      <div>
        {step === 0 && <StepPreamble onStart={goNext} />}
        {step === 1 && <Step1 {...stepProps} />}
        {step === 2 && <Step2 {...stepProps} />}
        {step === 3 && <Step3 {...stepProps} />}
        {step === 4 && <Step4 {...stepProps} />}
        {step === 5 && <Step5 {...stepProps} />}
        {step === 6 && <Step6 {...stepProps} />}
        {step === 7 && <Step7 {...stepProps} />}
      </div>

      {step > 0 && (
        <div className="flex gap-3 pt-2">
          {!isLastStep ? (
            <button
              type="button"
              onClick={goNext}
              className="flex-1 bg-primary text-on-primary font-semibold py-3.5 rounded-2xl hover:opacity-90 active:scale-[0.98] transition-all"
            >
              التالي
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-secondary text-on-secondary font-semibold py-3.5 rounded-2xl hover:bg-secondary-container active:scale-[0.98] transition-all disabled:opacity-60"
            >
              {loading ? "جاري الإرسال..." : "إرسال الاستمارة"}
            </button>
          )}
          <button
            type="button"
            onClick={goPrev}
            className="px-6 py-3.5 rounded-2xl border border-outline-variant text-on-surface-variant hover:bg-surface-container transition-all"
          >
            السابق
          </button>
        </div>
      )}

      {submitError && (
        <p className="text-center text-sm text-error font-medium" role="alert">{submitError}</p>
      )}
    </form>
  );
}
