// useUserRole.ts
import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const useUserRole = () => {
  const [role, setRole] = useState<"ADMIN" | "USER" | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      setLoading(false);
      return;
    }

    const db = getFirestore();
    const ref = doc(db, "adminCache", user.uid); // ✅ look into `adminCache` collection

    getDoc(ref)
      .then((snap) => {
        if (snap.exists()) {
          const data = snap.data();
          if (data.role === "ADMIN") {
            setRole("ADMIN");
          } else {
            setRole("USER");
          }
        } else {
          setRole("USER"); // fallback if no doc exists
        }
      })
      .catch((err) => {
        console.error("Error fetching role:", err);
        setRole("USER");
      })
      .finally(() => setLoading(false));
  }, []);

  return { role, loading };
};
