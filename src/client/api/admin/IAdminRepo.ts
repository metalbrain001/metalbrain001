import { SendEmailProps, IAdmin } from "../../types";

export interface IAdminRepo {
  getAdmin(localId: string): Promise<IAdmin>;
  sendEmail(props: SendEmailProps): Promise<void>;
}

export default IAdminRepo;
