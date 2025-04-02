import { IFirebaseUser } from "../../types";

export interface IFirebaseRepo {
  getUser(props: IFirebaseUser): Promise<IFirebaseUser | null>;
}

export default IFirebaseRepo;
