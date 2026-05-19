import { z } from "zod";

export const step1Schema = z.object({
  fullName: z.string().min(2, "الاسم الكامل مطلوب (حرفان على الأقل)"),
  age: z.string()
    .min(1, "العمر مطلوب")
    .refine(
      (v) => /^\d{1,2}$/.test(v) && +v >= 15 && +v <= 60,
      "أدخل عمراً صحيحاً بين 15 و60 سنة"
    ),
  educationLevel: z.string().min(1, "المستوى الدراسي مطلوب"),
  wilaya:         z.string().min(1, "يرجى اختيار الولاية"),
  phone:          z.string().regex(/^0[567]\d{8}$/, "رقم الهاتف غير صحيح (مثال: 0551234567)"),
  email:          z.string().min(1, "البريد الإلكتروني مطلوب").email("البريد الإلكتروني غير صحيح"),
});

export const step2Schema = z.object({
  hoursPerWeek:           z.string().min(1, "يرجى تحديد عدد الساعات الأسبوعية"),
  activityTypes:          z.array(z.string()).min(1, "يرجى اختيار نوع المشاركة"),
  hasTransportation:      z.string().min(1, "يرجى الإجابة على هذا السؤال"),
  hasVolunteerExperience: z.string().min(1, "يرجى الإجابة على هذا السؤال"),
  heldPosition:           z.string().min(1, "يرجى الإجابة على هذا السؤال"),
});

export const step3Schema = z.object({
  whyThisTeam:  z.string().min(20, "يرجى الإجابة بتفصيل أكثر (20 حرفاً على الأقل)"),
  whatYouAdd:   z.string().min(10, "يرجى الإجابة على هذا السؤال"),
  currentIssue: z.string().min(10, "يرجى الإجابة على هذا السؤال"),
});

export const step4Schema = z.object({
  hasLedTeam:      z.string().min(1, "يرجى الإجابة على هذا السؤال"),
  workPreference:  z.string().min(1, "يرجى اختيار تفضيلك في العمل"),
  acceptsFeedback: z.string().min(1, "يرجى الإجابة على هذا السؤال"),
});

export const step5Schema = z.object({
  selectedTeams: z.array(z.string()).min(1, "يرجى اختيار فريق واحد على الأقل"),
});

export const step5ProjectSchema = z.object({
  selectedProjects: z.array(z.string()).min(1, "يرجى اختيار مشروع واحد على الأقل"),
});

export const step7Schema = z.object({
  selectionReason: z.string().min(20, "يرجى الإجابة بتفصيل أكثر (20 حرفاً على الأقل)"),
});

export function getStepSchema(step: number, formType: "team" | "project" = "team") {
  if (step === 5) return formType === "project" ? step5ProjectSchema : step5Schema;
  // project form: conclusion is rendered at step 6
  if (step === 6 && formType === "project") return step7Schema;
  const map: Record<number, { safeParse: (v: unknown) => { success: boolean; error?: z.ZodError } }> = {
    1: step1Schema, 2: step2Schema, 3: step3Schema,
    4: step4Schema, 7: step7Schema,
  };
  return map[step] ?? null;
}
