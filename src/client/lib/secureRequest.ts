// src/client/lib/secureRequest.ts
import { UserRepoApi } from "@/client/api/user/UserRepoApi";
import axiosInstance from "@/client/api/axios";

const userRepo = new UserRepoApi(axiosInstance);

/**
 * Injects CSRF token into headers before a secured POST request
 */
export const securePost = async (url: string, data: any) => {
  const { csrfToken } = await userRepo.csrfToken();

  return axiosInstance.post(url, data, {
    withCredentials: true,
    headers: {
      "X-CSRF-Token": csrfToken,
    },
  });
};
export default { securePost };
