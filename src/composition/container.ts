/**
 * Контейнер зависимостей приложения (Dependency Injection).
 *
 * Создаёт и настраивает контейнер Awilix, который управляет
 * созданием объектов и внедрением зависимостей между слоями
 * Controllers, Services, Repositories и Integrations.
 *
 * Конкретные зависимости регистрируются отдельно.
 */

import { createContainer, InjectionMode } from "awilix";
import type { AxiosInstance } from "axios";
import type { createDatabase } from "../db/postgres.connection.js";

export interface AppDependencies {
  catalogClient: AxiosInstance;
  lyricsClient: AxiosInstance;
  db?: ReturnType<typeof createDatabase>["db"],
}

export function createDependencyContainer() {
  return createContainer<AppDependencies>({
    injectionMode: InjectionMode.PROXY,//PROXY позволит передавать зависимости по именам через объект
    strict: true,//дополнительные проверки корректности жизненных циклов зависимостей
  });
}

export type DependencyContainer =
  ReturnType<typeof createDependencyContainer>;