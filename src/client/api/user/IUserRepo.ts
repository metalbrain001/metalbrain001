// File defines the interface for the UserRepo class
import { IUser } from "@/client/types";
import { SignInProps, SignUpProps, ICsrfService } from "@/server/types";

export interface IUserRepo {
  csrfToken(): Promise<ICsrfService>;

  firebaseSignIn(
    idToken: string,
  ): Promise<{ accessToken: string; refreshToken: string; sessionId: string }>;

  getUser(sessionId: string): Promise<IUser | null>;

  signIn(props: SignInProps): Promise<void>;

  signOut(sessionId: string): Promise<void>;

  signUp(props: SignUpProps): Promise<void>;
}
