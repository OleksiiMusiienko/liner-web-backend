
import {
  boolean,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

import { accountSchema } from "./account.schema.js";

export const users = accountSchema.table(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    email: text("email").notNull(),
    emailNormalized: text("email_normalized").notNull(),
    passwordHash: text("password_hash"),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    }).defaultNow().notNull(),

    updatedAt: timestamp("updated_at", {
      withTimezone: true,
    }).defaultNow().notNull(),

    username: text("username"),
    displayName: text("display_name"),
    avatarUrl: text("avatar_url"),

    bannerUrl: text("banner_url"),
    avatarAnimated: boolean("avatar_animated").default(false).notNull(),
    bannerAnimated: boolean("banner_animated").default(false).notNull(),
    avatarFrame: text("avatar_frame"),

    showActivity: boolean("show_activity").default(true).notNull(),
    showHistory: boolean("show_history").default(true).notNull(),

    passwordChangedAt: timestamp("password_changed_at", {
      withTimezone: true,
    }),

    lastIp: text("last_ip"),
    signupNetwork: text("signup_network"),
  },
  (table) => [
    uniqueIndex("users_email_normalized_unique").on(table.emailNormalized),
    uniqueIndex("users_username_unique").on(table.username),
  ],
);
