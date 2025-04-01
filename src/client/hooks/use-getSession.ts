// src/client/hooks/useGetUserSession.ts
import { useQuery } from "@tanstack/react-query";
import { getUserUseCase } from "@/client/api/user/UserUsecase";
import { UserRepoApi } from "@/client/api/user/UserRepoApi";
import { UserQueryKeys } from "@/client/api/user/UserQueryKey";
import axiosInstance from "@/client/api/axios"; // create a central axios instance

export const useGetUserSession = (sessionId: string) => {
  const userRepo = new UserRepoApi(axiosInstance);

  return useQuery({
    queryKey: [UserQueryKeys.GET_CURRENT_USER_SESSION, sessionId],
    queryFn: () => getUserUseCase(sessionId, userRepo),
    enabled: !!sessionId,
  });
};

export default {
  useGetUserSession,
};
