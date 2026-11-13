# Liner Web — API Inventory

## 1. Призначення

Реєстр API для інтеграції Liner Web Frontend та Web Backend.
Статус "Документовано" означає, що маршрут описаний
у документації, але ще не перевірений HTTP-запитом.

## 2. Catalog Service

| Method | Endpoint | Призначення | Статус |
|---|---|---|---|
| GET | /v1/catalog/search | Пошук музики | Документовано |
| GET | /v1/catalog/artists/{id} | Дані артиста | Документовано |
| GET | /v1/catalog/albums/{id} | Дані альбому | Документовано |
| GET | /v1/catalog/playlists/{id} | Плейлист каталогу | Документовано |
| GET | /v1/catalog/tracks/{id} | Дані треку | Документовано |

## 3. Lyrics Service

| Method | Endpoint | Призначення | Статус |
|---|---|---|---|
| GET | /v1/tracks/{id}/lyrics/resolve | Готова лірика (JSON) | Документовано |
| GET | /v1/tracks/{id}/lyrics | Потік лірики (SSE) | Документовано |
| GET | /v1/lyrics/search | Пошук лірики | Документовано |

## 4. Авторизація мікросервісів

- Запити виконуються з Web Backend.
- API-ключ зберігається лише на сервері.
- Обов'язковий заголовок: x-liner-user-id.
- Ліміти запитів необхідно враховувати.
- Адреси сервісів та API-ключі ще не отримані.

## 5. Основний Liner API

Попередня схема: React звертається безпосередньо
до основного Liner API для авторизації.

Конкретні маршрути, токени та перевірка сесій
ще потребують підтвердження.

## 6. Відкриті питання

- Як Web Backend перевіряє авторизацію користувача?
- Як працювати з персональними плейлистами та бібліотекою?
- Як отримувати аудіо для відтворення?
- Як організовано доступ до PostgreSQL?
- Які актуальні URL тестових і production API?

## 7. Catalog Search — контракт

### Endpoint

GET /v1/catalog/search

### Query Parameters

| Параметр | Обов'язковий | Опис |
|---|---|---|
| q | Так | Пошуковий запит, 1–300 символів, не лише пробіли |
| type | Ні | all, track, artist, album, playlist. За замовчуванням all |

### Headers

- Authorization: Bearer API_KEY — обов'язковий.
- x-liner-user-id — обов'язковий.
- API-ключ не передається до браузера.

### Response

- HTTP 200 — JSON з масивом items.
- Кожен елемент має поле type: track, artist, album або playlist.

### Errors

| HTTP | Code | Значення |
|---|---|---|
| 400 | USER_ID_REQUIRED | Відсутній або некоректний userId |
| 400 | VALIDATION_ERROR | Некоректні параметри |
| 401 | INVALID_API_KEY | Недійсний API-ключ |
| 429 | RATE_LIMITED | Перевищено ліміт |
| 503 | CATALOG_UNAVAILABLE | Каталог тимчасово недоступний |
| 500 | INTERNAL_ERROR | Внутрішня помилка |

### Rate Limits

- 120 запитів на хвилину на користувача.
- 1200 запитів на хвилину на API-ключ.

### Verification

Статус: Документовано. HTTP smoke-test ще не виконано.
