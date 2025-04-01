import {
  SignUpProps,
  SignInProps,
  IUser,
  FirebaseSignInProps,
  FirebaseSignUpProps,
} from "../../types";

export interface IUserRepo {
  firebaseSignUp(props: FirebaseSignUpProps): Promise<{
    status: "verified" | "pending";
  }>;
  firebaseSignIn(props: FirebaseSignInProps): Promise<IUser>;
  signUp(props: SignUpProps): Promise<IUser>;
  signIn(props: SignInProps): Promise<void>;
  signOut(sessionId: string): Promise<void>;
  getUser(sessionId: string): Promise<IUser | null>;
  getUserById(userId: string): Promise<IUser | null>;
  getUserByEmail(email: string): Promise<IUser | null>;
  updateUser(): Promise<void>;
  deleteUser(): Promise<void>;
}

export default IUserRepo;
