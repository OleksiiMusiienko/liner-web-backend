import type { FastifyError, FastifyRequest, FastifyReply } from "fastify";

import { AppError } from "./app-error.js";

export function errorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply,
): void {
  if (error instanceof AppError && error.statusCode >= 400 && error.statusCode < 500) {
    request.log.warn({ code: error.code, statusCode: error.statusCode }, "Application error");

    reply.code(error.statusCode).send({
      statusCode: error.statusCode,
      code: error.code,
      message: error.message,
    });

    return;
  }

  if (error.statusCode !== undefined && error.statusCode >= 400 && error.statusCode < 500) {
    reply.send(error);
    return;
  }

  request.log.error({ err: error }, "Unhandled server error");

  reply.code(500).send({
    statusCode: 500,
    code: "INTERNAL_SERVER_ERROR",
    message: "Internal Server Error",
  });
}
