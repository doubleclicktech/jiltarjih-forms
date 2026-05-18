// In-memory rate limiter — works for single-process deployments.
// For multi-instance (e.g. Vercel with many serverless instances), replace
// the store with Redis via @upstash/ratelimit.

const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 5;

type Entry = { count: number; resetAt: number };

const store = new Map<string, Entry>();

export function checkRateLimit(ip: string): { allowed: boolean; retryAfterMs: number } {
  const now = Date.now();
  const entry = store.get(ip);

  if (!entry || now > entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfterMs: 0 };
  }

  if (entry.count >= MAX_REQUESTS) {
    return { allowed: false, retryAfterMs: entry.resetAt - now };
  }

  entry.count += 1;
  return { allowed: true, retryAfterMs: 0 };
}
