//проверяет валидацию входящих HTTP-запросов в Fastify.
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import type { FastifyRequest } from "fastify";

import { buildApp } from "../../src/app.js";

const requestHandler = vi.fn(async (_request: FastifyRequest) => ({
  status: "ok",
}));

let app: ReturnType<typeof buildApp>;

beforeEach(() => {
  requestHandler.mockClear();
  app = buildApp();

  app.post(
    "/test/validation",
    {
      schema: {
        body: {
          type: "object",
          required: ["name"],
          properties: {
            name: {
              type: "string",
              minLength: 1,
              pattern: "\\S",
            },
          },
        },
      },
    },
    requestHandler,
  );
});

afterEach(async () => {
  await app.close();
});

describe("Request validation", () => {
  it("rejects invalid request body", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/test/validation",
      payload: {},
    });

    expect(response.statusCode).toBe(400);
    expect(requestHandler).not.toHaveBeenCalled();
  });

  it("accepts valid request body", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/test/validation",
      payload: {
        name: "Alex",
      },
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({
      status: "ok",
    });
    expect(requestHandler).toHaveBeenCalledOnce();
  });

  it.each([
    {
      case: "empty string",
      body: { name: "" },
    },
    {
      case: "null value",
      body: { name: null },
    },
    {
      case: "array instead of string",
      body: { name: [] },
    },
    {
      case: "object instead of string",
      body: { name: {} },
    },
  ])("rejects $case", async ({ body }) => {
    const response = await app.inject({
      method: "POST",
      url: "/test/validation",
      payload: body,
    });

    expect(response.statusCode).toBe(400);
  });

  it("rejects malformed JSON", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/test/validation",
      headers: {
        "content-type": "application/json",
      },
      payload: '{"name":',
    });

    expect(response.statusCode).toBe(400);
    expect(requestHandler).not.toHaveBeenCalled();
  });

  it("rejects whitespace-only name", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/test/validation",
      payload: {
        name: "   ",
      },
    });

    expect(response.statusCode).toBe(400);
    expect(requestHandler).not.toHaveBeenCalled();
  });

  it("converts numeric name to string", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/test/validation",
      payload: {
        name: 123,
      },
    });

    expect(response.statusCode).toBe(200);
    expect(requestHandler).toHaveBeenCalledOnce();

    const receivedBody = requestHandler.mock.calls[0]?.[0].body;

    expect(receivedBody).toEqual({
      name: "123",
    });
  });
});
