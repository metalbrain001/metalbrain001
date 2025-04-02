import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const auth = getAuth();
const db = getFirestore();

const user = auth.currentUser;
const ref = doc(db, "users", user?.uid || "unknown");
const userCollection = collection(db, "users");
const snap = await getDoc(ref);
if (!snap.exists()) {
  await setDoc(ref, {
    email: user?.email,
    name: user?.displayName,
    role: "USER",
    createdAt: new Date(),
  });
}
