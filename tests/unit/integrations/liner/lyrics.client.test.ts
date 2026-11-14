import { describe, expect, it, vi } from "vitest";

import { createLyricsClient } from "../../../../src/integrations/liner/lyrics.client.js";

const mockEnv = vi.hoisted(() => ({
  linerLyricsApiBaseUrl: "https://lyrics.example.test",
  linerLyricsApiKey: "test-lyrics-key",
}));

vi.mock("../../../../src/config/env.js", () => ({
  env: mockEnv,
}));

describe("Lyrics Client", () => {
  it("creates Axios client with Lyrics URL and API key", () => {
    const client = createLyricsClient();

    expect(client.defaults.baseURL).toBe("https://lyrics.example.test");
    expect(client.defaults.headers.Authorization).toBe("Bearer test-lyrics-key");
  });

  it("rejects missing API key", () => {
    mockEnv.linerLyricsApiKey = "";

    try {
      expect(() => createLyricsClient()).toThrow(
        "Lyrics Service URL and API key must be configured",
      );
    } finally {
      mockEnv.linerLyricsApiKey = "test-lyrics-key";
    }
  });
});
