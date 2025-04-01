// src/client/hooks/use-signout.ts
import { useMutation } from "@tanstack/react-query";
import { SignOutUseCase } from "@/client/api/user/UserUsecase";
import { UserRepoApi } from "@/client/api/user/UserRepoApi";
import axiosInstance from "@/client/api/axios";

export const useSignOut = () => {
  const userRepo = new UserRepoApi(axiosInstance);

  return useMutation<void, Error, string>({
    mutationFn: async (sessionId: string) => {
      await SignOutUseCase(sessionId, userRepo);
    },
  });
};
