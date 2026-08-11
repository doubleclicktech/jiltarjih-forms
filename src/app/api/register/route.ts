import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { registrationSchema } from "@/lib/schemas";
import { register } from "@/lib/registration";
import { checkRateLimit } from "@/lib/rate-limit";

const CLIENT_ID_COOKIE = "rl_id";
const CLIENT_ID_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

export async function POST(req: NextRequest) {
  const existingClientId = req.cookies.get(CLIENT_ID_COOKIE)?.value ?? null;
  const clientId = existingClientId ?? randomUUID();

  function respond(body: unknown, init?: ResponseInit) {
    const res = NextResponse.json(body, init);
    if (!existingClientId) {
      res.cookies.set(CLIENT_ID_COOKIE, clientId, {
        maxAge: CLIENT_ID_MAX_AGE,
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
      });
    }
    return res;
  }

  // Fix #5 – CSRF: reject requests whose Origin doesn't match this server's host
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin && host) {
    try {
      const originHost = new URL(origin).host;
      if (originHost !== host) {
        return respond({ ok: false, error: "FORBIDDEN" }, { status: 403 });
      }
    } catch {
      return respond({ ok: false, error: "FORBIDDEN" }, { status: 403 });
    }
  }

  // Fix #4 – Rate limit: 5 submissions per browser per hour, 30 per IP per hour
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";
  const rl = checkRateLimit(ip, clientId);
  if (!rl.allowed) {
    return respond(
      { ok: false, error: "RATE_LIMITED" },
      {
        status: 429,
        headers: { "Retry-After": String(Math.ceil(rl.retryAfterMs / 1000)) },
      }
    );
  }

  // Parse JSON
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return respond({ ok: false, error: "INVALID_JSON" }, { status: 400 });
  }

  // Fix #2 + #3 – Validate with Zod schema (replaces unsafe cast + loose checks)
  const parsed = registrationSchema.safeParse(body);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0];
    return respond(
      { ok: false, error: "VALIDATION_ERROR", field: firstError.path.join("."), message: firstError.message },
      { status: 400 }
    );
  }

  const result = await register(parsed.data);
  if (!result.ok) {
    return respond(result, { status: 500 });
  }
  return respond(result);
}
