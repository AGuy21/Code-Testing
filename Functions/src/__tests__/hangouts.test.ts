import { distanceKm, formatDistance, formatStartsAt } from "../utils/hangouts";

describe("distanceKm", () => {
  it("is zero for the same point", () => {
    expect(distanceKm({ latitude: 1, longitude: 2 }, { latitude: 1, longitude: 2 })).toBeCloseTo(0);
  });
  it("matches a known distance (NYC → LA ≈ 3936 km)", () => {
    const d = distanceKm(
      { latitude: 40.7128, longitude: -74.006 },
      { latitude: 34.0522, longitude: -118.2437 },
    );
    expect(d).toBeGreaterThan(3900);
    expect(d).toBeLessThan(3970);
  });
});

describe("formatDistance", () => {
  it("uses metres under 1 km and never shows 0 m", () => {
    expect(formatDistance(0.4)).toBe("400 m");
    expect(formatDistance(0.001)).toBe("100 m");
  });
  it("uses km otherwise", () => {
    expect(formatDistance(2.34)).toBe("2.3 km");
    expect(formatDistance(42.6)).toBe("43 km");
  });
});

describe("formatStartsAt", () => {
  it("labels today and tomorrow", () => {
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 3600 * 1000);
    expect(formatStartsAt(now.toISOString())).toMatch(/^Today · /);
    expect(formatStartsAt(tomorrow.toISOString())).toMatch(/^Tomorrow · /);
  });
});
