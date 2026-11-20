/**
 * Регистрация зависимостей приложения в контейнере Awilix.
 *
 * Связывает имена зависимостей с конкретными реализациями.
 * Клиенты создаются по требованию, а не при запуске сервера.
 */

import { asFunction, type NameAndRegistrationPair } from "awilix";
import type { AppDependencies } from "./container.js";
import type { DependencyContainer } from "./container.js";
import { createCatalogClient } from "../integrations/liner/catalog.client.js";
import { createLyricsClient } from "../integrations/liner/lyrics.client.js";

export function registerDependencies(
    container: DependencyContainer,
): void {
    const registrations = {
        catalogClient: asFunction(() => createCatalogClient()).singleton(),
        lyricsClient: asFunction(() => createLyricsClient()).singleton(),
    } satisfies NameAndRegistrationPair<AppDependencies>;

    container.register(registrations);
}