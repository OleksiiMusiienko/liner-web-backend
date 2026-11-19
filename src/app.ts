
import Fastify from "fastify";
import type { FastifyInstance, FastifyServerOptions } from "fastify";

import { healthRoutes } from "./routes/health.routes.js";
import { errorHandler } from "./shared/errors/error-handler.js";
import { registerCors } from "./plugins/cors.js";
import databasePlugin from "./plugins/database.plugin.js";

interface AppConfig {
  enableDatabase?: boolean;
}

export function buildApp(
  options: FastifyServerOptions = {},
  config: AppConfig = {},
): FastifyInstance {
  const app = Fastify(options);

  app.setErrorHandler(errorHandler);
  registerCors(app);

  if (config.enableDatabase) {
    app.register(databasePlugin);
  }

  app.register(healthRoutes);

  return app;
}
