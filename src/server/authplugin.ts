// src/server/plugins/authPlugin.ts
import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import fastifyCsrfProtection from "@fastify/csrf-protection";
import fastifyCors from "@fastify/cors";
import fastifyCompress from "@fastify/compress";
import config from "./config.js";

const authPlugin: FastifyPluginAsync = async (fastify) => {
  // ✅ Register JWT Auth
  await fastify.register(fastifyJwt, {
    secret: config.jwt.secret,
    sign: { expiresIn: "15m" },
  });

  // ✅ Register Cookie Support
  await fastify.register(fastifyCookie, {
    secret: config.jwt.secret,
    parseOptions: {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    },
  });

  // ✅ Register CSRF Protection
  await fastify.register(fastifyCsrfProtection, {
    cookieOpts: { signed: true },
  });

  // ✅ Enable CORS
  await fastify.register(fastifyCors, {
    origin: config.server.origin,
    credentials: true,
  });

  // ✅ Enable Compression
  await fastify.register(fastifyCompress, {
    global: true,
    threshold: config.server.compressionThreshold,
  });

  // ✅ Middleware: Attach user to request
  fastify.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch (err) {
        reply.code(401).send({ error: "Unauthorized" });
      }
    },
  );
};

export default authPlugin;
