"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

const WILAYAS = [
  "أدرار", "الشلف", "الأغواط", "أم البواقي", "باتنة", "بجاية", "بسكرة", "بشار", "البليدة", "البويرة",
  "تمنراست", "تبسة", "تلمسان", "تيارت", "تيزي وزو", "الجزائر", "الجلفة", "جيجل", "سطيف", "سعيدة",
  "سكيكدة", "سيدي بلعباس", "عنابة", "قالمة", "قسنطينة", "المدية", "مستغانم", "المسيلة", "معسكر", "ورقلة",
  "وهران", "البيض", "إليزي", "برج بوعريريج", "بومرداس", "الطارف", "تندوف", "تيسمسيلت", "الوادي", "خنشلة",
  "سوق أهراس", "تيبازة", "ميلة", "عين الدفلى", "النعامة", "عين تموشنت", "غرداية", "غليزان", "تيميمون",
  "برج باجي مختار", "أولاد جلال", "بني عباس", "عين صالح", "عين قزام", "تقرت", "جانت", "المغير", "المنيعة",
];

const ACADEMY_EXPERIENCES = [
  "قدت فريقاً",
  "نسقت مشروعاً",
  "أشرفت على أفراد",
  "قدمت تكوينات أو ورشات",
  "أدرت أنشطة أو فعاليات",
];

const SKILLS = [
  ["followUpGuidance", "المتابعة والتوجيه"],
  ["individualCommunication", "التواصل مع الأفراد"],
  ["problemSolving", "حل المشكلات"],
  ["teamManagement", "إدارة الفرق"],
  ["motivationSupport", "التحفيز والدعم"],
  ["conflictManagement", "إدارة الخلافات"],
  ["planningOrganization", "التخطيط والتنظيم"],
  ["trainingKnowledgeTransfer", "التكوين ونقل المعرفة"],
] as const;

const SKILL_LEVELS = [
  ["weak", "ضعيف"],
  ["medium", "متوسط"],
  ["good", "جيد"],
  ["excellent", "ممتاز"],
] as const;

const TEAMS = [
  "فريق بادر لإدارة الحملات",
  "فريق مقاوم لدعم القضية الفلسطينية",
  "فريق دوبل كليك التقني",
  "فريق سفاري للرحلات والخرجات السياحية",
  "فريق الفنون",
  "فريق المناظرات",
  "رابطة ضفاف الأدبية",
  "فريق التكوين السياسي",
];

const INITIAL = {
  fullName: "",
  age: "",
  educationLevel: "",
  specialty: "",
  job: "",
  wilaya: "",
  batch: "",
  phone: "",
  email: "",
  telegramLink: "",
  linkedinLink: "",
  academyJoinDate: "",
  previousResponsibilities: "",
  academyExperiences: [] as string[],
  leadershipExperience: "",
  acquiredSkills: "",
  motivation: "",
  addedValue: "",
  companionRoleView: "",
  volunteeringDrive: "",
  skills: Object.fromEntries(SKILLS.map(([key]) => [key, ""])) as Record<string, string>,
  lowCommitmentHandling: "",
  weakTeamInteraction: "",
  teamConflictHandling: "",
  guidanceBalance: "",
  rejectedAdviceHandling: "",
  selectedTeams: [] as string[],
  selectedTeamsReason: "",
  qualificationSkills: "",
  teamDevelopmentContribution: "",
  expectedChallenges: "",
  weeklyHours: "",
  meetingMode: "",
  periodicFollowUp: "",
  teamEnvironmentVision: "",
  projectIdea: "",
  newLeadersRole: "",
  suitabilityReason: "",
  coreValue: "",
  additionalNotes: "",
};

type CompanionFormData = typeof INITIAL;
type FieldKey = keyof CompanionFormData;

function Field({
  label,
  required,
  children,
  error,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <label className="block text-right">
      <span className="mb-2 block text-sm font-semibold text-on-surface-variant">
        {label}
        {required && <span className="mr-1 text-error">*</span>}
      </span>
      {children}
      {error && <span className="mt-1.5 block text-xs font-medium text-error">{error}</span>}
    </label>
  );
}

