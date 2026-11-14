import axios from "axios";
import type { AxiosInstance } from "axios";

import { env } from "../../config/env.js";

export function createLyricsClient(): AxiosInstance {
  if (!env.linerLyricsApiBaseUrl || !env.linerLyricsApiKey) {
    throw new Error("Lyrics Service URL and API key must be configured");
  }

  return axios.create({
    baseURL: env.linerLyricsApiBaseUrl,
    headers: {
      Authorization: `Bearer ${env.linerLyricsApiKey}`,
    },
  });
}
