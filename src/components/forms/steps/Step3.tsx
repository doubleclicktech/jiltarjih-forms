import type { FullRegistrationFormData } from "@/types";
import type { StepProps } from "../form-types";
import { Field, Textarea, SectionTitle } from "../form-ui";

const QUESTIONS: { key: keyof FullRegistrationFormData; label: string; required?: boolean }[] = [
  { key: "whyThisTeam",        label: "لماذا اخترت هذا الفريق تحديداً؟",                        required: true },
  { key: "whatYouAdd",         label: "ما الذي تتوقع أن تضيفه للفريق؟",                          required: true },
  { key: "whatYouGain",        label: "ما الذي تتوقع أن تستفيده من هذه التجربة؟"                              },
  { key: "currentIssue",       label: "ما القضية أو المجال الذي يشغلك أكثر حالياً؟ ولماذا؟",    required: true },
  { key: "teamworkExperience", label: "صف تجربة سابقة لك في العمل الجماعي أو التطوعي"                         },
  { key: "persistenceReason",  label: "ما الذي يجعلك تستمر في فريق حتى في الظروف الصعبة؟"                    },
];

export function Step3({ data, set, errors }: StepProps) {
  return (
    <div className="space-y-5">
      <SectionTitle icon="psychology" title="الدافعية للانضمام" sub="دوافعك وتوقعاتك من هذه التجربة" />
      {QUESTIONS.map(q => (
        
        <Field key={String(q.key)} label={q.label} required={q.required} error={errors[q.key] as string | undefined}>
          <Textarea
            value={data[q.key] as string}
            onChange={v => set(q.key, v as FullRegistrationFormData[typeof q.key])}
            placeholder="اكتب إجابتك هنا..."
            rows={3}
            hasError={!!errors[q.key]}
          />
        </Field>
      ))}
    </div>
  );
}
