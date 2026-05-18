import { NextResponse } from "next/server";
import { registrationSchema } from "@/lib/schemas";
import { register } from "@/lib/registration";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  // Fix #5 – CSRF: reject requests whose Origin doesn't match this server's host
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin && host) {
    try {
      const originHost = new URL(origin).host;
      if (originHost !== host) {
        return NextResponse.json({ ok: false, error: "FORBIDDEN" }, { status: 403 });
      }
    } catch {
      return NextResponse.json({ ok: false, error: "FORBIDDEN" }, { status: 403 });
    }
  }

  // Fix #4 – Rate limit: 5 submissions per IP per hour
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";
  const rl = checkRateLimit(ip);
  if (!rl.allowed) {
    return NextResponse.json(
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
    return NextResponse.json({ ok: false, error: "INVALID_JSON" }, { status: 400 });
  }

  // Fix #2 + #3 – Validate with Zod schema (replaces unsafe cast + loose checks)
  const parsed = registrationSchema.safeParse(body);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0];
    return NextResponse.json(
      { ok: false, error: "VALIDATION_ERROR", field: firstError.path.join("."), message: firstError.message },
      { status: 400 }
    );
  }

  const result = await register(parsed.data);
  if (!result.ok) {
    return NextResponse.json(result, { status: 500 });
  }
  return NextResponse.json(result);
}
