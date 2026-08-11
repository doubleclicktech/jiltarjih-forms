import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimit } from "@/lib/rate-limit";

const SUBJECTS = [
  "استفسار عام",
  "الانضمام إلى الأكاديمية",
  "شراكة أو تعاون",
  "الإعلام والصحافة",
  "مشكلة تقنية",
  "أخرى",
] as const;

const contactSchema = z.object({
  fullName: z.string().min(2, "الاسم الكامل مطلوب").max(120),
  email: z.string().email("البريد الإلكتروني غير صالح").max(160),
  phone: z
    .string()
    .max(20)
    .optional()
    .default("")
    .refine((v) => v === "" || /^0[567]\d{8}$/.test(v), "رقم الهاتف غير صالح (مثال: 0551234567)"),
  subject: z.enum(SUBJECTS, { message: "يرجى اختيار موضوع الرسالة" }),
  message: z.string().min(10, "يرجى كتابة رسالة أكثر تفصيلاً (10 أحرف على الأقل)").max(4000),
});

type ContactData = z.infer<typeof contactSchema>;

type BetterSqlite3Database = {
  exec: (sql: string) => void;
  prepare: (sql: string) => {
    run: (params?: unknown[] | Record<string, unknown>) => { changes: number };
  };
  close: () => void;
};

const FIELD_LABELS: Record<keyof ContactData | "createdAt", string> = {
  createdAt: "تاريخ الإرسال",
  fullName: "الاسم الكامل",
  email: "البريد الإلكتروني",
  phone: "رقم الهاتف",
  subject: "موضوع الرسالة",
  message: "نص الرسالة",
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
  const rl = checkRateLimit(`contact:${ip}`, null);
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

  const parsed = contactSchema.safeParse(body);
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
    console.error("[contact] Google Sheets failed, falling back to SQLite:", err);
  }

  try {
    await saveToSqlite(parsed.data, createdAt);
    return NextResponse.json({ ok: true, storage: "sqlite_fallback" });
  } catch (err) {
    console.error("[contact] SQLite fallback failed:", err);
    return NextResponse.json({ ok: false, error: "CONTACT_MESSAGE_FAILED" }, { status: 500 });
  }
}

async function appendToGoogleSheets(data: ContactData, createdAt: string) {
  const url = process.env.GOOGLE_SHEETS_CONTACT_URL;
  if (!url) throw new Error("GOOGLE_SHEETS_CONTACT_URL_MISSING");

  const raw: Record<keyof ContactData | "createdAt", unknown> = { ...data, createdAt };

  const payload: Record<string, unknown> = {};
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

async function saveToSqlite(data: ContactData, createdAt: string) {
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
      CREATE TABLE IF NOT EXISTS contact_messages (
        id        INTEGER PRIMARY KEY AUTOINCREMENT,
        createdAt TEXT NOT NULL,
        fullName  TEXT NOT NULL,
        email     TEXT NOT NULL,
        phone     TEXT,
        subject   TEXT NOT NULL,
        message   TEXT NOT NULL
      );
    `);

    const stmt = db.prepare(
      `INSERT INTO contact_messages
        (createdAt, fullName, email, phone, subject, message)
       VALUES (?, ?, ?, ?, ?, ?)`,
    );
    stmt.run([createdAt, data.fullName, data.email, data.phone, data.subject, data.message]);
  } finally {
    db.close();
  }
}
