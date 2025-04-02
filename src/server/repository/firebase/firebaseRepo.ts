import { SendEmailProps, FirebaseProps, IFirebaseUser } from "../../types";
import { EmailService } from "../../services/emailService.js";
import admin from "firebase-admin";
import FirebaseAuthService from "../../services/firebaseservice.js";
// backend Firestore

export class FirebaseRepo {
  private emailService = new EmailService();
  private firebaseAuth = new FirebaseAuthService();

  async getUser(props: IFirebaseUser): Promise<IFirebaseUser | null> {
    const db = admin.firestore();
    const userDoc = db.collection("users").doc(props.uid);
    const docSnap = await userDoc.get();
    // Create a new user if it doesn't exist
    const token = await this.firebaseAuth.verifyToken(props.idToken);
    if (!token) {
      console.log("Invalid token");
      return null;
    }

    if (!docSnap.exists) {
      console.log("Creating new FireStore user");
      await userDoc.set({
        email: token.email,
        name: token.name || null,
        provider: token.provider,
        emailVerified: token.emailVerified || false,
        createdAt: new Date(),
        role: "USER",
      });
      return {
        ...props,
      };
    }

    const data = docSnap.data();
    return {
      uid: props.uid,
      email: data?.email,
      name: data?.name,
      provider: data?.provider,
      idToken: data?.idToken,
      emailVerified: data?.emailVerified,
      role: data?.role,
    };
  }

  async sendEmail(props: SendEmailProps): Promise<void> {
    await this.emailService.sendVerificationEmail(props.to, props.subject);
  }
}

export default FirebaseRepo;
