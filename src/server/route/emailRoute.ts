import { FastifyInstance } from "fastify";
import { sendEmailController } from "../controller/sendEmail.js";

export async function emailRoutes(app: FastifyInstance) {
  app.post("/api/admin/send-email", sendEmailController);
}

export default emailRoutes;
