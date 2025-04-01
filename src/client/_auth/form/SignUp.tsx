"use client";
import React from "react";
import AuthForm from "@/client/_auth/form/AuthForm";
import { SignUpSchema } from "@/client/lib/validation";
import { useSignUp } from "@/client/hooks/use-signup";

const SignUp = () => {
  const signUp = useSignUp();
  return (
    <AuthForm
      schema={SignUpSchema}
      defaultValues={{ name: "", email: "", password: "" }}
      onSubmit={(data) => {
        return new Promise((resolve) => {
          signUp.mutate(data, {
            onSuccess: () => resolve({ success: true, error: "" }),
            onError: (err: any) =>
              resolve({
                success: false,
                error: err.message || "Unknown error",
              }),
          });
        });
      }}
      type="signup"
    />
  );
};

export default SignUp;
