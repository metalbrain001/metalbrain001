import admin from "firebase-admin";
import { IAdminRepo } from "./IAdmin"; // Assuming your interfaces are defined here
import { IAdmin } from "../../types"; // Assuming your interfaces are defined here

export class FirebaseAdminRepo implements IAdminRepo {
  async getAdmin(localId: string): Promise<IAdmin> {
    const db = admin.firestore();
    const ref = db.collection("adminCache").doc(localId);

    const cached = await ref.get();

    if (cached.exists) {
      return cached.data() as IAdmin;
    }

    const userRecord = await admin.auth().getUser(localId);
    const adminData: IAdmin = {
      kind: "admin#identitytoolkit#LookupResponse",
      users: [
        {
          localId: userRecord.uid,
          email: userRecord.email || "",
          displayName: userRecord.displayName || "",
          photoUrl: userRecord.photoURL || "",
          emailVerified: userRecord.emailVerified,
          providerUserInfo: userRecord.providerData.map((provider) => ({
            providerId: provider.providerId || "",
            displayName: provider.displayName || "",
            photoUrl: provider.photoURL || "",
            federatedId: provider.uid || "",
            email: provider.email || "",
          })),
          validSince: userRecord.tokensValidAfterTime || "",
          lastLoginAt: userRecord.metadata.lastSignInTime || "",
          createdAt: userRecord.metadata.creationTime || "",
          lastRefreshAt: new Date().toISOString(),
        },
      ],
    };

    // ✅ Cache it
    await ref.set(adminData);
    return adminData;
  }
}
