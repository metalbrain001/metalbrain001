// src/client/hooks/useSendEmail.ts
import { useState } from "react";
import { SendEmailProps } from "@/client/types";
import AdminRepoApi from "@/client/api/admin/AdminRepoAPi.js";
import axiosInstance from "@/client/api/axios";

const adminRepo = new AdminRepoApi(axiosInstance);

export const useSendEmail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const sendEmailToUser = async (props: SendEmailProps) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await adminRepo.sendEmail(props);
      setSuccess(true);
    } catch (err: any) {
      setError(err?.response?.data?.error || "Failed to send email");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, sendEmailToUser };
};

export default useSendEmail;
