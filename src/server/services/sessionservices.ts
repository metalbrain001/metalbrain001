import prisma from "../prisma/client.js";
import { JwtHandler } from "./jwttokenservices.js";
import { IUserPayload } from "../types";
import { Role } from "@prisma/client"; // ✅ clean Role typing

const jwtHandler = new JwtHandler();

export class SessionService {
  async createSessionAndTokens(
    userId: string,
    email: string,
    role: Role,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
    sessionId: string;
  }> {
    const session = await prisma.session.create({
      data: {
        user_id: userId,
        accessToken: "",
        refreshToken: "",
        userAgent: "Fastify-Client",
        ipAddress: "127.0.0.1",
        expiresAt: new Date(Date.now() + 15 * 60 * 1000),
      },
    });

    const payload: IUserPayload = {
      userId,
      email,
      sessionId: session.id,
      role, // ✅ already a valid enum value
    };

    const accessToken = jwtHandler.jwtGenerator(payload);
    const refreshToken = jwtHandler.jwtRefreshGenerator(payload);

    await prisma.session.update({
      where: { id: session.id },
      data: { accessToken, refreshToken },
    });

    return { accessToken, refreshToken, sessionId: session.id };
  }

  async invalidateSession(sessionId: string): Promise<void> {
    await prisma.session.update({
      where: { id: sessionId },
      data: { isValid: false },
    });
  }

  async getSessionById(sessionId: string) {
    return prisma.session.findUnique({ where: { id: sessionId } });
  }
}

export const sessionServices = new SessionService();
