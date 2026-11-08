//интеграционный тест, проверяющий реальную отправку HTTP-запроса через Axios и получение JSON-ответа.
// Использует временный локальный сервер вместо настоящего Liner API.
import Fastify from "fastify";
import { describe, it, expect } from "vitest";

import { createLinerClient } from "../../../../src/integrations/liner/liner.client.js";

describe("Liner HTTP Client Integration", () => {

    it("receives JSON response over HTTP", async () => {
        const testServer = Fastify();

        testServer.get("/test-response", async () => ({
            status: "ok",
            message: "Response from test server",
        }));

        try {
            const baseURL = await testServer.listen({
                host: "127.0.0.1",
                port: 0,
            });

            const client = createLinerClient(baseURL);

            const response = await client.get("/test-response");

            expect(response.status).toBe(200);
            expect(response.data).toEqual({
                status: "ok",
                message: "Response from test server",
            });
        } finally {
            await testServer.close();
        }
    });

//реакция на 404
    it("rejects HTTP 404 responses", async () => {
        const testServer = Fastify();

        try {
            const baseURL = await testServer.listen({
                host: "127.0.0.1",
                port: 0,
            });

            const client = createLinerClient(baseURL);

            await expect(
                client.get("/unknown"),
            ).rejects.toMatchObject({
                response: {
                    status: 404,
                },
            });
        } finally {
            await testServer.close();
        }
    });

//проверка при недоступном сервере Это важно для нашего Web Backend:
// впоследствии потребуется правильно обрабатывать недоступность основного Liner API.
    it("rejects when Liner API is unavailable", async () => {
        const testServer = Fastify();

        const baseURL = await testServer.listen({
            host: "127.0.0.1",
            port: 0,
        });

        await testServer.close();

        const client = createLinerClient(baseURL);

        await expect(
            client.get("/test-response"),
        ).rejects.toMatchObject({
            code: "ECONNREFUSED",
        });
    });

});
