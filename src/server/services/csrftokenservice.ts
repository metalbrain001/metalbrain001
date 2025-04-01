import { FastifyReply, FastifyRequest } from "fastify";
import { ICsrfService } from "../types";

interface CsrfRequestBody {
  _csrf?: string;
  [key: string]: any;
}

export class CsrfTokenService implements ICsrfService {
  constructor() {}

  generateToken(reply: FastifyReply): string {
    const token = reply.generateCsrf();
    reply.setCookie("XSRF-TOKEN", token, {
      path: "/",
      httpOnly: false,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    return token;
  }

  validateToken(req: FastifyRequest): boolean {
    const body = req.body as CsrfRequestBody;
    const token = req.headers["x-csrf-token"] || body._csrf;
    return Boolean(token);
  }
}

export default CsrfTokenService;
