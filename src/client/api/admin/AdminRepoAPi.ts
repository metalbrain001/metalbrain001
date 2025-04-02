// Admin Send email API endpoint
import { AxiosInstance } from "axios";
import { SendEmailProps } from "@/client/types";

export class AdminRepoApi {
  constructor(private axios: AxiosInstance) {}

  // ✅ Get admin details
  async getAdmin(localId: string): Promise<any> {
    const response = await this.axios.post(
      "/get-admin",
      { localId },
      { withCredentials: true },
    );
    return response.data;
  }

  async sendEmail(props: SendEmailProps): Promise<void> {
    await this.axios.post("/admin/send-email", props, {
      withCredentials: true,
    });
  }
}

export default AdminRepoApi;
