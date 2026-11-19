
import {
  integer,
  jsonb,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { accountSchema } from "./account.schema.js";
import { users } from "./users.schema.js";

// Drizzle-модель профиля пользователя Liner.
// Хранит оформление, биографию, настройки профиля
// и номер редакции для контроля изменений.

export const profiles = accountSchema.table(
  "profiles",
  {
    userId: uuid("user_id")
      .primaryKey()
      .references(() => users.id, { onDelete: "cascade" }),

    layout: jsonb("layout"),

    revision: integer("revision")
      .default(0)
      .notNull(),

    bio: text("bio"),

    nameFont: text("name_font"),

    telegramHandle: text("telegram_handle"),

    updatedAt: timestamp("updated_at", {
      withTimezone: true,
    }).defaultNow().notNull(),

    themePrimary: text("theme_primary"),

    themeAccent: text("theme_accent"),
  },
);
