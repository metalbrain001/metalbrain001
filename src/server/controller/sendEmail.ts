// src/server/controller/adminController.ts
import { FastifyRequest, FastifyReply } from "fastify";
import PrismAdminRepo from "../repository/admin/prismadminrepo.js";

const adminRepo = new PrismAdminRepo();

export const sendEmailController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { to, subject, body } = request.body as {
    to: string;
    subject: string;
    body: string;
  };

  try {
    await adminRepo.sendEmail({ to, subject, body });
    return reply.code(200).send({ message: "Email sent successfully" });
  } catch (error: any) {
    console.error("Email send error:", error);
    return reply
      .code(500)
      .send({ error: error.message || "Failed to send email" });
  }
};

export default sendEmailController;
