import { AdminRepoApi } from "@/client/api/admin/AdminRepoAPi";
import { IAdmin } from "@/client/types";

export const getAdminUseCase = async (
  localId: string,
  adminRepoApi: AdminRepoApi,
): Promise<IAdmin> => {
  if (!localId) throw new Error("Missing UID");

  const admin = await adminRepoApi.getAdmin(localId);
  return admin;
};
