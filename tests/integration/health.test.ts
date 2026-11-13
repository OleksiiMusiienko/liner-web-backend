import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { buildApp } from "../../src/app.js";

let app: ReturnType<typeof buildApp>;

beforeEach(() => {
  app = buildApp();
});

afterEach(async () => {
  await app.close();
});

describe("Fastify HTTP routes", () => {
  it("GET /health returns 200 and status ok", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/health",
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ status: "ok" });
  });

  it("GET /test returns 404 for unknown route", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/test",
    });

    expect(response.statusCode).toBe(404);
    expect(response.json().error).toBe("Not Found");
  });
});
