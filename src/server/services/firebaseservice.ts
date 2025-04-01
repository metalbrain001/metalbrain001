import { admin } from "../services/firebase-admin.js";

export interface DecodedFirebaseUser {
  uid: string;
  email: string;
  name?: string;
  provider: string;
  emailVerified: boolean;
}

export interface IFirebaseAuthService {
  verifyToken(idToken: string): Promise<DecodedFirebaseUser>;
}

export class FirebaseAuthService implements IFirebaseAuthService {
  private auth: admin.auth.Auth;

  constructor() {
    this.auth = admin.auth();
  }

  async verifyToken(idToken: string): Promise<DecodedFirebaseUser> {
    const decoded = await this.auth.verifyIdToken(idToken);

    const email = decoded.email;
    const provider = decoded.firebase?.sign_in_provider;
    const uid = decoded.uid;
    const name = decoded.name || "";
    const emailVerified = decoded.email_verified;

    if (!email || !provider || !uid || !emailVerified) {
      throw new Error("Invalid Firebase token");
    }

    if (!email || !provider || !uid || !emailVerified) {
      throw new Error("Invalid Firebase token");
    }

    return { uid, email, name, provider, emailVerified };
  }
}

export default FirebaseAuthService;
