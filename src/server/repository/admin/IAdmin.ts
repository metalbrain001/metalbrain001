import { IAdmin } from "../../types";

export interface IAdminRepo {
  getAdmin(localId: string): Promise<IAdmin>;
}
