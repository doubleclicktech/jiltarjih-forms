import { z } from "zod";

const VALID_WILAYAS = [
  "أدرار", "الشلف", "الأغواط", "أم البواقي", "باتنة", "بجاية", "بسكرة",
  "بشار", "البليدة", "البويرة", "تمنراست", "تبسة", "تلمسان", "تيارت",
  "تيزي وزو", "الجزائر", "الجلفة", "جيجل", "سطيف", "سعيدة", "سكيكدة",
  "سيدي بلعباس", "عنابة", "قالمة", "قسنطينة", "المدية", "مستغانم",
  "المسيلة", "معسكر", "ورقلة", "وهران", "البيض", "إليزي", "برج بوعريريج",
  "بومرداس", "الطارف", "تندوف", "تيسمسيلت", "الوادي", "خنشلة", "سوق أهراس",
  "تيبازة", "ميلة", "عين الدفلى", "النعامة", "عين تيموشنت", "غرداية", "غليزان",
  "تيميمون", "برج باجي مختار", "أولاد جلال", "بني عباس", "عين صالح",
  "عين قزام", "توقرت", "جانت", "المغير", "المنيعة",
];

const VALID_TEAMS = [
  "fikra", "quran", "difaf", "tadrib", "tibbi",
  "doubleclick", "munazara", "funun", "safari", "qawim",
];

const VALID_PROJECTS = [
  "qawim", "kafa-mukhadarat", "jil-riyadhi", "shabab-tak", "badr",
];

const skillLevel = z.enum(["", "weak", "medium", "good", "excellent"]);

export const registrationSchema = z.object({
  // Registration type
  registrationType: z.enum(["team", "project"]),

  // Step 1 – personal
  fullName: z.string().min(2, "الاسم الكامل مطلوب").max(100),
  age: z.string()
    .regex(/^\d{1,2}$/, "العمر غير صالح")
    .refine((v) => +v >= 15 && +v <= 60, "العمر يجب أن يكون بين 15 و60 سنة"),
  educationLevel: z.string().min(1, "المستوى الدراسي مطلوب").max(100),
  specialty: z.string().max(150).optional().default(""),
  job: z.string().max(150).optional().default(""),
  wilaya: z.string().min(1, "الولاية مطلوبة").max(50),
  groupName: z.string().max(100).optional().default(""),
  batch: z.string().max(50).optional().default(""),
  phone: z
    .string()
    .regex(/^0[567]\d{8}$/, "رقم الهاتف غير صالح (مثال: 0551234567)"),
  email: z.string().email("البريد الإلكتروني غير صالح"),
  telegramLink: z.string().max(200).optional().default(""),
  linkedinLink: z.string().max(200).optional().default(""),

  // Step 2 – engagement
  hoursPerWeek: z.string().max(20).optional().default(""),
  activityTypes: z.array(z.string().max(50)).optional().default([]),
  hasTransportation: z.string().max(20).optional().default(""),
  hasVolunteerExperience: z.string().max(20).optional().default(""),
  volunteerOrgName: z.string().max(200).optional().default(""),
  volunteerActivityNature: z.string().max(500).optional().default(""),
  volunteerDuration: z.string().max(100).optional().default(""),
  volunteerTasks: z.string().max(500).optional().default(""),
  notableProject: z.string().max(500).optional().default(""),
  heldPosition: z.string().max(20).optional().default(""),
  positionType: z.string().max(200).optional().default(""),
  skillsGained: z.string().max(500).optional().default(""),

  // Step 3 – motivation (open-ended, generous limit)
  whyThisTeam: z.string().max(2000).optional().default(""),
  whatYouAdd: z.string().max(2000).optional().default(""),
  whatYouGain: z.string().max(2000).optional().default(""),
  currentIssue: z.string().max(2000).optional().default(""),
  teamworkExperience: z.string().max(2000).optional().default(""),
  persistenceReason: z.string().max(2000).optional().default(""),

  // Step 4 – management & skills
  hasLedTeam: z.string().max(20).optional().default(""),
  ledTeamDescription: z.string().max(1000).optional().default(""),
  taskPressureHandling: z.string().max(1000).optional().default(""),
  nonCompliantMemberHandling: z.string().max(1000).optional().default(""),
  conflictHandling: z.string().max(1000).optional().default(""),
  workPreference: z.string().max(100).optional().default(""),
  timeOrganization: z.string().max(1000).optional().default(""),
  lateTaskHandling: z.string().max(1000).optional().default(""),
  acceptsFeedback: z.string().max(20).optional().default(""),
  skillPlanning: skillLevel.optional().default(""),
  skillTimeManagement: skillLevel.optional().default(""),
  skillTeamwork: skillLevel.optional().default(""),
  skillProblemSolving: skillLevel.optional().default(""),
  skillLeadership: skillLevel.optional().default(""),
  skillCommunication: skillLevel.optional().default(""),
  possessedSkills: z.array(z.string().max(100)).optional().default([]),
  otherPossessedSkill: z.string().max(200).optional().default(""),

  // Step 5 – selection (team path)
  selectedTeams: z
    .array(z.string().refine((t) => VALID_TEAMS.includes(t), "فريق غير صالح"))
    .optional()
    .default([]),

  // Step 5 – selection (project path)
  selectedProjects: z
    .array(z.string().refine((p) => VALID_PROJECTS.includes(p), "مشروع غير صالح"))
    .optional()
    .default([]),

  // Step 6 – per-team answers (free-form object, values validated by size)
  teamAnswers: z
    .record(
      z.string().max(50),
      z.record(
        z.string().max(100),
        z.union([z.string().max(2000), z.array(z.string().max(200))])
      )
    )
    .optional()
    .default({}),

  // Step 7 – conclusion
  selectionReason: z.string().min(20, "يرجى الإجابة بتفصيل أكثر (20 حرفاً على الأقل)").max(2000),
  vision: z.string().max(2000).optional().default(""),
  additionalNotes: z.string().max(2000).optional().default(""),
}).superRefine((data, ctx) => {
  if (data.registrationType === "team" && data.selectedTeams.length === 0) {
    ctx.addIssue({ code: "custom", path: ["selectedTeams"], message: "يجب اختيار فريق واحد على الأقل" });
  }
  if (data.registrationType === "project" && data.selectedProjects.length === 0) {
    ctx.addIssue({ code: "custom", path: ["selectedProjects"], message: "يجب اختيار مشروع واحد على الأقل" });
  }
});

export type ValidatedRegistrationData = z.infer<typeof registrationSchema>;
