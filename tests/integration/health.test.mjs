
import test from "node:test";
import assert from "node:assert/strict";

import { buildApp } from "../../dist/app.js";

test("GET /health returns 200 and status ok", async (t) => {
  const app = buildApp();

  t.after(() => app.close());

  const response = await app.inject({
    method: "GET",
    url: "/health",
  });

  assert.equal(response.statusCode, 200);
  assert.deepEqual(response.json(), { status: "ok" });
});


test("GET /test returns 404 for unknown route", async (t) => {
  const app = buildApp();

  t.after(() => app.close());

  const response = await app.inject({
    method: "GET",
    url: "/test",
  });

  assert.equal(response.statusCode, 404);
  assert.equal(response.json().error, "Not Found");
});
