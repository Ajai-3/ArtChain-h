import { z } from "zod";

export const LoginSchema = z.object({
  identifier: z.string().min(1, "Email or username is required"),
  password: z.string().min(1, "Password is required"),
});

export const SignupSchema = z.object({
  name: z
    .string()
    .min(3, "Name is too short")
    .regex(/^[A-Za-z\s]+$/, "Only letters and spaces allowed"),
  username: z
    .string()
    .min(1, "Username is required")
    .min(3, "Too short")
    .regex(/^[a-zA-Z0-9_]+$/, "Use letters, numbers, or _ only"),
  email: z.string().email("Enter a valid email"),
});

export const ForgotPasswordSchema = z.object({
  identifier: z
    .string()
    .min(1, "Email or username is required")
    .refine((val) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
      return emailRegex.test(val) || usernameRegex.test(val);
    }, {
      message: "Enter a valid email or username",
    }),
});

export type LoginFormInputs = z.infer<typeof LoginSchema>;
export type SignupFormInputs = z.infer<typeof SignupSchema>;
export type ForgotPasswordFormInputs = z.infer<typeof ForgotPasswordSchema>;
