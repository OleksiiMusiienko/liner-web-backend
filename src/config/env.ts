
//централизованно предоставляет настройки приложения, полученные из переменных окружения.
const host = process.env.HOST ?? "127.0.0.1";

const port = Number(process.env.PORT ?? "3000");
const corsOrigin = process.env.CORS_ORIGIN?.trim() ?? ""; //corsOrigin — разрешённый адрес Frontend.
const linerApiBaseUrl = process.env.LINER_API_BASE_URL?.trim() ?? "";//адрес основного Liner API будет доступен через env.linerApiBaseUrl

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
  linerApiBaseUrl,
} as const;
