//Создаёт соединение с Neon и Drizzle
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "../config/env.js";

export function createDatabase() {
  if (!env.databaseUrl) {
    throw new Error("DATABASE_URL must be configured");
  }

  const sql = postgres(env.databaseUrl, {
    max: 1,
    prepare: false,
  });

  const db = drizzle(sql);

  return { db, sql };
}
