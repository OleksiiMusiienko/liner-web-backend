
//тест для Axios-клиента, не обращаясь к реальному Liner API.

import { describe, it, expect } from "vitest";

import { createLinerClient } from "../../../../src/integrations/liner/liner.client.js";

describe("Liner HTTP Client", () => {
  it("creates Axios client with configured baseURL", () => {
    const client = createLinerClient(
      "https://liner.example.test",
    );

    expect(client.defaults.baseURL).toBe(
      "https://liner.example.test",
    );
  });

  it("rejects empty baseURL", () => {
    expect(() => createLinerClient("")).toThrow(
      "LINER_API_BASE_URL must be configured",
    );
  });
});
