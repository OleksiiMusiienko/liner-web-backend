
import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
} from "vitest";

import { buildApp } from "../../src/app.js";
import { AppError } from "../../src/shared/errors/app-error.js";
import { Writable } from "node:stream";

let app: ReturnType<typeof buildApp>;

beforeEach(() => {
  app = buildApp();
});

afterEach(async () => {
  await app.close();
});

describe("Error Handler", () => {
  it("returns 400 for AppError", async () => {
    app.get("/test/app-error", async () => {
      throw new AppError(
        "Invalid request",
        400,
        "INVALID_REQUEST",
      );
    });

    const response = await app.inject({
      method: "GET",
      url: "/test/app-error",
    });

    expect(response.statusCode).toBe(400);

    expect(response.json()).toEqual({
      statusCode: 400,
      code: "INVALID_REQUEST",
      message: "Invalid request",
    });
  });

  it("returns safe 500 for unexpected errors", async () => {
    app.get("/test/internal-error", async () => {
      throw new Error("Internal failure details");
    });

    const response = await app.inject({
      method: "GET",
      url: "/test/internal-error",
    });

    expect(response.statusCode).toBe(500);

    expect(response.json()).toEqual({
      statusCode: 500,
      code: "INTERNAL_SERVER_ERROR",
      message: "Internal Server Error",
    });
  });
  
it("logs unexpected errors with Pino", async () => {
  const logLines: string[] = [];

  const stream = new Writable({
    write(chunk, _encoding, callback) {
      logLines.push(chunk.toString());
      callback();
    },
  });

  const loggingApp = buildApp({
    logger: {
      level: "info",
      stream,
    },
  });

  try {
    loggingApp.get("/test/logged-error", async () => {
      throw new Error("Private diagnostic details");
    });

    const response = await loggingApp.inject({
      method: "GET",
      url: "/test/logged-error",
    });

    expect(response.statusCode).toBe(500);

    const events = logLines
      .join("")
      .trim()
      .split("\n")
      .map((line) => JSON.parse(line));

    expect(events).toContainEqual(
      expect.objectContaining({
        level: 50,
        msg: "Unhandled server error",
        err: expect.objectContaining({
          message: "Private diagnostic details",
        }),
      }),
    );
  } finally {
    await loggingApp.close();
  }
});

});
