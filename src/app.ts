
import Fastify from "fastify";
import type { FastifyInstance, FastifyServerOptions } from "fastify";
import { fastifyAwilixPlugin } from "@fastify/awilix";
import { createDependencyContainer } from "./composition/container.js";

import { healthRoutes } from "./routes/health.routes.js";
import { errorHandler } from "./shared/errors/error-handler.js";
import { registerCors } from "./plugins/cors.js";
import databasePlugin from "./plugins/database.plugin.js";
import { asValue } from "awilix";

import { registerDependencies } from "./composition/registrations.js";

interface AppConfig {
  enableDatabase?: boolean;
  database?: FastifyInstance["db"];
}

export function buildApp(
  options: FastifyServerOptions = {},
  config: AppConfig = {},
): FastifyInstance {
  const app = Fastify(options);
  const container = createDependencyContainer();
  registerDependencies(container);
  app.setErrorHandler(errorHandler);
  registerCors(app);

  if (config.database) {
    app.decorate("db", config.database);
  } else if (config.enableDatabase) {
    app.register(databasePlugin);
  }

  app.register(fastifyAwilixPlugin, {
    container,
    disposeOnClose: true,
    disposeOnResponse: true,
  });

  app.addHook("onReady", async () => {
    if (app.hasDecorator("db")) {
      container.register({
        db: asValue(app.db),
      });
    }
  });

  app.register(healthRoutes);

  return app;
}
