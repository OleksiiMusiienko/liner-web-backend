import Fastify from "fastify";
import type { FastifyInstance, FastifyServerOptions } from "fastify";

import { healthRoutes } from "./modules/health/health.routes.js";

export function buildApp(
  options: FastifyServerOptions = {},
): FastifyInstance {
  const app = Fastify(options);

  app.register(healthRoutes);

  return app;
}