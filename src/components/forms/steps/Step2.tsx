import { useId } from "react";
import { cn } from "@/lib/utils";
import type { StepProps } from "../form-types";
import { Field, TextInput, Textarea, RadioCards, Divider, SectionTitle, inputCls } from "../form-ui";

const POSITION_OPTIONS = ["قائد فريق","نائب قائد","مسؤول إعلام","مسؤول تنظيم","مسؤول تكوين","مسؤول تقني","عضو منفذ"];

export function Step2({ data, set, errors }: StepProps) {
  const posGroupId = useId();

  return (
    <div className="space-y-6">
      <SectionTitle icon="volunteer_activism" title="الانخراط والتجربة" sub="مدى تفرغك وخبراتك التطوعية السابقة" />

      <Field label="كم ساعة يمكنك تخصيصها أسبوعياً للعمل التطوعي؟" required error={errors.hoursPerWeek}>
        <RadioCards
          value={data.hoursPerWeek}
          onChange={v => set("hoursPerWeek", v)}
          hasError={!!errors.hoursPerWeek}
          legend="عدد الساعات الأسبوعية"
          options={[
            { value: "less_3",  label: "أقل من 3 ساعات"    },
            { value: "3_5",     label: "من 3 إلى 5 ساعات"  },
            { value: "5_10",    label: "من 5 إلى 10 ساعات" },
            { value: "more_10", label: "أكثر من 10 ساعات"  },
          ]}
        />
      </Field>

      <Field label="هل تستطيع المشاركة في:" required error={errors.activityTypes}>
        <RadioCards
          value={data.activityTypes[0] ?? ""}
          onChange={v => set("activityTypes", [v])}
          hasError={!!errors.activityTypes}
          legend="نوع المشاركة"
          options={[
            { value: "in_person", label: "الأنشطة الحضورية" },
            { value: "digital",   label: "الأنشطة الرقمية"  },
            { value: "both",      label: "كلاهما"           },
          ]}
        />
      </Field>

      <Field label="هل تمتلك وسيلة نقل تساعدك على التنقل للأنشطة؟" required error={errors.hasTransportation}>
        <RadioCards
          value={data.hasTransportation}
          onChange={v => set("hasTransportation", v)}
          hasError={!!errors.hasTransportation}
          legend="وسيلة النقل"
          options={[{ value: "yes", label: "نعم" }, { value: "no", label: "لا" }]}
        />
      </Field>

      <Divider label="التجارب التطوعية" />

      <Field label="هل سبق لك الانخراط في أعمال تطوعية أو فرق شبابية؟" required error={errors.hasVolunteerExperience}>
        <RadioCards
          value={data.hasVolunteerExperience}
          onChange={v => set("hasVolunteerExperience", v)}
          hasError={!!errors.hasVolunteerExperience}
          legend="التجربة التطوعية السابقة"
          options={[{ value: "yes", label: "نعم" }, { value: "no", label: "لا" }]}
        />
      </Field>

      {data.hasVolunteerExperience === "yes" && (
        <div className="bg-surface-container border border-primary/20 rounded-2xl p-5 space-y-4">
          <p className="text-sm font-medium text-primary text-right">تفاصيل التجربة التطوعية</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="اسم المؤسسة / الفريق / الجمعية">
              <TextInput value={data.volunteerOrgName} onChange={v => set("volunteerOrgName", v)} placeholder="اسم الجهة" />
            </Field>
            <Field label="طبيعة النشاط">
              <TextInput value={data.volunteerActivityNature} onChange={v => set("volunteerActivityNature", v)} placeholder="وصف النشاط" />
            </Field>
            <Field label="مدة الانخراط">
              <TextInput value={data.volunteerDuration} onChange={v => set("volunteerDuration", v)} placeholder="مثال: سنة، ٦ أشهر..." />
            </Field>
          </div>
          <Field label="المهام التي كنت تقوم بها">
            <Textarea value={data.volunteerTasks} onChange={v => set("volunteerTasks", v)} placeholder="اذكر أبرز مهامك..." />
          </Field>
        </div>
      )}

      <Field label="ما أبرز مشروع أو نشاط شاركت فيه؟">
        <Textarea value={data.notableProject} onChange={v => set("notableProject", v)} placeholder="اذكر المشروع وما قدمته فيه..." />
      </Field>

      <Field label="هل سبق أن شغلت منصباً أو مسؤولية داخل فريق؟" required error={errors.heldPosition}>
        <RadioCards
          value={data.heldPosition}
          onChange={v => set("heldPosition", v)}
          hasError={!!errors.heldPosition}
          legend="المنصب السابق"
          options={[{ value: "yes", label: "نعم" }, { value: "no", label: "لا" }]}
        />
      </Field>

      {data.heldPosition === "yes" && (
        <div className="bg-surface-container border border-primary/20 rounded-2xl p-5">
          <fieldset>
            <legend className="block text-sm font-medium text-on-surface-variant mb-2 text-right">
              ما المرتبة أو المسؤولية التي شغلتها؟
            </legend>
            <div className="flex flex-wrap gap-2 mt-1">
              {POSITION_OPTIONS.map(pos => (
                <label
                  key={pos}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-full border text-sm transition-all cursor-pointer select-none",
                    data.positionType === pos
                      ? "border-2 border-primary bg-primary/10 text-primary font-medium"
                      : "border border-outline-variant hover:border-primary/50 text-on-surface"
                  )}
                >
                  <input
                    type="radio"
                    name={posGroupId}
                    value={pos}
                    checked={data.positionType === pos}
                    onChange={() => set("positionType", pos)}
                    className="sr-only"
                  />
                  {pos}
                </label>
              ))}
              <input
                type="text"
                className={cn(inputCls(), "px-3 py-2 rounded-full border-dashed text-sm min-w-[120px] w-auto")}
                placeholder="أخرى..."
                value={!POSITION_OPTIONS.includes(data.positionType) ? data.positionType : ""}
                onChange={e => set("positionType", e.target.value)}
                aria-label="منصب آخر"
                dir="rtl"
              />
            </div>
          </fieldset>
        </div>
      )}

      <Field label="ما أهم المهارات أو الخبرات التي اكتسبتها من العمل التطوعي؟">
        <Textarea value={data.skillsGained} onChange={v => set("skillsGained", v)} placeholder="اذكر أبرز ما اكتسبته..." />
      </Field>
    </div>
  );
}
