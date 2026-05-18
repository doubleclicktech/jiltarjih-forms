import type { FullRegistrationFormData } from "@/types";
import { appendRegistrationToGoogleSheets } from "@/lib/google-sheets";
import { saveRegistrationToSqlite } from "@/lib/sqlite";

export async function register(data: FullRegistrationFormData) {
  const createdAt = new Date().toISOString();

  try {
    await appendRegistrationToGoogleSheets({ data, createdAt });
    return { ok: true as const, storage: "google_sheets" as const };
  } catch (err) {
    console.error("[registration] Google Sheets failed, falling back to SQLite:", err);
  }

  try {
    await saveRegistrationToSqlite({ data, createdAt });
    return { ok: true as const, storage: "sqlite_fallback" as const };
  } catch {
    return { ok: false as const, error: "REGISTRATION_FAILED" as const };
  }
}
