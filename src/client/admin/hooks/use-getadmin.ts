// This hook connects to Firebase and retrieves the current user
import { useQuery } from "@tanstack/react-query";
import { AdminRepoApi } from "@/client/api/admin/AdminRepoAPi";
import { getAdminUseCase } from "@/client/api/admin/AdminUseCase";
import axiosInstance from "@/client/api/axios";
import { AdminQueryKeys } from "@/client/api/admin/AdminQueryKeys";

export const useGetAdmin = (localId: string) => {
  const adminApi = new AdminRepoApi(axiosInstance);
  return useQuery({
    queryKey: [AdminQueryKeys.LOCAL_ID, localId],
    queryFn: () => getAdminUseCase(localId, adminApi),
    enabled: !!localId,
  });
};