function Section({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 md:p-7 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-on-primary font-bold">{number}</span>
        <h2 className="font-h3 text-lg text-on-surface">{title}</h2>
      </div>
      {children}
    </section>
  );
}

const inputClass =
  "w-full rounded-xl border border-outline bg-surface-container-high px-4 py-3 text-right text-on-surface outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/25";

export function CompanionsForm() {
  const [data, setData] = useState<CompanionFormData>(INITIAL);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const completedSkills = useMemo(
    () => SKILLS.filter(([key]) => Boolean(data.skills[key])).length,
    [data.skills],
  );

  function set<K extends FieldKey>(key: K, value: CompanionFormData[K]) {
    setData(prev => ({ ...prev, [key]: value }));
    setErrors(prev => {
      if (!prev[String(key)]) return prev;
      const next = { ...prev };
      delete next[String(key)];
      return next;
    });
  }

  function toggleArray(key: "academyExperiences" | "selectedTeams", item: string) {
    const current = data[key];
    set(key, (current.includes(item) ? current.filter(x => x !== item) : [...current, item]) as CompanionFormData[typeof key]);
  }

  function validate() {
    const next: Record<string, string> = {};
    for (const key of ["fullName", "age", "educationLevel", "wilaya", "batch", "phone", "email"] as const) {
      if (!String(data[key]).trim()) next[key] = "هذا الحقل مطلوب";
    }
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) next.email = "البريد الإلكتروني غير صالح";
    if (data.phone && !/^0[567]\d{8}$/.test(data.phone)) next.phone = "رقم الهاتف غير صالح";
    if (data.selectedTeams.length === 0) next.selectedTeams = "يرجى اختيار فريق واحد على الأقل";
    if (!data.weeklyHours) next.weeklyHours = "يرجى اختيار مدة الالتزام";
    if (!data.meetingMode) next.meetingMode = "يرجى اختيار نمط المشاركة";
    if (!data.periodicFollowUp) next.periodicFollowUp = "يرجى اختيار إجابة";
    if (completedSkills < SKILLS.length) next.skills = "يرجى تقييم جميع المهارات";
    return next;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      document.querySelector("[data-companion-errors]")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setLoading(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/companions", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { ok?: boolean };
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
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/15 text-primary">
          <span className="material-symbols-outlined text-5xl" style={{ fontVariationSettings: '"FILL" 1' }}>check_circle</span>
        </div>
        <h2 className="font-h2 text-h2 text-on-surface">تم إرسال استمارتك بنجاح</h2>
        <p className="mx-auto mt-3 max-w-xl text-on-surface-variant">
          سيتم مراجعة طلبك ضمن معايير الخبرة، الجاهزية، والقدرة على المتابعة والتوجيه. شكراً لرغبتك في صناعة بيئة قيادية أكثر نضجاً وتأثيراً.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-6" dir="rtl" noValidate>
      {Object.keys(errors).length > 0 && (
        <div data-companion-errors className="rounded-xl border border-error/30 bg-error-container px-4 py-3 text-sm text-on-error-container">
          يرجى مراجعة الحقول المحددة قبل إرسال الاستمارة.
        </div>
      )}

      <Section number="1" title="البيانات العامة">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label="الاسم الكامل" required error={errors.fullName}>
            <input className={inputClass} value={data.fullName} onChange={e => set("fullName", e.target.value)} />
          </Field>
          <Field label="العمر" required error={errors.age}>
            <input className={inputClass} value={data.age} onChange={e => set("age", e.target.value)} inputMode="numeric" />
          </Field>
          <Field label="المستوى الدراسي" required error={errors.educationLevel}>
            <input className={inputClass} value={data.educationLevel} onChange={e => set("educationLevel", e.target.value)} />
          </Field>
          <Field label="التخصص">
            <input className={inputClass} value={data.specialty} onChange={e => set("specialty", e.target.value)} />
          </Field>
          <Field label="الوظيفة">
            <input className={inputClass} value={data.job} onChange={e => set("job", e.target.value)} />
          </Field>
          <Field label="ولاية الإقامة" required error={errors.wilaya}>
            <select className={inputClass} value={data.wilaya} onChange={e => set("wilaya", e.target.value)}>
              <option value="">اختر الولاية</option>
              {WILAYAS.map(wilaya => <option key={wilaya} value={wilaya}>{wilaya}</option>)}
            </select>
          </Field>
          <Field label="الدفعة" required error={errors.batch}>
            <input className={inputClass} value={data.batch} onChange={e => set("batch", e.target.value)} />
          </Field>
          <Field label="رقم الهاتف" required error={errors.phone}>
            <input className={inputClass} value={data.phone} onChange={e => set("phone", e.target.value)} inputMode="tel" placeholder="0551234567" dir="ltr" />
          </Field>
          <Field label="البريد الإلكتروني" required error={errors.email}>
            <input className={inputClass} value={data.email} onChange={e => set("email", e.target.value)} type="email" dir="ltr" />
          </Field>
          <Field label="رابط حساب تليغرام">
            <input className={inputClass} value={data.telegramLink} onChange={e => set("telegramLink", e.target.value)} dir="ltr" />
          </Field>
          <Field label="رابط حساب لينكدإن">
            <input className={inputClass} value={data.linkedinLink} onChange={e => set("linkedinLink", e.target.value)} dir="ltr" />
          </Field>
        </div>
      </Section>

      <Section number="2" title="الخبرات والمسار داخل الأكاديمية">
        <div className="space-y-4">
          <Field label="منذ متى وأنت منخرط في الأكاديمية؟">
            <input className={inputClass} value={data.academyJoinDate} onChange={e => set("academyJoinDate", e.target.value)} />
          </Field>
          <Field label="ما أبرز المسؤوليات أو المهام التي شغلتها سابقاً؟">
            <textarea className={cn(inputClass, "min-h-28 resize-y")} value={data.previousResponsibilities} onChange={e => set("previousResponsibilities", e.target.value)} />
          </Field>
          <CheckboxGroup options={ACADEMY_EXPERIENCES} value={data.academyExperiences} onToggle={item => toggleArray("academyExperiences", item)} />
          <TextareaField label="ما أبرز تجربة قيادية أو تنظيمية مررت بها داخل الأكاديمية؟" value={data.leadershipExperience} onChange={v => set("leadershipExperience", v)} />
          <TextareaField label="ما أهم المهارات أو الخبرات التي اكتسبتها؟" value={data.acquiredSkills} onChange={v => set("acquiredSkills", v)} />
        </div>
      </Section>

      <Section number="3" title="الدافعية لدور المرافق">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <TextareaField label="لماذا ترغب في أن تكون مرافقاً للفرق؟" value={data.motivation} onChange={v => set("motivation", v)} />
          <TextareaField label="ما القيمة التي ترى أنك تستطيع إضافتها للأفراد أو الفرق؟" value={data.addedValue} onChange={v => set("addedValue", v)} />
          <TextareaField label="كيف ترى دور المرافق داخل الأكاديمية؟" value={data.companionRoleView} onChange={v => set("companionRoleView", v)} />
          <TextareaField label="ما الذي يدفعك للاستمرار في العمل التطوعي والقيادي؟" value={data.volunteeringDrive} onChange={v => set("volunteeringDrive", v)} />
        </div>
      </Section>

      <Section number="4" title="مهارات المرافقة والتوجيه">
        <div className={cn("overflow-hidden rounded-xl border", errors.skills ? "border-error" : "border-outline-variant")}>
          <div className="grid grid-cols-5 bg-surface-container px-3 py-3 text-sm font-bold text-on-surface">
            <span>المهارة</span>
            {SKILL_LEVELS.map(([, label]) => <span key={label} className="text-center">{label}</span>)}
          </div>
          {SKILLS.map(([key, label]) => (
            <div key={key} className="grid grid-cols-5 items-center border-t border-outline-variant px-3 py-3 text-sm">
              <span className="font-medium text-on-surface">{label}</span>
              {SKILL_LEVELS.map(([value, levelLabel]) => (
                <label key={value} className="flex justify-center">
                  <input
                    type="radio"
                    name={key}
                    value={value}
                    checked={data.skills[key] === value}
                    onChange={() => set("skills", { ...data.skills, [key]: value })}
                    aria-label={`${label} - ${levelLabel}`}
                    className="h-4 w-4 accent-primary"
                  />
                </label>
              ))}
            </div>
          ))}
        </div>
        {errors.skills && <p className="mt-2 text-xs font-medium text-error">{errors.skills}</p>}
      </Section>

      <Section number="5" title="المواقف العملية">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <TextareaField label="كيف تتعامل مع فرد قليل الالتزام داخل الفريق؟" value={data.lowCommitmentHandling} onChange={v => set("lowCommitmentHandling", v)} />
          <TextareaField label="ماذا تفعل إذا لاحظت ضعفاً في تفاعل الفريق؟" value={data.weakTeamInteraction} onChange={v => set("weakTeamInteraction", v)} />
          <TextareaField label="كيف تتعامل مع خلاف بين أعضاء الفريق؟" value={data.teamConflictHandling} onChange={v => set("teamConflictHandling", v)} />
          <TextareaField label="كيف توازن بين التوجيه وترك مساحة للأفراد للتجربة؟" value={data.guidanceBalance} onChange={v => set("guidanceBalance", v)} />
          <TextareaField label="إذا رفض أحد الأفراد النصيحة أو التوجيه، كيف تتصرف؟" value={data.rejectedAdviceHandling} onChange={v => set("rejectedAdviceHandling", v)} />
        </div>
      </Section>

      <Section number="6" title="الفرق التي ترغب في مرافقتها">
        <CheckboxGroup options={TEAMS} value={data.selectedTeams} onToggle={item => toggleArray("selectedTeams", item)} error={errors.selectedTeams} />
      </Section>

      <Section number="7" title="الخبرة حسب الفرق المختارة">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <TextareaField label="لماذا اخترت هذه الفرق تحديداً؟" value={data.selectedTeamsReason} onChange={v => set("selectedTeamsReason", v)} />
          <TextareaField label="ما الخبرات أو المهارات التي تؤهلك لمرافقتها؟" value={data.qualificationSkills} onChange={v => set("qualificationSkills", v)} />
          <TextareaField label="كيف يمكن أن تساهم في تطوير أداء الفريق؟" value={data.teamDevelopmentContribution} onChange={v => set("teamDevelopmentContribution", v)} />
          <TextareaField label="ما أبرز التحديات التي تتوقعها داخل الفرق؟ وكيف ستتعامل معها؟" value={data.expectedChallenges} onChange={v => set("expectedChallenges", v)} />
        </div>
      </Section>

      <Section number="8" title="الجاهزية والالتزام">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <ChoiceGroup label="كم ساعة يمكنك تخصيصها أسبوعياً؟" options={["أقل من 3 ساعات", "من 3 إلى 5 ساعات", "من 5 إلى 10 ساعات", "أكثر من 10 ساعات"]} value={data.weeklyHours} onChange={v => set("weeklyHours", v)} error={errors.weeklyHours} />
          <ChoiceGroup label="هل تستطيع المشاركة في:" options={["اللقاءات الحضورية", "اللقاءات الرقمية", "كلاهما"]} value={data.meetingMode} onChange={v => set("meetingMode", v)} error={errors.meetingMode} />
          <ChoiceGroup label="هل تستطيع متابعة الأفراد بشكل دوري؟" options={["نعم", "إلى حد ما", "لا"]} value={data.periodicFollowUp} onChange={v => set("periodicFollowUp", v)} error={errors.periodicFollowUp} />
        </div>
      </Section>

      <Section number="9" title="الرؤية والتطوير">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <TextareaField label="ما تصورك لبيئة الفرق داخل الأكاديمية؟" value={data.teamEnvironmentVision} onChange={v => set("teamEnvironmentVision", v)} />
          <TextareaField label="ما المشروع أو الفكرة التي تتمنى تطويرها داخل فضاءات الفاعلية؟" value={data.projectIdea} onChange={v => set("projectIdea", v)} />
          <TextareaField label="كيف ترى دور المرافق في صناعة قيادات جديدة؟" value={data.newLeadersRole} onChange={v => set("newLeadersRole", v)} />
        </div>
      </Section>

      <Section number="10" title="ختاماً">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <TextareaField label="لماذا ترى نفسك مناسباً لدور المرافق؟" value={data.suitabilityReason} onChange={v => set("suitabilityReason", v)} />
          <TextareaField label="ما أهم قيمة أو مبدأ تحرص على نقله للأفراد؟" value={data.coreValue} onChange={v => set("coreValue", v)} />
          <TextareaField label="هل لديك أي ملاحظات أو إضافات أخرى؟" value={data.additionalNotes} onChange={v => set("additionalNotes", v)} />
        </div>
      </Section>

      {submitError && <p className="text-center text-sm font-semibold text-error">{submitError}</p>}

      <div className="sticky bottom-4 z-20 flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex min-w-52 items-center justify-center gap-2 rounded-2xl bg-secondary px-8 py-4 font-bold text-on-secondary shadow-lg transition hover:bg-secondary-container active:scale-[0.98] disabled:opacity-60"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>send</span>
          {loading ? "جاري الإرسال..." : "إرسال الاستمارة"}
        </button>
      </div>
    </form>
  );
}

