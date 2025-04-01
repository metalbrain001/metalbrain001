// src/client/components/forms/EmailForm.tsx
"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { EmailSchema } from "@/client/lib/validation";

type EmailFormValues = z.infer<typeof EmailSchema>;

interface EmailFormProps {
  onSubmit: (email: string) => Promise<void>;
  loading?: boolean;
}

const EmailForm: React.FC<EmailFormProps> = ({ onSubmit, loading = false }) => {
  const form = useForm<EmailFormValues>({
    resolver: zodResolver(EmailSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (data: EmailFormValues) => {
    try {
      await onSubmit(data.email);
      toast.success("Email sent successfully!");
      form.reset();
    } catch (err: any) {
      toast.error("Failed to send email", {
        description: err?.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-lg w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4 text-white">Send an Email</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <Label className="text-sm text-gray-300">
                  <FormControl>
                    <Input
                      placeholder="e.g. user@example.com"
                      {...field}
                      className="bg-gray-800 text-white border-gray-700"
                      autoComplete="email"
                    />
                  </FormControl>
                </Label>
                <FormMessage className="text-red-400 text-sm" />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Sending..." : "Send Email"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EmailForm;
