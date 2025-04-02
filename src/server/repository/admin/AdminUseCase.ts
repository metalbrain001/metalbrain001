import { FirebaseAdminRepo } from "./IAdminRepo";
import { IAdmin } from "../../types";

export class AdminUseCase {
  constructor(private adminRepo: FirebaseAdminRepo) {}

  async getAdmin(localId: string): Promise<IAdmin> {
    return this.adminRepo.getAdmin(localId);
  }
}
