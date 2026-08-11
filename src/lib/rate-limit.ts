// In-memory rate limiter — works for single-process deployments.
// For multi-instance (e.g. Vercel with many serverless instances), replace
// the store with Redis via @upstash/ratelimit.
//
// Two tiers, keyed differently, so that unrelated users sharing one public
// IP (mobile carrier CGNAT, office/campus NAT, corporate proxy, etc.) don't
// get bucketed together and block each other out:
//   - per-client tier: keyed by an anonymous per-browser id (cookie).
//     This is the real "one visitor" limit.
//   - per-IP tier: a much looser backstop, purely to slow down a single
//     source hammering the endpoint (e.g. clearing cookies to bypass the
//     client tier). It should essentially never trigger for genuine
//     distinct users behind a shared IP.
// A missing/unresolvable IP (falls back to "unknown") is intentionally
// exempt from the IP tier — treating it as one shared bucket would throttle
// the entire site instead of a single source.

const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_PER_CLIENT = 5;
const MAX_PER_IP = 30;

type Entry = { count: number; resetAt: number };

const clientStore = new Map<string, Entry>();
const ipStore = new Map<string, Entry>();

function check(store: Map<string, Entry>, key: string, max: number, now: number) {
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfterMs: 0 };
  }

  if (entry.count >= max) {
    return { allowed: false, retryAfterMs: entry.resetAt - now };
  }

  entry.count += 1;
  return { allowed: true, retryAfterMs: 0 };
}

export function checkRateLimit(
  ip: string,
  clientId: string | null,
): { allowed: boolean; retryAfterMs: number } {
  const now = Date.now();

  if (ip !== "unknown") {
    const ipResult = check(ipStore, ip, MAX_PER_IP, now);
    if (!ipResult.allowed) return ipResult;
  }

  if (clientId) {
    return check(clientStore, clientId, MAX_PER_CLIENT, now);
  }

  // No client id available (e.g. cookies blocked) — fall back to the IP
  // tier's result, which is already looser and IP-exempt-safe above.
  return { allowed: true, retryAfterMs: 0 };
}
