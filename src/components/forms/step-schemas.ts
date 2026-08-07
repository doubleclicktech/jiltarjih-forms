import { z } from "zod";

export const step1Schema = z.object({
  registrationNumber: z.string().min(1, "رقم التسجيل مطلوب"),
  fullName: z.string().min(2, "الاسم الكامل مطلوب (حرفان على الأقل)"),
  gender: z.string().refine((v) => ["ذكر", "انثى"].includes(v), "يرجى اختيار الجنس"),
  age: z.string()
    .min(1, "العمر مطلوب")
    .refine(
      (v) => /^\d{1,2}$/.test(v) && +v >= 15 && +v <= 60,
      "أدخل عمراً صحيحاً بين 15 و60 سنة"
    ),
  stage: z.string().refine((v) => ["التنشئة", "ريادي", "تمكين", "قيادي"].includes(v), "يرجى اختيار المرحلة"),
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
  type Schema = { safeParse: (v: unknown) => { success: boolean; error?: z.ZodError } };

  if (formType === "team") {
    // Team form order: 1 personal → 2 team selection → 3 engagement → 4 motivation → 5 skills → 6 quiz → 7 conclusion
    const teamMap: Record<number, Schema> = {
      1: step1Schema,
      2: step5Schema,
      3: step2Schema,
      4: step3Schema,
      5: step4Schema,
      7: step7Schema,
    };
    return teamMap[step] ?? null;
  }

  // Project form order (unchanged): 1 personal → 2 engagement → 3 motivation → 4 skills → 5 project selection → 6 conclusion
  if (step === 5) return step5ProjectSchema;
  if (step === 6) return step7Schema;
  const projectMap: Record<number, Schema> = {
    1: step1Schema, 2: step2Schema, 3: step3Schema, 4: step4Schema,
  };
  return projectMap[step] ?? null;
}
