
import type { PublicUser } from "./auth.js";

// Контракты данных профиля пользователя Liner.

export interface UserProfile extends PublicUser {
  createdAt?: string;
  bannerUrl?: string | null;
  avatarAnimated?: boolean;
  bannerAnimated?: boolean;
  avatarFrame?: string | null;
}

export interface UpdateProfileInput {
  username?: string;
  displayName?: string | null;
  avatarUrl?: string | null;
  showActivity?: boolean;
  showHistory?: boolean;
}
