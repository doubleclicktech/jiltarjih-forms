import type { FullRegistrationFormData } from "@/types";

export async function appendRegistrationToGoogleSheets(input: {
  data: FullRegistrationFormData;
  createdAt: string;
}) {
  const url = process.env.GOOGLE_SHEETS_WEBAPP_URL;
  if (!url) {
    throw new Error("GOOGLE_SHEETS_WEBAPP_URL_MISSING");
  }

  const payload: Record<string, unknown> = {
    ...input.data,
    createdAt: input.createdAt,
    // Serialize arrays and nested objects to strings for the sheet
    activityTypes: input.data.activityTypes.join(", "),
    possessedSkills: input.data.possessedSkills.join(", "),
    selectedTeams: input.data.selectedTeams.join(", "),
    teamAnswers: JSON.stringify(input.data.teamAnswers),
  };

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
