//нужен для того, чтобы подключить нашу базу Neon PostgreSQL к серверу Fastify 
// и сделать Drizzle ORM доступным внутри обработчиков HTTP-запросов.
import fp from "fastify-plugin";
import type { FastifyPluginAsync } from "fastify";

import { createDatabase } from "../db/postgres.connection.js";

declare module "fastify" {
  interface FastifyInstance {
    db: ReturnType<typeof createDatabase>["db"];
  }
}

const databasePlugin: FastifyPluginAsync = async (app) => {
  const { db, sql } = createDatabase();

  app.decorate("db", db);

  app.addHook("onClose", async () => {
    await sql.end();
  });
};

export default fp(databasePlugin, {
  name: "database",
});
