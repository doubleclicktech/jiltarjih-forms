"use client";

import { useState } from "react";
import { Field, TextInput, Textarea, RadioCards } from "@/components/forms/form-ui";

const SUBJECTS = [
  "استفسار عام",
  "الانضمام إلى الأكاديمية",
  "شراكة أو تعاون",
  "الإعلام والصحافة",
  "مشكلة تقنية",
  "أخرى",
];

const INITIAL = {
  fullName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

type ContactFormData = typeof INITIAL;
type FieldKey = keyof ContactFormData;

export function ContactForm() {
  const [data, setData] = useState<ContactFormData>(INITIAL);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function set<K extends FieldKey>(key: K, value: ContactFormData[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  function validate() {
    const next: Record<string, string> = {};
    if (data.fullName.trim().length < 2) next.fullName = "الاسم الكامل مطلوب";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) next.email = "البريد الإلكتروني غير صالح";
    if (data.phone && !/^0[567]\d{8}$/.test(data.phone)) next.phone = "رقم الهاتف غير صالح (مثال: 0551234567)";
    if (!data.subject) next.subject = "يرجى اختيار موضوع الرسالة";
    if (data.message.trim().length < 10) next.message = "يرجى كتابة رسالة أكثر تفصيلاً (10 أحرف على الأقل)";
    return next;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      document.querySelector("[data-contact-errors]")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setLoading(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { ok?: boolean; message?: string };
      if (res.ok && json.ok) {
        setSubmitted(true);
      } else if (res.status === 429) {
        setSubmitError("لقد تجاوزت الحد المسموح من المحاولات. يرجى المحاولة لاحقاً.");
      } else {
        setSubmitError(json.message ?? "تعذر إرسال رسالتك حالياً. يرجى المحاولة لاحقاً.");
      }
    } catch {
      setSubmitError("تعذر إرسال رسالتك حالياً. يرجى المحاولة لاحقاً.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/15 text-primary">
          <span className="material-symbols-outlined text-5xl" style={{ fontVariationSettings: '"FILL" 1' }}>
            mark_email_read
          </span>
        </div>
        <h2 className="font-h2 text-h2 text-on-surface">تم إرسال رسالتك بنجاح</h2>
        <p className="mx-auto mt-3 max-w-xl text-on-surface-variant">
          شكراً لتواصلك مع منارة. وصلتنا رسالتك وسيتولى فريقنا الرد عليك في أقرب وقت ممكن.
        </p>
        <button
          type="button"
          onClick={() => {
            setData(INITIAL);
            setSubmitted(false);
          }}
          className="mt-6 inline-flex items-center gap-2 rounded-xl border border-primary/30 px-5 py-2.5 font-semibold text-primary transition hover:bg-primary/10"
        >
          <span className="material-symbols-outlined text-[18px]" aria-hidden>refresh</span>
          إرسال رسالة أخرى
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="space-y-5 rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 shadow-card md:p-8"
      dir="rtl"
      noValidate
    >
      {Object.keys(errors).length > 0 && (
        <div data-contact-errors className="rounded-xl border border-error/30 bg-error-container px-4 py-3 text-sm text-on-error-container">
          يرجى مراجعة الحقول المحددة قبل إرسال الرسالة.
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="الاسم الكامل" required error={errors.fullName}>
          <TextInput value={data.fullName} onChange={(v) => set("fullName", v)} placeholder="اكتب اسمك الكامل" required hasError={!!errors.fullName} />
        </Field>

        <Field label="البريد الإلكتروني" required error={errors.email}>
          <TextInput value={data.email} onChange={(v) => set("email", v)} placeholder="example@email.com" required type="email" hasError={!!errors.email} />
        </Field>

        <Field label="رقم الهاتف">
          <TextInput value={data.phone} onChange={(v) => set("phone", v)} placeholder="0551234567 (اختياري)" inputMode="tel" hasError={!!errors.phone} />
        </Field>
      </div>

      <Field label="موضوع الرسالة" required error={errors.subject}>
        <RadioCards
          legend="موضوع الرسالة"
          value={data.subject}
          onChange={(v) => set("subject", v)}
          hasError={!!errors.subject}
          options={SUBJECTS.map((s) => ({ value: s, label: s }))}
        />
      </Field>

      <Field label="نص الرسالة" required error={errors.message}>
        <Textarea value={data.message} onChange={(v) => set("message", v)} placeholder="اكتب رسالتك هنا بالتفصيل..." rows={6} hasError={!!errors.message} />
      </Field>

      {submitError && <p className="text-center text-sm font-semibold text-error">{submitError}</p>}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-secondary to-secondary-fixed-dim px-8 py-4 font-bold text-on-secondary shadow-lg transition hover:-translate-y-0.5 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 sm:w-auto"
      >
        <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }} aria-hidden>
          send
        </span>
        {loading ? "جاري الإرسال..." : "إرسال الرسالة"}
      </button>
    </form>
  );
}
