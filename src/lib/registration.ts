import type { FullRegistrationFormData } from "@/types";
import { appendRegistrationToGoogleSheets } from "@/lib/google-sheets";
import { saveRegistrationToSqlite } from "@/lib/sqlite";

export async function register(data: FullRegistrationFormData) {
  const createdAt = new Date().toISOString();
  const registrationType = data.registrationType;

  try {
    await appendRegistrationToGoogleSheets({ data, createdAt, registrationType });
    return { ok: true as const, storage: "google_sheets" as const };
  } catch (err) {
    console.error(`[registration] Google Sheets (${registrationType}) failed, falling back to SQLite:`, err);
  }

  try {
    await saveRegistrationToSqlite({ data, createdAt, registrationType });
    return { ok: true as const, storage: "sqlite_fallback" as const };
  } catch {
    return { ok: false as const, error: "REGISTRATION_FAILED" as const };
  }
}
