import { z } from "zod";

export const LoginSchema = z.object({
  identifier: z.string().min(1, "Email or username is required"),
  password: z.string().min(1, "Password is required"),
});

export const SignupSchema = z.object({
  name: z.string().min(3, "Name is too short"),
  username: z
    .string()
    .min(1, "Username is required")
    .min(3, "Too short")
    .regex(/^[a-zA-Z0-9_]+$/, "Use letters, numbers, or _ only"),
  email: z.string().email("Enter a valid email"),
});


export const ForgotPasswordSchema = z.object({
  identifier: z.string().min(3, "Email or username is required"),
});

export type LoginFormInputs = z.infer<typeof LoginSchema>;
export type SignupFormInputs = z.infer<typeof SignupSchema>;
export type ForgotPasswordFormInputs = z.infer<typeof ForgotPasswordSchema>;