function TextareaField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <Field label={label}>
      <textarea className={cn(inputClass, "min-h-28 resize-y leading-relaxed")} value={value} onChange={e => onChange(e.target.value)} />
    </Field>
  );
}

function CheckboxGroup({
  options,
  value,
  onToggle,
  error,
}: {
  options: string[];
  value: string[];
  onToggle: (item: string) => void;
  error?: string;
}) {
  return (
    <div>
      <div className={cn("flex flex-wrap gap-2", error && "rounded-xl bg-error/5 p-2 ring-1 ring-error")}>
        {options.map(option => {
          const checked = value.includes(option);
          return (
            <label
              key={option}
              className={cn(
                "flex cursor-pointer select-none items-center gap-2 rounded-full border px-4 py-2.5 text-sm transition-all",
                checked ? "border-primary bg-primary/10 font-semibold text-primary" : "border-outline-variant bg-white text-on-surface hover:border-primary/50",
              )}
            >
              <input type="checkbox" checked={checked} onChange={() => onToggle(option)} className="sr-only" />
              {checked && <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>check</span>}
              {option}
            </label>
          );
        })}
      </div>
      {error && <p className="mt-2 text-xs font-medium text-error">{error}</p>}
    </div>
  );
}

function ChoiceGroup({
  label,
  options,
  value,
  onChange,
  error,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-on-surface-variant">{label}</p>
      <div className={cn("flex flex-col gap-2", error && "rounded-xl bg-error/5 p-2 ring-1 ring-error")}>
        {options.map(option => (
          <label
            key={option}
            className={cn(
              "flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-3 text-sm transition-all",
              value === option ? "border-primary bg-primary/10 font-semibold text-primary" : "border-outline-variant bg-white text-on-surface hover:border-primary/50",
            )}
          >
            <input type="radio" checked={value === option} onChange={() => onChange(option)} className="h-4 w-4 accent-primary" />
            {option}
          </label>
        ))}
      </div>
      {error && <p className="mt-2 text-xs font-medium text-error">{error}</p>}
    </div>
  );
}
