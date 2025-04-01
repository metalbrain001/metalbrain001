// src/server/services/emailService.ts
import nodemailer from "nodemailer";
import { config } from "../config.js";

export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.Email.host,
      port: config.Email.port,
      secure: config.Email.secure,
      auth: config.Email.auth,
      tls: config.Email.tls,
      requireTLS: config.Email.requireTLS,
      debug: config.Email.debug,
    });
  }

  async sendVerificationEmail(to: string, token: string) {
    const link = `${process.env.ORIGIN}/verify-email?token=${token}`;
    await this.transporter.sendMail({
      from: `"MetalBrain" <${config.Email.auth.user}>`,
      to,
      subject: "Verify your email address",
      html: `
        <h3>Email Verification</h3>
        <p>Click below to confirm your email:</p>
        <a href="${link}">${link}</a>
      `,
    });
  }
}

export default EmailService;
