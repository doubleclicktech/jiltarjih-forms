import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimit } from "@/lib/rate-limit";

const text = z.string().max(4000).optional().default("");

const companionSchema = z.object({
  fullName: z.string().min(2).max(120),
  gender: z.enum(["ذكر", "انثى"]),
  age: z.string().regex(/^\d{1,2}$/).refine(v => Number(v) >= 18 && Number(v) <= 70),
  stage: z.enum(["التنشئة", "ريادي", "تمكين", "قيادي"]),
  educationLevel: z.string().min(1).max(120),
  specialty: text,
  job: text,
  wilaya: z.string().min(1).max(80),
  batch: z.string().min(1).max(80),
  phone: z.string().regex(/^0[567]\d{8}$/),
  email: z.string().email().max(160),
  telegramLink: text,
  linkedinLink: text,
  academyJoinDate: text,
  previousResponsibilities: text,
  academyExperiences: z.array(z.string().max(120)).default([]),
  leadershipExperience: text,
  acquiredSkills: text,
  motivation: text,
  addedValue: text,
  companionRoleView: text,
  volunteeringDrive: text,
  skills: z.record(z.string().max(80), z.enum(["weak", "medium", "good", "excellent"])),
  lowCommitmentHandling: text,
  weakTeamInteraction: text,
  teamConflictHandling: text,
  guidanceBalance: text,
  rejectedAdviceHandling: text,
  selectedTeams: z.array(z.string().max(160)).min(1),
  selectedTeamsReason: text,
  qualificationSkills: text,
  teamDevelopmentContribution: text,
  expectedChallenges: text,
  weeklyHours: z.string().min(1).max(80),
  meetingMode: z.string().min(1).max(80),
  periodicFollowUp: z.string().min(1).max(80),
  teamEnvironmentVision: text,
  projectIdea: text,
  newLeadersRole: text,
  suitabilityReason: text,
  coreValue: text,
  additionalNotes: text,
});

type CompanionData = z.infer<typeof companionSchema>;

type BetterSqlite3Database = {
  exec: (sql: string) => void;
  prepare: (sql: string) => {
    run: (params?: unknown[] | Record<string, unknown>) => { changes: number };
  };
  close: () => void;
};

const FIELD_LABELS: Record<keyof CompanionData | "createdAt", string> = {
  createdAt: "تاريخ الإرسال",
  fullName: "الاسم الكامل",
  gender: "الجنس",
  age: "العمر",
  stage: "المرحلة",
  educationLevel: "المستوى الدراسي",
  specialty: "التخصص",
  job: "الوظيفة",
  wilaya: "ولاية الإقامة",
  batch: "الدفعة",
  phone: "رقم الهاتف",
  email: "البريد الإلكتروني",
  telegramLink: "رابط حساب تليغرام",
  linkedinLink: "رابط حساب لينكدإن",
  academyJoinDate: "منذ متى وأنت منخرط في الأكاديمية؟",
  previousResponsibilities: "أبرز المسؤوليات أو المهام السابقة",
  academyExperiences: "هل سبق أن",
  leadershipExperience: "أبرز تجربة قيادية أو تنظيمية داخل الأكاديمية",
  acquiredSkills: "أهم المهارات أو الخبرات المكتسبة",
  motivation: "سبب الرغبة في دور المرافق",
  addedValue: "القيمة المضافة للأفراد أو الفرق",
  companionRoleView: "تصور دور المرافق داخل الأكاديمية",
  volunteeringDrive: "دافع الاستمرار في العمل التطوعي والقيادي",
  skills: "تقييم مهارات المرافقة والتوجيه",
  lowCommitmentHandling: "التعامل مع فرد قليل الالتزام",
  weakTeamInteraction: "التعامل مع ضعف تفاعل الفريق",
  teamConflictHandling: "التعامل مع خلاف بين أعضاء الفريق",
  guidanceBalance: "الموازنة بين التوجيه وترك مساحة للتجربة",
  rejectedAdviceHandling: "التصرف عند رفض النصيحة أو التوجيه",
  selectedTeams: "الفرق المرغوب في مرافقتها",
  selectedTeamsReason: "سبب اختيار الفرق",
  qualificationSkills: "الخبرات أو المهارات المؤهلة للمرافقة",
  teamDevelopmentContribution: "المساهمة في تطوير أداء الفريق",
  expectedChallenges: "التحديات المتوقعة وكيفية التعامل معها",
  weeklyHours: "الساعات الأسبوعية للمرافقة والمتابعة",
  meetingMode: "نمط المشاركة في اللقاءات",
  periodicFollowUp: "القدرة على المتابعة الدورية",
  teamEnvironmentVision: "تصور بيئة الفرق داخل الأكاديمية",
  projectIdea: "مشروع أو فكرة للتطوير داخل فضاءات الفاعلية",
  newLeadersRole: "دور المرافق في صناعة قيادات جديدة",
  suitabilityReason: "سبب مناسبة المتقدم لدور المرافق",
  coreValue: "أهم قيمة أو مبدأ يريد نقلها",
  additionalNotes: "ملاحظات أو إضافات أخرى",
};

