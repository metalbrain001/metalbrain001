// src/client/api/user/UserRepoApi.ts
import { AxiosInstance } from "axios";
import {
  IUser,
  SignInProps,
  SignUpProps,
  FirebaseSignInProps,
} from "@/client/types";

export class UserRepoApi {
  constructor(private axios: AxiosInstance) {}

  async getUser(sessionId: string): Promise<IUser | null> {
    const { data } = await this.axios.get(`/me`, {
      headers: {
        Authorization: `Bearer ${sessionId}`,
      },
      withCredentials: true,
    });
    return data?.user || null;
  }

  // ✅ Register new user
  async signUp(props: SignUpProps): Promise<void> {
    const { csrfToken } = await this.csrfToken(); // fetch CSRF
    return this.axios.post("/sign-up", props, {
      headers: {
        "X-CSRF-Token": csrfToken,
      },
      withCredentials: true,
    });
  }

  // ✅ Login existing user
  async signIn(props: SignInProps): Promise<any> {
    const { csrfToken } = await this.csrfToken(); // fetch CSRF
    return this.axios.post("/sign-in", props, {
      headers: {
        "X-CSRF-Token": csrfToken,
      },
      withCredentials: true,
    });
  }

  // ✅ Login with Firebase
  async firebaseSignIn(
    props: FirebaseSignInProps,
  ): Promise<{ accessToken: string; refreshToken: string; sessionId: string }> {
    try {
      const { csrfToken } = await this.csrfToken();
      const { data } = await this.axios.post("/firebase-sign-in", props, {
        headers: {
          "X-CSRF-Token": csrfToken,
        },
        withCredentials: true,
      });
      return data;
    } catch (err: any) {
      console.error(
        "Firebase Sign-in Error:",
        err.response?.data || err.message,
      );
      throw new Error(err.response?.data?.error || "Firebase sign-in failed");
    }
  }

  // ✅ Logout user
  async signOut(sessionId: string): Promise<void> {
    // Destroy session on server
    const response = await this.axios.post(
      `/sign-out`,
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionId}`,
        },
        withCredentials: true,
      },
    );
    if (response.status === 200) {
      // Remove session from client
      window.sessionStorage.removeItem("sessionId");
      window.sessionStorage.removeItem("jwt");
      window.sessionStorage.removeItem("_csrf");
      window.sessionStorage.removeItem("accessToken");
      window.sessionStorage.removeItem("XSRF-TOKEN");
      window.location.href = "/";
      window.location.reload();
    }
  }

  // ✅ Get CSRF token
  async csrfToken(): Promise<{ csrfToken: string }> {
    const { data } = await this.axios.get("/csrf-token", {
      withCredentials: true,
    });
    return { csrfToken: data.csrfToken };
  }
}

export default UserRepoApi;
