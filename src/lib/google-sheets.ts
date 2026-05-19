import type { FullRegistrationFormData, RegistrationType } from "@/types";

const FIELD_LABELS: Record<keyof FullRegistrationFormData | "createdAt", string> = {
  createdAt:                    "تاريخ التسجيل",
  registrationType:             "نوع التسجيل",
  fullName:                     "الاسم الكامل",
  age:                          "العمر",
  educationLevel:               "المستوى التعليمي",
  specialty:                    "التخصص",
  job:                          "الوظيفة",
  wilaya:                       "الولاية",
  groupName:                    "اسم المجموعة",
  batch:                        "الدفعة",
  phone:                        "رقم الهاتف",
  email:                        "البريد الإلكتروني",
  telegramLink:                 "رابط تيليغرام",
  linkedinLink:                 "رابط لينكدإن",
  hoursPerWeek:                 "ساعات العمل أسبوعياً",
  activityTypes:                "أنواع النشاط",
  hasTransportation:            "وسيلة تنقل",
  hasVolunteerExperience:       "تجربة تطوعية",
  volunteerOrgName:             "اسم المنظمة التطوعية",
  volunteerActivityNature:      "طبيعة النشاط التطوعي",
  volunteerDuration:            "مدة التطوع",
  volunteerTasks:               "المهام التطوعية",
  notableProject:               "مشروع بارز",
  heldPosition:                 "منصب مشغول",
  positionType:                 "نوع المنصب",
  skillsGained:                 "المهارات المكتسبة",
  whyThisTeam:                  "لماذا هذا الفريق",
  whatYouAdd:                   "ماذا ستضيف",
  whatYouGain:                  "ماذا ستكتسب",
  currentIssue:                 "القضية الراهنة",
  teamworkExperience:           "تجربة العمل الجماعي",
  persistenceReason:            "سبب الاستمرار",
  hasLedTeam:                   "قيادة فريق",
  ledTeamDescription:           "وصف قيادة الفريق",
  taskPressureHandling:         "التعامل مع ضغط المهام",
  nonCompliantMemberHandling:   "التعامل مع العضو غير الملتزم",
  conflictHandling:             "إدارة النزاعات",
  workPreference:               "تفضيل طريقة العمل",
  timeOrganization:             "تنظيم الوقت",
  lateTaskHandling:             "التعامل مع تأخر المهام",
  acceptsFeedback:              "تقبّل النقد",
  skillPlanning:                "مهارة التخطيط",
  skillTimeManagement:          "مهارة إدارة الوقت",
  skillTeamwork:                "مهارة العمل الجماعي",
  skillProblemSolving:          "مهارة حل المشكلات",
  skillLeadership:              "مهارة القيادة",
  skillCommunication:           "مهارة التواصل",
  possessedSkills:              "المهارات التقنية",
  otherPossessedSkill:          "مهارة تقنية أخرى",
  selectedTeams:                "الفرق المختارة",
  selectedProjects:             "المشاريع المختارة",
  teamAnswers:                  "إجابات الفرق",
  selectionReason:              "سبب الاختيار",
  vision:                       "الرؤية",
  additionalNotes:              "ملاحظات إضافية",
};

export async function appendRegistrationToGoogleSheets(input: {
  data: FullRegistrationFormData;
  createdAt: string;
  registrationType: RegistrationType;
}) {
  const urlEnvKey = input.registrationType === "project"
    ? "GOOGLE_SHEETS_PROJECTS_URL"
    : "GOOGLE_SHEETS_TEAMS_URL";
  const url = process.env[urlEnvKey];
  if (!url) {
    throw new Error(`${urlEnvKey}_MISSING`);
  }

  const raw: Record<keyof FullRegistrationFormData | "createdAt", unknown> = {
    ...input.data,
    createdAt:        input.createdAt,
    activityTypes:    input.data.activityTypes.join("، "),
    possessedSkills:  input.data.possessedSkills.join("، "),
    selectedTeams:    input.data.selectedTeams.join("، "),
    selectedProjects: input.data.selectedProjects.join("، "),
    teamAnswers:      JSON.stringify(input.data.teamAnswers),
  };

  const payload: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(raw)) {
    const label = FIELD_LABELS[key as keyof typeof FIELD_LABELS] ?? key;
    payload[label] = value;
  }

  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      redirect: "follow",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    throw new Error(`GOOGLE_SHEETS_NETWORK_ERROR: ${String(err)}`);
  }

  // Apps Script always returns HTTP 200 — check the body instead
  let json: { ok: boolean; error?: string };
  try {
    json = await res.json() as { ok: boolean; error?: string };
  } catch {
    throw new Error("GOOGLE_SHEETS_INVALID_RESPONSE");
  }

  if (!json.ok) {
    throw new Error(`GOOGLE_SHEETS_FAILED: ${json.error ?? "unknown"}`);
  }
}
