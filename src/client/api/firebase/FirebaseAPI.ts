// Project: Firebase Admin API
import { AxiosInstance } from "axios";

export class FirebaseApi {
  constructor(private axios: AxiosInstance) {}

  async getUser(props: { idToken: string }): Promise<any> {
    const response = await this.axios.post(
      "/get-firebase-user", // ✅ Corrected endpoint
      { idToken: props.idToken },
      { withCredentials: true },
    );
    return response.data;
  }
}

export default FirebaseApi;
