import IUserRepo from "./IUserRepo.js";
import {
  SignUpProps,
  SignInProps,
  IUser,
  FirebaseSignInProps,
  FirebaseSignUpProps,
} from "../../types";
import prisma from "../../prisma/client.js";
import { Role } from "@prisma/client";

export class PrismaRepo implements IUserRepo {
  async firebaseSignUp(idToken: FirebaseSignUpProps): Promise<{
    status: "verified" | "pending";
  }> {
    const user = await prisma.user.findUnique({
      where: {
        email: idToken.email,
      },
    });

    if (!user) {
      await prisma.user.create({
        data: {
          email: idToken.email,
          name: idToken.name || "",
          provider: idToken.provider,
          provider_id: idToken.providerId,
          password: "",
          isverified: true,
        },
      });
      return { status: "verified" };
    }

    return { status: "pending" };
  }

  async firebaseSignIn(props: FirebaseSignInProps): Promise<IUser> {
    // Check if user exists by provider ID
    let user = await prisma.user.findUnique({
      where: {
        provider_id: props.providerId,
      },
    });

    // If not, fallback to email
    if (!user) {
      user = await prisma.user.findUnique({
        where: {
          email: props.email,
        },
      });
    }

    // If still not found, create a new user
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: props.email,
          name: props.name || "",
          provider: props.provider,
          provider_id: props.providerId,
          password: "",
          isverified: true,
        },
      });
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      isVerified: user.isverified,
      provider: user.provider,
      provider_id: user.provider_id,
      ipAddress: "",
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async signUp(props: SignUpProps): Promise<IUser> {
    const newUser = await prisma.user.create({
      data: {
        name: props.name,
        email: props.email,
        password: props.password,
      },
    });
    if (!newUser) throw new Error("User not created");
    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
      role: Role.USER,
      isVerified: newUser.isverified,
      provider: null,
      provider_id: null,
      ipAddress: "",
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };
  }

  async signIn(props: SignInProps): Promise<void> {
    await prisma.user.findFirst({
      where: {
        email: props.email,
        password: props.password,
      },
    });
  }

  async signOut(sessionId: string): Promise<void> {
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
    });
    if (!session || !session.isValid) return;
    await prisma.session.update({
      where: { id: sessionId },
      data: { isValid: false },
    });
  }

  async getUser(sessionId: string): Promise<IUser | null> {
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: { user: true },
    });

    if (!session || !session.isValid || !session.user) return null;

    const { user } = session;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      isVerified: user.isverified,
      provider: user.provider,
      provider_id: user.provider_id,
      ipAddress: session.ipAddress || "",
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async getUserById(userId: string): Promise<IUser | null> {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return null;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      isVerified: user.isverified,
      provider: user.provider,
      provider_id: user.provider_id,
      ipAddress: "",
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!user) return null;
    return {
      id: user?.id || "",
      name: user?.name || "",
      email: user?.email || "",
      password: user?.password || "",
      role: "USER",
      isVerified: true,
      provider: user?.provider || null,
      provider_id: user?.provider_id || null,
      ipAddress: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  async updateUser(): Promise<void> {
    // update user logic
  }

  async deleteUser(): Promise<void> {
    // delete user logic
  }
}

export default PrismaRepo;
