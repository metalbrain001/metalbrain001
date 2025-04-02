import { FirebaseApi } from "@/client/api/firebase/FirebaseAPI";
import { getAuth } from "firebase/auth";
import { IFirebaseUser } from "@/client/types";

export const getFirebaseUserUseCase = async (
  firebaseApi: FirebaseApi,
): Promise<IFirebaseUser | null> => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) throw new Error("Not authenticated");

  const idToken = await user.getIdToken();
  const firebaseUser = await firebaseApi.getUser({ idToken });

  return firebaseUser;
};
