// src/client/hooks/useSignUp.ts
import { useMutation } from "@tanstack/react-query";
import { SignUpUseCase } from "@/client/api/user/UserUsecase";
import { UserRepoApi } from "@/client/api/user/UserRepoApi";
import axiosInstance from "@/client/api/axios";
import { SignUpProps } from "@/client/types";

export const useSignUp = () => {
  const userRepo = new UserRepoApi(axiosInstance);

  return useMutation({
    mutationFn: (props: SignUpProps) => SignUpUseCase(props, userRepo),
  });
};

export default {
  useSignUp,
};
