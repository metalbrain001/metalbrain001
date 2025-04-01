import { z } from "zod";

export const SignUpSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const EmailSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});
