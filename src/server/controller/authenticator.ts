// src/server/controllers/UserController.ts
import { FastifyRequest, FastifyReply } from "fastify";
import { UserUseCases } from "../repository/userrepo/userusecases";
import { SignUpProps, SignInProps } from "../types";

export class UserController {
  constructor(private readonly userUseCases: UserUseCases) {}

  firebaseSignIn = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { idToken } = request.body as { idToken: string };

      const { accessToken, refreshToken, sessionId, role } =
        await this.userUseCases.firebaseSignIn(idToken);

      reply
        .setCookie("sessionId", sessionId, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
        })
        .setCookie("jwt", accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          path: "/",
          maxAge: 60 * 60,
        })
        .setCookie("accessToken", accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60,
        });

      return reply.code(200).send({
        message: "Firebase sign-in successful",
        accessToken,
        refreshToken,
        role,
      });
    } catch (err: any) {
      console.error("Firebase Sign-in Error:", err);
      return reply.code(401).send({ error: err.message || "Unauthorized" });
    }
  };

  signUp = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const body = request.body as SignUpProps;
      await this.userUseCases.signUp(body);
      return reply.code(201).send({ message: "User created successfully" });
    } catch (err: any) {
      console.error("Signup Error:", err);
      return reply
        .code(500)
        .send({ error: err.message || "Internal Server Error" });
    }
  };

  signIn = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const body = request.body as SignInProps;
      const { accessToken, refreshToken, sessionId, role } =
        await this.userUseCases.signIn(body);

      // Set all cookies first
      reply
        .setCookie("sessionId", sessionId, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
        })
        .setCookie("jwt", accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          path: "/",
          maxAge: 60 * 60,
        })
        .setCookie("accessToken", accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60,
        });
      return reply.code(200).send({
        message: "Login successful",
        accessToken,
        refreshToken,
        role,
      });
    } catch (err: any) {
      console.error("Sign in Error:", err);
      return reply.code(401).send({ error: err.message || "Unauthorized" });
    }
  };

  signOut = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const sessionId = (request as any).user?.sessionId;
      console.log("sessionId from logout:", sessionId);
      if (!sessionId) {
        return reply.code(401).send({ error: "Unauthorized: Session missing" });
      }

      await this.userUseCases.signOut(sessionId);
      reply
        .clearCookie("sessionId", { path: "/" }) // ✅ Path must match exactly
        .clearCookie("accessToken", { path: "/" })
        .clearCookie("jwt", { path: "/" })
        .code(200)
        .send({ message: "Logout successful" });
      return reply;
    } catch (err: any) {
      return reply
        .code(500)
        .send({ error: err.message || "Internal Server Error" });
    }
  };

  getUser = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const sessionId = request.cookies.sessionId;
      if (!sessionId) {
        return reply
          .code(401)
          .send({ error: "Unauthorized: No session found for this user" });
      }

      const user = await this.userUseCases.getUser(sessionId);
      if (!user) return reply.code(404).send({ error: "User not found" });

      const { password, ...safeUser } = user;
      return reply.code(200).send({ user: safeUser });
    } catch (err: any) {
      return reply
        .code(500)
        .send({ error: err.message || "Internal Server Error" });
    }
  };

  getUserById = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id } = request.params as { id: string };
      if (!id) return reply.code(400).send({ error: "User ID required" });

      const user = await this.userUseCases.getUserById(id);
      if (!user) return reply.code(404).send({ error: "User not found" });

      const { password, ...safeUser } = user;
      return reply.code(200).send({ user: safeUser });
    } catch (err: any) {
      return reply
        .code(500)
        .send({ error: err.message || "Internal Server Error" });
    }
  };

  updateUser = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await this.userUseCases.updateUser();
      return reply.code(200).send({ message: "User updated successfully" });
    } catch (err: any) {
      return reply
        .code(500)
        .send({ error: err.message || "Internal Server Error" });
    }
  };

  deleteUser = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await this.userUseCases.deleteUser();
      return reply.code(200).send({ message: "User deleted successfully" });
    } catch (err: any) {
      return reply
        .code(500)
        .send({ error: err.message || "Internal Server Error" });
    }
  };
}

export default UserController;
