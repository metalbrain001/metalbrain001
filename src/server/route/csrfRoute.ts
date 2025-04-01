import { FastifyInstance } from "fastify";
import { CsrfTokenService } from "../services/csrftokenservice.js";

export const csrfRoutes = async (app: FastifyInstance) => {
  const csrfService = new CsrfTokenService();

  app.get("/api/csrf-token", async (req, reply) => {
    const token = csrfService.generateToken(reply);
    return { csrfToken: token };
  });
};
