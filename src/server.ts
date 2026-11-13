import { buildApp } from "./app.js";
import { env } from "./config/env.js";

const app = buildApp({
  logger: true,
});

async function startServer() {
  try {
    await app.listen({
      port: env.port,
      host: env.host,
    });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

void startServer();
