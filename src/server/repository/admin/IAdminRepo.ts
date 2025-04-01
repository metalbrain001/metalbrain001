import { SendEmailProps } from "../../types";

export interface IAdminRepo {
  sendEmail(props: SendEmailProps): Promise<void>;
}

export default IAdminRepo;
