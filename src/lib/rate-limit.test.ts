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

  it("allows the first request for a new IP", async () => {
    const checkRateLimit = await freshRateLimit();
    const result = checkRateLimit("1.2.3.4");
    expect(result.allowed).toBe(true);
  });

  it("allows up to the configured limit", async () => {
    const checkRateLimit = await freshRateLimit();
    const ip = "10.0.0.1";
    // First 5 requests should all be allowed
    for (let i = 0; i < 5; i++) {
      expect(checkRateLimit(ip).allowed).toBe(true);
    }
  });

  it("blocks the request after exceeding the limit", async () => {
    const checkRateLimit = await freshRateLimit();
    const ip = "10.0.0.2";
    for (let i = 0; i < 5; i++) checkRateLimit(ip);
    const result = checkRateLimit(ip);
    expect(result.allowed).toBe(false);
    expect(result.retryAfterMs).toBeGreaterThan(0);
  });

  it("tracks different IPs independently", async () => {
    const checkRateLimit = await freshRateLimit();
    // Exhaust IP A
    for (let i = 0; i < 5; i++) checkRateLimit("192.168.1.1");
    expect(checkRateLimit("192.168.1.1").allowed).toBe(false);
    // IP B should still be allowed
    expect(checkRateLimit("192.168.1.2").allowed).toBe(true);
  });
});
