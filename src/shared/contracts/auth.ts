
export interface PublicUser {
  id: string;
  email?: string;
  username?: string | null;
  displayName?: string | null;
  avatarUrl?: string | null;
  showActivity?: boolean;
  showHistory?: boolean;
}

export type AuthUser = PublicUser;

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: string;
  user: PublicUser;
  expiresAt?: number;
}

// export interface AuthResult {
//   accessToken: string;
//   refreshToken: string;
//   accessTokenExpiresAt: string | Date;
//   user: PublicUser;
// }

export interface RegisterInput {
  email: string;
  password: string;
  username: string;
  displayName: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

