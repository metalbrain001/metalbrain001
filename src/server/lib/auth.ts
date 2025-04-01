import jwt from "jsonwebtoken";
import { FastifyReply, FastifyRequest } from "fastify";
import config from "../config.js";

export async function authGuard(req: FastifyRequest, reply: FastifyReply) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return reply.code(401).send({ error: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    // ✅ Attach decoded payload to request
    (req as any).user = jwt.verify(token, config.jwt.secret);
  } catch (err) {
    return reply.code(401).send({ error: "Invalid or expired token" });
  }
}

export default authGuard;
