import { SendEmailProps, IFirebaseUser } from "../../types";

export interface IFirebase {
  sendEmail(props: SendEmailProps): Promise<void>;
  getUser(props: IFirebaseUser): Promise<IFirebaseUser | null>;
}

export default IFirebase;
