// Admin Send email API endpoint
import { AxiosInstance } from "axios";
import { SendEmailProps } from "@/client/types";

export class AdminRepoApi {
  constructor(private axios: AxiosInstance) {}

  async sendEmail(props: SendEmailProps): Promise<void> {
    await this.axios.post("/admin/send-email", props, {
      withCredentials: true,
    });
  }
}

export default AdminRepoApi;
