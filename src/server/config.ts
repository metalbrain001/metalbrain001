// src/server/config.ts
import type { Config } from "./types";
import { defaultKeyGenerator } from "./services/keyGenerator.js";
import { defaultErrorResponseBuilder } from "./services/errorResponseBuilder.js";

export const config = {
  env: {
    apiEndpoint: process.env.API_ENDPOINT || "",
    localDatabaseUrl: process.env.DATABASE_URL || "",
  },
  jwt: {
    secret: process.env.JWT_ACCESS_SECRET || "",
    refreshSecret: process.env.JWT_REFRESH_SECRET || "",
  },
  server: {
    port: Number(process.env.PORT) || 8080,
    idleTimeout: Number(process.env.IDLE_TIMEOUT) || 48000,
    compressionLevel: Number(process.env.COMPRESSION_LEVEL) || 6,
    compressionThreshold: Number(process.env.COMPRESSION_THRESHOLD) || 1024,
    origin: process.env.ORIGIN || "http://localhost:5173",
  },
  Email: {
    host: process.env.SMTP_HOST || "",
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER || "",
      pass: process.env.SMTP_PASS || "",
    },
    tls: {
      rejectUnauthorized: process.env.SMTP_TLS_REJECT_UNAUTHORIZED !== "false",
      ciphers: process.env.SMTP_TLS_CIPHERS || undefined,
    },
    requireTLS: process.env.SMTP_REQUIRE_TLS === "true",
    debug: process.env.SMTP_DEBUG === "true",
    ssl: {
      ca: process.env.SMTP_SSL_CA || undefined,
      key: process.env.SMTP_SSL_KEY || undefined,
      cert: process.env.SMTP_SSL_CERT || undefined,
    },
  },
  csrf: {
    secret: process.env.CSRF_SECRET || "",
    cookieOpts: {
      signed: process.env.CSRF_COOKIE_SIGNED === "true",
    },
  },
  rateLimit: {
    global: process.env.RATE_LIMIT_GLOBAL === "true",
    max: Number(process.env.RATE_LIMIT_MAX) || 1000,
    ban: Number(process.env.RATE_LIMIT_BAN) || 0,
    timeWindow: Number(process.env.RATE_LIMIT_TIME_WINDOW) || 15 * 60 * 1000,
    cache: Number(process.env.RATE_LIMIT_CACHE) || 10000,
    allowList: (process.env.RATE_LIMIT_ALLOW_LIST || "")
      .split(",")
      .map((ip) => ip.trim())
      .filter(Boolean),
    nameSpace: process.env.RATE_LIMIT_NAMESPACE || "fastify-rate-limit",
    continueExceeding: process.env.RATE_LIMIT_CONTINUE_EXCEEDING === "true",
    skipOnError: process.env.RATE_LIMIT_SKIP_ON_ERROR === "true",
    keyGenerator: defaultKeyGenerator({ ip: true, url: true }),
    errorResponseBuilder: defaultErrorResponseBuilder({
      error: "Rate limit exceeded",
      message: "You have exceeded the allowed number of requests",
      statusCode: 429,
    }),
    hook: (req, res) => {
      res.status(429).send({ error: "Rate limit exceeded" });
    },
  },
  addHeaders: {
    "x-rate-limit-limit": true,
    "x-rate-limit-remaining": true,
    "x-rate-limit-reset": true,
    "retry-after": true,
  },
  firebase: {
    apiKey: process.env.FIREBASE_API_KEY || "",
    vapidKey: process.env.FIREBASE_FCM_VAPID_KEY || "",
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || "",
    projectId: process.env.FIREBASE_PROJECT_ID || "",
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "",
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "",
    appId: process.env.FIREBASE_APP_ID || "",
  },
} satisfies Config;

export default config;
