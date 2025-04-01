// Use cases for user repository

import IUserRepo from "./IUserRepo";
import { IPasswordHasher, SignInProps, SignUpProps, IUser } from "../../types";
import { SessionService } from "../../services/sessionservices";
import { IFirebaseAuthService } from "../../services/firebaseservice";

export class UserUseCases {
  constructor(
    private userRepo: IUserRepo,
    private sessionService: SessionService,
    private passwordHasher: IPasswordHasher,
    private firebaseAuthService: IFirebaseAuthService,
  ) {}

  async firebaseSignIn(idToken: string): Promise<{
    accessToken: string;
    refreshToken: string;
    sessionId: string;
    role: string;
  }> {
    const decoded = await this.firebaseAuthService.verifyToken(idToken);

    const user = await this.userRepo.firebaseSignIn({
      email: decoded.email,
      name: decoded.name,
      provider: decoded.provider,
      providerId: decoded.uid,
    });

    const { accessToken, refreshToken, sessionId } =
      await this.sessionService.createSessionAndTokens(
        user.id,
        user.email,
        user.role,
      );

    return { accessToken, refreshToken, sessionId, role: user.role };
  }

  async signUp(props: SignUpProps): Promise<void> {
    if (!props.email.includes("@")) {
      throw new Error("Invalid email address");
    }

    // Check if user already exists
    const user = await this.userRepo.getUserByEmail(props.email);
    if (user) {
      throw new Error("User already exists");
    }

    // Validate password
    this.passwordHasher.validatePassword(props.password);

    // Hash password
    const hashedPassword = await this.passwordHasher.hashPassword(
      props.password,
    );
    // Create user
    await this.userRepo.signUp({
      ...props,
      password: hashedPassword,
    });
  }

  async signIn(props: SignInProps): Promise<{
    accessToken: string;
    refreshToken: string;
    sessionId: string;
    role: string;
  }> {
    const user = await this.userRepo.getUserByEmail(props.email);
    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordMatch = await this.passwordHasher.comparePassword(
      props.password,
      user.password,
    );
    if (!isPasswordMatch) {
      throw new Error("Invalid password");
    }

    const { accessToken, refreshToken, sessionId } =
      await this.sessionService.createSessionAndTokens(
        user.id,
        user.email,
        user.role,
      );

    return { accessToken, refreshToken, sessionId, role: user.role };
  }

  async signOut(sessionId: string): Promise<void> {
    await this.sessionService.invalidateSession(sessionId);
  }

  async getUser(sessionId: string): Promise<IUser | null> {
    const session = await this.sessionService.getSessionById(sessionId);
    if (!session || !session.isValid) return null;
    return await this.userRepo.getUserById(session.user_id);
  }

  async getUserById(userId: string): Promise<IUser | null> {
    return await this.userRepo.getUserById(userId);
  }

  async updateUser(): Promise<void> {
    await this.userRepo.updateUser();
  }

  async deleteUser(): Promise<void> {
    await this.userRepo.deleteUser();
  }
}

export default UserUseCases;
