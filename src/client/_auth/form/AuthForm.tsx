"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  UseFormReturn,
  useForm,
} from "react-hook-form";
import { ZodType } from "zod";
// import { Button } from "@/components/ui/button";
import Button from "@/client/components/Button";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { FIELD_NAMES, FIELD_TYPES } from "@/client/constants";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import GoogleSignInButton from "@/client/components/GoogleSignInBtn";

interface Props<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error: string }> | void;
  type: "login" | "signup";
}

const AuthForm = <T extends FieldValues>({
  schema,
  defaultValues,
  onSubmit,
  type,
}: Props<T>) => {
  const isSign = type === "login";
  const form: UseFormReturn<T> = useForm<T>({
    defaultValues: defaultValues as DefaultValues<T>,
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();

  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = await onSubmit(data);
    if (result && result.success) {
      toast(`Successfully ${isSign ? "signed in" : "signed up"}`, {
        description: `Welcome back, ${data.email}`,
      });
      navigate("/dashboard");
    } else {
      toast("Error", {
        description: isSign
          ? "Invalid email or password"
          : result?.error || "An error occurred",
      });
    }
  };
  return (
    <div className="auth_container">
      <div className="auth_inner_container">
        <h1 className="text-3xl font-bold font-poppins text-white mb-2 text-center">
          {isSign ? "Welcome back to Metal-brain" : "Join Metal-brain"}
        </h1>
        <p className="text-gray-400 text-center mb-6 text-sm">
          {isSign
            ? "Access streamlined workflows, code intelligence, and developer insights"
            : "Create an account to accelerate your development process"}
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6 w-full items-center justify-center"
          >
            {Object.keys(defaultValues).map((field) => (
              <FormField
                key={field}
                control={form.control}
                name={field as Path<T>}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize text-gray-400 text-2xl">
                      {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                    </FormLabel>
                    <FormControl>
                      <input
                        required
                        {...field}
                        className="auth_form_input"
                        type={
                          FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                        }
                        autoComplete="on"
                        placeholder={`Enter your ${
                          FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]
                        }`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button type="submit" variant="secondary" className="mb-8">
              {isSign ? "Sign In" : "create account"}
            </Button>
          </form>
        </Form>
        <p className="text-gray-200 text-lg text-center font-poppins">
          {isSign ? "Don't have an account?" : "Already have an account?"}
          <Link
            to={isSign ? "/sign-up" : "/login"}
            className="text-lime-100 text-center mt-2 gap-4 hover:underline"
          >
            {" "}
            {isSign ? "create an account" : "login"}
          </Link>
        </p>
        <div className="flex items-center my-4">
          <hr className="flex-grow border-t border-gray-600" />
          <span className="mx-2 text-gray-400 text-sm">or</span>
          <hr className="flex-grow border-t border-gray-600" />
        </div>
        <GoogleSignInButton />
      </div>
    </div>
  );
};

export default AuthForm;
