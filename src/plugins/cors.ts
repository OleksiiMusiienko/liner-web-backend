//настройка политики CORS для браузерных запросов к Backend.
import cors from "@fastify/cors";
import type { FastifyInstance } from "fastify";

import { env } from "../config/env.js";

export function registerCors(app: FastifyInstance): void {
  if (env.corsOrigin === "") {
    return;
  }

  app.register(cors, {
    origin: env.corsOrigin,
  });
}
