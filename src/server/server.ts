import Fastify from "fastify";
import loadApp from "./index.js";
import config from "./config.js";
import { AsyncLocalStorage } from "node:async_hooks";

const server = Fastify({ logger: true });
const asyncLocalStorage = new AsyncLocalStorage();

async function startServer() {
  try {
    await loadApp(server);

    let idSeq = 0;

    server.server.on("connection", (socket) => {
      const id = idSeq++;
      asyncLocalStorage.run(id, () => {
        server.log.info(`[${id}] New connection from client`);
        socket.on("close", () => {
          server.log.info(`[${id}] Connection closed`);
        });
      });
    });

    const idleTimeout = config.server.idleTimeout;
    let idleTimer = setTimeout(() => {
      server.log.warn("Server shutting down due to inactivity...");
      server.close(() => process.exit(0));
    }, idleTimeout);

    server.addHook("onRequest", (req, reply, done) => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        server.log.warn("Server shutting down Now due to inactivity...");
        server.close(() => process.exit(0));
      }, idleTimeout);
      done();
    });

    await server.listen({ port: config.server.port, host: "0.0.0.0" });
    server.log.info(`Server running on http://localhost:${config.server.port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

startServer();
