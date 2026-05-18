import type { FullRegistrationFormData } from "@/types";
import type { StepProps } from "../form-types";
import { SKILL_LEVELS, SKILL_ROWS } from "../form-types";
import { Field, Textarea, RadioCards, CheckboxChips, Divider, SectionTitle } from "../form-ui";
import { POSSESSED_SKILLS } from "../form-types";
import { cn } from "@/lib/utils";

const OPEN_QUESTIONS: { key: keyof FullRegistrationFormData; label: string }[] = [
  { key: "taskPressureHandling",       label: "كيف تتعامل مع ضغط المهام أو كثرة المسؤوليات؟" },
  { key: "nonCompliantMemberHandling", label: "ماذا تفعل إذا لم يلتزم أحد أعضاء الفريق بمهامه؟" },
  { key: "conflictHandling",           label: "كيف تتعامل مع الخلافات داخل الفريق؟" },
  { key: "timeOrganization",           label: "كيف تنظم وقتك بين الدراسة/العمل والعمل التطوعي؟" },
  { key: "lateTaskHandling",           label: "إذا تم تكليفك بمهمة ولم تستطع إنجازها في الوقت المحدد، ماذا تفعل؟" },
];

export function Step4({ data, set, errors }: StepProps) {
  return (
    <div className="space-y-6">
      <SectionTitle icon="star" title="مهارات الإدارة والالتزام" sub="أسلوبك في العمل وقدراتك القيادية" />

      <Field label="هل سبق أن قدت فريقاً أو أدرت نشاطاً؟" required error={errors.hasLedTeam}>
        <RadioCards
          value={data.hasLedTeam}
          onChange={v => set("hasLedTeam", v)}
          hasError={!!errors.hasLedTeam}
          legend="قيادة فريق سابقة"
          options={[{ value: "yes", label: "نعم" }, { value: "no", label: "لا" }]}
        />
      </Field>

      {data.hasLedTeam === "yes" && (
        <div className="bg-surface-container border border-primary/20 rounded-2xl p-5">
          <Field label="اشرح بإيجاز تجربتك في القيادة أو الإدارة">
            <Textarea value={data.ledTeamDescription} onChange={v => set("ledTeamDescription", v)} placeholder="اذكر الفريق أو النشاط والدور الذي قمت به..." />
          </Field>
        </div>
      )}

      {OPEN_QUESTIONS.map(q => (
        <Field key={String(q.key)} label={q.label}>
          <Textarea
            value={data[q.key] as string}
            onChange={v => set(q.key, v as FullRegistrationFormData[typeof q.key])}
            placeholder="اكتب إجابتك..."
          />
        </Field>
      ))}

      <Field label="هل تفضل:" required error={errors.workPreference}>
        <RadioCards
          value={data.workPreference}
          onChange={v => set("workPreference", v)}
          hasError={!!errors.workPreference}
          legend="تفضيل العمل"
          options={[
            { value: "leadership",    label: "القيادة"       },
            { value: "execution",     label: "التنفيذ"       },
            { value: "collaborative", label: "العمل المشترك" },
          ]}
        />
      </Field>

      <Field label="هل تقبل التوجيه والنقد داخل الفريق؟" required error={errors.acceptsFeedback}>
        <RadioCards
          value={data.acceptsFeedback}
          onChange={v => set("acceptsFeedback", v)}
          hasError={!!errors.acceptsFeedback}
          legend="قبول النقد والتوجيه"
          options={[
            { value: "yes",      label: "نعم"       },
            { value: "somewhat", label: "إلى حد ما" },
            { value: "no",       label: "لا"        },
          ]}
        />
      </Field>

      <Divider label="تقييم المهارات" />

      <div>
        <p className="text-sm font-medium text-on-surface-variant mb-3 text-right">حدد مستوى مهاراتك في كل مجال:</p>
        <div className="overflow-x-auto rounded-xl border border-outline-variant">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-container">
                <th scope="col" className="text-right px-4 py-3 font-medium text-on-surface-variant border-b border-outline-variant">المهارة</th>
                {SKILL_LEVELS.map(l => (
                  <th key={l.value} scope="col" className="px-3 py-3 text-center font-medium text-on-surface-variant border-b border-outline-variant whitespace-nowrap">
                    {l.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SKILL_ROWS.map((row, i) => (
                <tr key={row.key} className={i % 2 === 0 ? "bg-surface-container-lowest" : "bg-surface-container-low"}>
                  <th scope="row" className="px-4 py-3 text-right text-on-surface font-medium whitespace-nowrap">
                    {row.label}
                  </th>
                  {SKILL_LEVELS.map(l => (
                    <td key={l.value} className="px-3 py-3 text-center">
                      <label className="flex items-center justify-center cursor-pointer">
                        <input
                          type="radio"
                          name={`skill-${row.key}`}
                          value={l.value}
                          checked={data[row.key] === l.value}
                          onChange={() => set(row.key, l.value)}
                          className="sr-only"
                          aria-label={`${row.label}: ${l.label}`}
                        />
                        <span
                          className={cn(
                            "w-6 h-6 rounded-full border-2 block transition-all",
                            data[row.key] === l.value
                              ? "bg-primary border-primary"
                              : "border-outline-variant hover:border-primary/60"
                          )}
                          aria-hidden
                        />
                      </label>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Divider label="المهارات المتقنة" />

      <Field label="ما المهارات التي تتقنها؟ (يمكن اختيار أكثر من مهارة)">
        <CheckboxChips
          options={POSSESSED_SKILLS}
          value={data.possessedSkills}
          onChange={v => set("possessedSkills", v)}
          otherValue={data.otherPossessedSkill}
          onOtherChange={v => set("otherPossessedSkill", v)}
        />
      </Field>
    </div>
  );
}
