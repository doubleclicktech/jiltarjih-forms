import { describe, it, expect, beforeEach, vi } from "vitest";

// Re-import after clearing module cache so each test group gets a fresh map
async function freshRateLimit() {
  vi.resetModules();
  const mod = await import("./rate-limit");
  return mod.checkRateLimit;
}

describe("checkRateLimit", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("allows the first request for a new client", async () => {
    const checkRateLimit = await freshRateLimit();
    const result = checkRateLimit("1.2.3.4", "client-a");
    expect(result.allowed).toBe(true);
  });

  it("allows up to the configured per-client limit", async () => {
    const checkRateLimit = await freshRateLimit();
    const ip = "10.0.0.1";
    const clientId = "client-b";
    // First 5 requests should all be allowed
    for (let i = 0; i < 5; i++) {
      expect(checkRateLimit(ip, clientId).allowed).toBe(true);
    }
  });

  it("blocks the client after exceeding the per-client limit", async () => {
    const checkRateLimit = await freshRateLimit();
    const ip = "10.0.0.2";
    const clientId = "client-c";
    for (let i = 0; i < 5; i++) checkRateLimit(ip, clientId);
    const result = checkRateLimit(ip, clientId);
    expect(result.allowed).toBe(false);
    expect(result.retryAfterMs).toBeGreaterThan(0);
  });

  it("tracks different clients independently", async () => {
    const checkRateLimit = await freshRateLimit();
    // Exhaust client A
    for (let i = 0; i < 5; i++) checkRateLimit("192.168.1.1", "client-d");
    expect(checkRateLimit("192.168.1.1", "client-d").allowed).toBe(false);
    // Client B should still be allowed, even on the same IP
    expect(checkRateLimit("192.168.1.1", "client-e").allowed).toBe(true);
  });

  it("does not let unrelated users sharing one CGNAT/VPN IP block each other out", async () => {
    const checkRateLimit = await freshRateLimit();
    const sharedIp = "203.0.113.5";
    // Client X exhausts its own 5/hour budget
    for (let i = 0; i < 5; i++) checkRateLimit(sharedIp, "client-x");
    expect(checkRateLimit(sharedIp, "client-x").allowed).toBe(false);
    // A completely different visitor behind the same shared IP is unaffected
    expect(checkRateLimit(sharedIp, "client-y").allowed).toBe(true);
  });

  it("still caps abuse from a single IP once enough distinct clients pile up", async () => {
    const checkRateLimit = await freshRateLimit();
    const sharedIp = "203.0.113.9";
    // 30 distinct clients, one request each, should all be allowed (per-IP cap is 30)
    for (let i = 0; i < 30; i++) {
      expect(checkRateLimit(sharedIp, `client-${i}`).allowed).toBe(true);
    }
    // The 31st distinct client on the same IP hits the per-IP backstop
    const result = checkRateLimit(sharedIp, "client-31");
    expect(result.allowed).toBe(false);
    expect(result.retryAfterMs).toBeGreaterThan(0);
  });

  it("does not globally throttle when IP is unresolved (\"unknown\")", async () => {
    const checkRateLimit = await freshRateLimit();
    // Many distinct clients all reporting as "unknown" IP should each get
    // their own per-client budget rather than sharing one IP-tier bucket.
    for (let i = 0; i < 40; i++) {
      expect(checkRateLimit("unknown", `client-unknown-${i}`).allowed).toBe(true);
    }
  });

  it("falls back to allowing the request when no client id is available", async () => {
    const checkRateLimit = await freshRateLimit();
    // Cookies blocked / no client id yet — should not be blocked by the
    // (unrelated) per-client tier; still subject to the per-IP tier.
    const result = checkRateLimit("198.51.100.1", null);
    expect(result.allowed).toBe(true);
  });
});
