import type { StepProps } from "../form-types";
import { WILAYAS } from "../form-types";
import { Field, TextInput, Divider, SectionTitle, inputCls } from "../form-ui";
import { cn } from "@/lib/utils";

export function Step1({ data, set, errors }: StepProps) {
  return (
    <div className="space-y-5">
      <SectionTitle icon="person" title="المعلومات الشخصية" sub="البيانات الأساسية للتواصل والتعرف عليك" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="الاسم الكامل" required error={errors.fullName}>
          <TextInput value={data.fullName} onChange={v => set("fullName", v)} placeholder="اكتب اسمك الكامل" required hasError={!!errors.fullName} />
        </Field>

        <Field label="العمر" required error={errors.age}>
          <TextInput value={data.age} onChange={v => set("age", v)} placeholder="مثال: 22" required inputMode="numeric" hasError={!!errors.age} />
        </Field>

        <Field label="المستوى الدراسي" required error={errors.educationLevel}>
          <TextInput value={data.educationLevel} onChange={v => set("educationLevel", v)} placeholder="مثال: ليسانس، ماستر، ثانوي..." hasError={!!errors.educationLevel} />
        </Field>

        <Field label="التخصص">
          <TextInput value={data.specialty} onChange={v => set("specialty", v)} placeholder="تخصصك الدراسي أو المهني" />
        </Field>

        <Field label="الوظيفة">
          <TextInput value={data.job} onChange={v => set("job", v)} placeholder="طالب / موظف / مستقل..." />
        </Field>

        <Field label="ولاية الإقامة" required error={errors.wilaya}>
          <select
            className={cn(inputCls(!!errors.wilaya), "cursor-pointer appearance-none")}
            value={data.wilaya}
            onChange={e => set("wilaya", e.target.value)}
            aria-invalid={!!errors.wilaya}
            dir="rtl"
          >
            <option value="">اختر الولاية</option>
            {WILAYAS.map(w => <option key={w} value={w}>{w}</option>)}
          </select>
        </Field>

        <Field label="اسم الفوج">
          <TextInput value={data.groupName} onChange={v => set("groupName", v)} placeholder="اسم فوجك في الأكاديمية" />
        </Field>

        <Field label="الدفعة">
          <TextInput value={data.batch} onChange={v => set("batch", v)} placeholder="مثال: الدفعة الأولى، ٢٠٢٤..." />
        </Field>
      </div>

      <Divider label="بيانات التواصل" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="رقم الهاتف" required error={errors.phone}>
          <TextInput value={data.phone} onChange={v => set("phone", v)} placeholder="0551234567" required inputMode="tel" hasError={!!errors.phone} />
        </Field>

        <Field label="البريد الإلكتروني" required error={errors.email}>
          <TextInput value={data.email} onChange={v => set("email", v)} placeholder="example@email.com" required type="email" hasError={!!errors.email} />
        </Field>

        <Field label="رابط حساب تليغرام">
          <TextInput value={data.telegramLink} onChange={v => set("telegramLink", v)} placeholder="t.me/username" />
        </Field>

        <Field label="رابط حساب لينكدإن">
          <TextInput value={data.linkedinLink} onChange={v => set("linkedinLink", v)} placeholder="linkedin.com/in/username" />
        </Field>
      </div>
    </div>
  );
}
