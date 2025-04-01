import { FastifyRequest } from "fastify";
import { errorResponseBuilderContext } from "@fastify/rate-limit";
import config from "../config.js";

export const defaultErrorResponseBuilder =
  ({
    statusCode = 429,
    error = "Rate limit exceeded",
    message = "Too many requests, please try again later.",
  }: {
    statusCode?: number;
    error?: string;
    message?: string;
  }) =>
  (req: FastifyRequest, context: errorResponseBuilderContext): object => {
    return {
      statusCode,
      error,
      message,
      max: context.max,
      timeWindow: context.after,
      key: context.statusCode,
    };
  };
