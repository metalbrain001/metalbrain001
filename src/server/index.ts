import cors from "@fastify/cors";
import fastifyCompress from "@fastify/compress";
import fastifyCookie from "@fastify/cookie";
import fastifyCsrfProtection from "@fastify/csrf-protection";
import jwt from "@fastify/jwt";
import { FastifyInstance } from "fastify";
import { router } from "./route/router.js";
import config from "./config.js";
import rateLimit from "@fastify/rate-limit";

export default async function loadApp(app: FastifyInstance) {
  await app.register(rateLimit, {
    global: config.rateLimit.global,
    max: config.rateLimit.max,
    ban: config.rateLimit.ban,
    timeWindow: config.rateLimit.timeWindow,
    cache: config.rateLimit.cache,
    allowList: config.rateLimit.allowList,
    nameSpace: config.rateLimit.nameSpace,
    continueExceeding: config.rateLimit.continueExceeding,
    skipOnError: config.rateLimit.skipOnError,
    addHeaders: config.addHeaders,
    keyGenerator: config.rateLimit.keyGenerator ?? undefined,
    errorResponseBuilder: config.rateLimit.errorResponseBuilder ?? undefined,
  });

  await app.register(fastifyCookie, { secret: config.jwt.secret }); // signed cookies

  await app.register(fastifyCsrfProtection, {
    cookieOpts: { signed: true },
  });

  await app.register(cors, {
    origin: config.server.origin,
    credentials: true,
  });

  await app.register(fastifyCompress, {
    global: true,
    threshold: config.server.compressionThreshold,
  });

  await app.register(jwt, {
    secret: config.jwt.secret,
    cookie: {
      cookieName: "jwt", // cookie name to read from
      signed: false,
    },
  });

  await router(app);
}
