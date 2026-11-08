
import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  vi,
} from "vitest";

beforeEach(() => {
  vi.stubEnv("CORS_ORIGIN", "http://localhost:5173");
  vi.resetModules();
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("CORS", () => {
  it("allows the configured frontend origin", async () => {
    const { buildApp } = await import("../../src/app.js");
    const app = buildApp();

    try {
      const response = await app.inject({
        method: "GET",
        url: "/health",
        headers: {
          origin: "http://localhost:5173",
        },
      });

      expect(response.statusCode).toBe(200);
      expect(
        response.headers["access-control-allow-origin"],
      ).toBe("http://localhost:5173");
    } finally {
      await app.close();
    }
  });

  it("does not allow another browser origin", async () => {
    const { buildApp } = await import("../../src/app.js");
    const app = buildApp();

    try {
      const response = await app.inject({
        method: "GET",
        url: "/health",
        headers: {
          origin: "http://localhost:9999",
        },
      });

      expect(response.statusCode).toBe(200);
      expect(
        response.headers["access-control-allow-origin"],
      ).toBe("http://localhost:5173");
    } finally {
      await app.close();
    }
  });
});
