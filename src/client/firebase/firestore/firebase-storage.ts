import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userRef = doc(db, "users", user.uid); // ✅ write allowed
    const adminCacheRef = doc(db, "adminCache", user.uid); // ✅ read allowed

    try {
      const snap = await getDoc(userRef);

      if (!snap.exists()) {
        await setDoc(userRef, {
          email: user.email,
          name: user.displayName,
          role: "USER",
          createdAt: new Date(),
        });
      }

      // Optional: try reading admin cache
      const adminSnap = await getDoc(adminCacheRef);
      if (adminSnap.exists()) {
        console.log("Admin metadata:", adminSnap.data());
      }
    } catch (err) {
      console.error("Firestore access error:", err);
    }
  }
});
