// src/client/hooks/useSignIn.ts
import { useMutation } from "@tanstack/react-query";
import { SignInUseCase } from "@/client/api/user/UserUsecase";
import { UserRepoApi } from "@/client/api/user/UserRepoApi";
import axiosInstance from "@/client/api/axios";
import { SignInProps } from "@/client/types";

export const useSignIn = () => {
  const userRepo = new UserRepoApi(axiosInstance);

  return useMutation({
    mutationFn: (props: SignInProps) => SignInUseCase(props, userRepo),
  });
};

export default {
  useSignIn,
};
