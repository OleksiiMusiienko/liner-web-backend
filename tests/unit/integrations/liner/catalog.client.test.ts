//модульный тест фабрики Axios-клиента каталога. Проверяет конфигурацию HTTP-клиента без сетевых запросов.

import { describe, expect, it, vi } from "vitest";
import { createCatalogClient } from "../../../../src/integrations/liner/catalog.client.js";

vi.mock("../../../../src/config/env.js", () => ({
  env: {
    linerCatalogApiBaseUrl: "https://catalog.example.test",
    linerCatalogApiKey: "test-api-key",
  },
}));

describe("Catalog Client", () => {
  it("creates Axios client with Catalog URL and API key", () => {
    const client = createCatalogClient();

    expect(client.defaults.baseURL).toBe("https://catalog.example.test");
    expect(client.defaults.headers.Authorization).toBe("Bearer test-api-key");
  });
});
