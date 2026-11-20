//централизованно предоставляет настройки приложения, полученные из переменных окружения.
const host = process.env.HOST ?? "127.0.0.1";

const port = Number(process.env.PORT ?? "3000");
const corsOrigin = process.env.CORS_ORIGIN?.trim() ?? ""; //corsOrigin — разрешённый адрес Frontend.
const linerCatalogApiBaseUrl = process.env.LINER_CATALOG_API_BASE_URL?.trim() ?? "";
const linerCatalogApiKey = process.env.LINER_CATALOG_API_KEY?.trim() ?? "";
const linerLyricsApiBaseUrl = process.env.LINER_LYRICS_API_BASE_URL?.trim() ?? "";
const linerLyricsApiKey = process.env.LINER_LYRICS_API_KEY?.trim() ?? "";
const databaseUrl = process.env.DATABASE_URL?.trim() ?? "";

if (host.trim() === "") {
  throw new Error("HOST must not be empty");
}

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("PORT must be an integer between 1 and 65535");
}

export const env = {
  host,
  port,
  corsOrigin,
  linerCatalogApiBaseUrl,
  linerCatalogApiKey,
  linerLyricsApiBaseUrl,
  linerLyricsApiKey,
  databaseUrl,
} as const;
