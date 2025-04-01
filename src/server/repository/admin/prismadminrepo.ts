import { SendEmailProps } from "../../types";
import { EmailService } from "../../services/emailService.js";

export class PrismAdminRepo {
  private emailService = new EmailService();

  async sendEmail(props: SendEmailProps): Promise<void> {
    await this.emailService.sendVerificationEmail(props.to, props.subject);
  }
}

export default PrismAdminRepo;