export async function POST(req: Request) {
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) {
        return NextResponse.json({ ok: false, error: "FORBIDDEN" }, { status: 403 });
      }
    } catch {
      return NextResponse.json({ ok: false, error: "FORBIDDEN" }, { status: 403 });
    }
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";
  const rl = checkRateLimit(`companions:${ip}`, null);
  if (!rl.allowed) {
    return NextResponse.json(
      { ok: false, error: "RATE_LIMITED" },
      { status: 429, headers: { "Retry-After": String(Math.ceil(rl.retryAfterMs / 1000)) } },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "INVALID_JSON" }, { status: 400 });
  }

  const parsed = companionSchema.safeParse(body);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0];
    return NextResponse.json(
      { ok: false, error: "VALIDATION_ERROR", field: firstError.path.join("."), message: firstError.message },
      { status: 400 },
    );
  }

  const createdAt = new Date().toISOString();
  try {
    await appendToGoogleSheets(parsed.data, createdAt);
    return NextResponse.json({ ok: true, storage: "google_sheets" });
  } catch (err) {
    console.error("[companions] Google Sheets failed, falling back to SQLite:", err);
  }

  try {
    await saveToSqlite(parsed.data, createdAt);
    return NextResponse.json({ ok: true, storage: "sqlite_fallback" });
  } catch (err) {
    console.error("[companions] SQLite fallback failed:", err);
    return NextResponse.json({ ok: false, error: "COMPANION_REGISTRATION_FAILED" }, { status: 500 });
  }
}

async function appendToGoogleSheets(data: CompanionData, createdAt: string) {
  const url = process.env.GOOGLE_SHEETS_COMPANIONS_URL;
  if (!url) throw new Error("GOOGLE_SHEETS_COMPANIONS_URL_MISSING");

  const payload: Record<string, unknown> = {};
  const raw: Record<keyof CompanionData | "createdAt", unknown> = {
    ...data,
    createdAt,
    academyExperiences: data.academyExperiences.join("، "),
    selectedTeams: data.selectedTeams.join("، "),
    skills: JSON.stringify(data.skills),
  };

  for (const [key, value] of Object.entries(raw)) {
    payload[FIELD_LABELS[key as keyof typeof FIELD_LABELS] ?? key] = value;
  }

  const res = await fetch(url, {
    method: "POST",
    redirect: "follow",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });

  const json = (await res.json()) as { ok?: boolean; error?: string };
  if (!json.ok) throw new Error(`GOOGLE_SHEETS_FAILED: ${json.error ?? res.status}`);
}

async function saveToSqlite(data: CompanionData, createdAt: string) {
  const dbPath =
    process.env.SQLITE_DB_PATH ??
    path.join(process.cwd(), ".data", "registrations.sqlite");

  fs.mkdirSync(path.dirname(dbPath), { recursive: true });

  const mod = (await import("better-sqlite3")) as unknown as {
    default: new (p: string) => BetterSqlite3Database;
  };
  const db = new mod.default(dbPath);
  try {
    db.exec(`
      CREATE TABLE IF NOT EXISTS companion_registrations (
        id            INTEGER PRIMARY KEY AUTOINCREMENT,
        createdAt     TEXT NOT NULL,
        fullName      TEXT NOT NULL,
        email         TEXT NOT NULL,
        phone         TEXT NOT NULL,
        wilaya        TEXT NOT NULL,
        batch         TEXT,
        selectedTeams TEXT,
        formData      TEXT NOT NULL
      );
    `);

    const stmt = db.prepare(
      `INSERT INTO companion_registrations
        (createdAt, fullName, email, phone, wilaya, batch, selectedTeams, formData)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    );
    stmt.run([
      createdAt,
      data.fullName,
      data.email,
      data.phone,
      data.wilaya,
      data.batch,
      JSON.stringify(data.selectedTeams),
      JSON.stringify(data),
    ]);
  } finally {
    db.close();
  }
}
