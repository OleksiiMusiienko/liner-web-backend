//фабрика Axios-клиента для отдельного микросервиса каталога Liner
import axios from "axios";
import type { AxiosInstance } from "axios";

import { env } from "../../config/env.js";

export function createCatalogClient(): AxiosInstance {
  if (!env.linerCatalogApiBaseUrl || !env.linerCatalogApiKey) {
    throw new Error("Catalog Service URL and API key must be configured");
  }

  return axios.create({
    baseURL: env.linerCatalogApiBaseUrl,
    headers: {
      Authorization: `Bearer ${env.linerCatalogApiKey}`,
    },
  });
}
