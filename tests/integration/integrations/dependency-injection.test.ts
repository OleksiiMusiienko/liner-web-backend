
import { afterEach, describe, expect, it } from "vitest";
import type { FastifyInstance } from "fastify";

import { buildApp } from "../../../src/app.js";

describe("Dependency Injection", () => {
  const apps: FastifyInstance[] = [];

  afterEach(async () => {
    await Promise.all(apps.map((app) => app.close()));
    apps.length = 0;
  });

  it("provides Awilix container to Fastify", async () => {
    const app = buildApp({}, { enableDatabase: false });
    apps.push(app);

    await app.ready();

    expect(app.diContainer).toBeDefined();
  });

  it("creates an independent container for each application", async () => {
    const firstApp = buildApp({}, { enableDatabase: false });
    const secondApp = buildApp({}, { enableDatabase: false });

    apps.push(firstApp, secondApp);

    await Promise.all([firstApp.ready(), secondApp.ready()]);

    expect(firstApp.diContainer).not.toBe(secondApp.diContainer);
  });

  it("works without a database connection", async () => {
    const app = buildApp({}, { enableDatabase: false });
    apps.push(app);

    const response = await app.inject({
      method: "GET",
      url: "/health",
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ status: "ok" });
  });

  it("injects the existing database instance into Awilix", async () => {
    const mockDb = {} as FastifyInstance["db"];

    const app = buildApp({}, { database: mockDb });
    apps.push(app);

    await app.ready();

    expect(app.hasDecorator("db")).toBe(true);
    expect(app.db).toBe(mockDb);

    const resolvedDb =
      app.diContainer.resolve<FastifyInstance["db"]>("db");

    expect(resolvedDb).toBe(mockDb);
  });

});
