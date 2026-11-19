import {
  index,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

import { accountSchema } from "./account.schema.js";
import { users } from "./users.schema.js";

// Drizzle-модель сессий авторизации Liner.
// Хранит пользователя, хеш токена, сроки действия,
// отзыв сессии и время первоначального входа.

export const sessions = accountSchema.table(
  "sessions",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),

    tokenHash: text("token_hash").notNull(),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    }).defaultNow().notNull(),

    expiresAt: timestamp("expires_at", {
      withTimezone: true,
    }).notNull(),

    revokedAt: timestamp("revoked_at", {
      withTimezone: true,
    }),

    replacedById: uuid("replaced_by_id"),

    userAgent: text("user_agent"),

    signedInAt: timestamp("signed_in_at", {
      withTimezone: true,
    }),
  },
  (table) => [
    uniqueIndex("sessions_token_hash_unique").on(table.tokenHash),
    index("sessions_user_id_idx").on(table.userId),
  ],
);
