// FireStore use case
import { IFirebase } from "./IFirebase";
import { FirebaseProps, IFirebaseUser } from "../../types";

export class FirebaseUseCase {
  constructor(private firebaseRepo: IFirebase) {}

  async getUser(props: FirebaseProps): Promise<IFirebaseUser | null> {
    return this.firebaseRepo.getUser(props);
  }
}
