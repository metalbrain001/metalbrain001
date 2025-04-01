"use client";
import React from "react";
import AuthForm from "@/client/_auth/form/AuthForm";
import { SignInSchema } from "@/client/lib/validation";
import { useSignIn } from "@/client/hooks/use-signin";

const SignIn = () => {
  const signIn = useSignIn();
  return (
    <AuthForm
      schema={SignInSchema}
      defaultValues={{ email: "", password: "" }}
      onSubmit={(data) => {
        return new Promise((resolve) => {
          signIn.mutate(data, {
            onSuccess: () => resolve({ success: true, error: "" }),
            onError: (err: any) =>
              resolve({
                success: false,
                error: err.message || "Unknown error occurred",
              }),
          });
        });
      }}
      type="login"
    />
  );
};

export default SignIn;
