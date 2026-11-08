import Fastify from "fastify";
import type { FastifyInstance, FastifyServerOptions } from "fastify";

import { healthRoutes } from "./modules/health/health.routes.js";
import { errorHandler } from "./shared/errors/error-handler.js";
import { registerCors } from "./plugins/cors.js";

export function buildApp(
  options: FastifyServerOptions = {},
): FastifyInstance {
  const app = Fastify(options);
  
  app.setErrorHandler(errorHandler);
  registerCors(app);
  app.register(healthRoutes);

  return app;
}