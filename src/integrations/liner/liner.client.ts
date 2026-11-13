//фабрика HTTP-клиента Axios. Использует базовый адрес Liner API из конфигурации,
// допускает его явную передачу и проверяет наличие адреса перед созданием клиента

import axios from "axios";
import type { AxiosInstance } from "axios";

import { env } from "../../config/env.js";

export function createLinerClient(baseURL: string = env.linerApiBaseUrl): AxiosInstance {
  if (baseURL.trim() === "") {
    throw new Error("LINER_API_BASE_URL must be configured");
  }

  return axios.create({
    baseURL,
  });
}
