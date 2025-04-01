import { FastifyInstance } from "fastify";

export const testRoutes = async (app: FastifyInstance) => {
  app.get("/test-rate-limit", async (req, reply) => {
    return { message: "You passed the rate limit check." };
  });
};

export default testRoutes;
