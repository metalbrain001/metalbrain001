import { FastifyRequest, FastifyReply } from "fastify";
import { AdminUseCase } from "../repository/admin/AdminUseCase.js";

export class AdminController {
  constructor(private readonly adminUseCase: AdminUseCase) {}

  getAdmin = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { localId } = request.body as { localId: string };

      const admin = await this.adminUseCase.getAdmin(localId);

      if (!admin) {
        return reply.code(404).send({ error: "Admin not found" });
      }

      return reply.send(admin);
    } catch (err) {
      console.error("Get Admin Error:", err);
      return reply.code(500).send({ error: "Server Error" });
    }
  };
}
