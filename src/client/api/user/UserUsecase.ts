// src/client/user-use-cases/getUserUseCase.ts
import { UserRepoApi } from "@/client/api/user/UserRepoApi";
import { SignInProps, SignUpProps, FirebaseSignInProps } from "@/client/types";

export const getUserUseCase = async (
  sessionId: string,
  userRepo: UserRepoApi,
) => {
  return userRepo.getUser(sessionId);
};

export const SignUpUseCase = async (
  props: SignUpProps,
  userRepo: UserRepoApi,
) => {
  return userRepo.signUp(props);
};

export const SignInUseCase = async (
  props: SignInProps,
  userRepo: UserRepoApi,
) => {
  return userRepo.signIn(props);
};

export const firebaseSignInUseCase = async (
  props: FirebaseSignInProps,
  userRepo: UserRepoApi,
) => {
  return userRepo.firebaseSignIn(props);
};

export const getCsrfTokenUseCase = async (userRepo: UserRepoApi) => {
  return userRepo.csrfToken();
};

export const SignOutUseCase = async (
  sessionId: string,
  userRepo: UserRepoApi,
) => {
  await userRepo.signOut(sessionId);
};

export default {
  getUserUseCase,
  SignUpUseCase,
  SignInUseCase,
  SignOutUseCase,
  getCsrfTokenUseCase,
  firebaseSignInUseCase,
};
