// src/client/hooks/use-csrftoken.ts
import { useQuery } from "@tanstack/react-query";
import { UserRepoApi } from "@/client/api/user/UserRepoApi";
import axiosInstance from "@/client/api/axios";
import { getCsrfTokenUseCase } from "@/client/api/user/UserUsecase";

const userRepo = new UserRepoApi(axiosInstance);

export const useCsrfToken = () => {
  return useQuery({
    queryKey: ["GET_CSRF_TOKEN"],
    queryFn: () => getCsrfTokenUseCase(userRepo),
  });
};

export default useCsrfToken;
