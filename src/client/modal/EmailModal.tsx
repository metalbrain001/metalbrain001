// src/client/components/modals/EmailModal.tsx
"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { MailIcon } from "lucide-react";
import EmailForm from "@/client/_auth/form/EmailForm";
import useSendEmail from "@/client/hooks/use-sendemail";
import { Button } from "@/components/ui/button";

const EmailModal = () => {
  const [open, setOpen] = useState(false);
  const { loading, sendEmailToUser } = useSendEmail();

  // ✅ Must be async to match expected type
  const handleSubmit = async (email: string): Promise<void> => {
    try {
      await sendEmailToUser({
        to: email,
        subject: "Welcome",
        body: "Hello from MetalBrain!",
      });
      setOpen(false);
    } catch (err) {
      console.error("Send email error", err);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="dialog_btn ">
          <MailIcon className="w-4 h-4" />
          <span>Send Email</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="dialog_content">
        <DialogHeader>
          <DialogTitle className="text-lg text-white">
            Send Email to User
          </DialogTitle>
          <DialogDescription>
            Enter recipient's email and your message to send a custom
            notification.
          </DialogDescription>
        </DialogHeader>
        <EmailForm onSubmit={handleSubmit} loading={loading} />
      </DialogContent>
    </Dialog>
  );
};

export default EmailModal;
