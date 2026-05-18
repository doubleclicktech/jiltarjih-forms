import fs from "node:fs";
import path from "node:path";
import type { FullRegistrationFormData } from "@/types";

type BetterSqlite3Database = {
  exec: (sql: string) => void;
  prepare: (sql: string) => {
    run: (params?: unknown[] | Record<string, unknown>) => { changes: number };
  };
  close: () => void;
};

async function openDb(dbPath: string): Promise<BetterSqlite3Database> {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const mod = (await import("better-sqlite3")) as unknown as {
    default: new (p: string) => BetterSqlite3Database;
  };
  return new mod.default(dbPath);
}

export async function saveRegistrationToSqlite(input: {
  data: FullRegistrationFormData;
  createdAt: string;
}) {
  const dbPath =
    process.env.SQLITE_DB_PATH ??
    path.join(process.cwd(), ".data", "registrations.sqlite");

  fs.mkdirSync(path.dirname(dbPath), { recursive: true });

  const db = await openDb(dbPath);
  try {
    db.exec(`
      CREATE TABLE IF NOT EXISTS registrations (
        id          INTEGER PRIMARY KEY AUTOINCREMENT,
        createdAt   TEXT NOT NULL,
        fullName    TEXT NOT NULL,
        email       TEXT NOT NULL,
        phone       TEXT NOT NULL,
        wilaya      TEXT NOT NULL,
        age         TEXT,
        selectedTeams TEXT,
        formData    TEXT NOT NULL
      );
    `);

    const stmt = db.prepare(
      `INSERT INTO registrations
        (createdAt, fullName, email, phone, wilaya, age, selectedTeams, formData)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    );

    stmt.run([
      input.createdAt,
      input.data.fullName,
      input.data.email,
      input.data.phone,
      input.data.wilaya,
      input.data.age ?? null,
      JSON.stringify(input.data.selectedTeams ?? []),
      JSON.stringify(input.data),
    ]);
  } finally {
    db.close();
  }
}
