import { teams } from "@/data/teams";
import type { StepProps } from "../form-types";
import { Field, Textarea, SectionTitle } from "../form-ui";

export function Step7({ data, set, errors }: StepProps) {
  return (
    <div className="space-y-5">
      <SectionTitle icon="check_circle" title="ختاماً" sub="خاتمة استمارتك وملاحظاتك الأخيرة" />

      <Field label="لماذا يجب اختيارك ضمن هذا الفريق؟" required error={errors.selectionReason}>
        <Textarea
          value={data.selectionReason}
          onChange={v => set("selectionReason", v)}
          placeholder="اكتب ما يميزك ويجعلك الاختيار الأمثل..."
          rows={4}
          hasError={!!errors.selectionReason}
        />
      </Field>

      <Field label="ما رؤيتك أو فكرتك التي تتمنى تحقيقها داخل الفريق؟">
        <Textarea value={data.vision} onChange={v => set("vision", v)} placeholder="شارك حلمك ورؤيتك..." rows={4} />
      </Field>

      <Field label="هل لديك أي ملاحظات أو إضافات أخرى؟">
        <Textarea value={data.additionalNotes} onChange={v => set("additionalNotes", v)} placeholder="أي شيء تريد إضافته..." rows={3} />
      </Field>

      <div className="bg-surface-container rounded-2xl p-5 space-y-2 text-right">
        <p className="font-semibold text-on-surface text-sm">ملخص اختياراتك:</p>
        <div className="flex flex-wrap gap-2 mt-2" role="list" aria-label="الفرق المختارة">
          {data.selectedTeams.map(tid => {
            const t = teams.find(x => x.id === tid);
            return t ? (
              <span
                key={tid}
                role="listitem"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 border border-primary/30 rounded-full text-xs text-primary font-medium"
              >
                <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: '"FILL" 1' }} aria-hidden>{t.icon}</span>
                {t.name}
              </span>
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
}
