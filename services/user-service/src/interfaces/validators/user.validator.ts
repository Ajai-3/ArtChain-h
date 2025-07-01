import { z } from "zod";

//#==================================================================================================================
//# REGISTER USER SCHEMA VALIDATION
//#==================================================================================================================
export const registerUserSchema = z.object({
  name: z
    .string()
    .min(3, "Name too short")
    .max(20, "Name too long")
    .regex(/^[A-Za-z ]+$/, "Only letters and spaces allowed"),

  username: z
    .string()
    .min(3, "Username too short")
    .max(20, "Username too long")
    .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, underscores allowed"),

  email: z.string().email("Invalid email"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .refine(
      (val) =>
        /[A-Z]/.test(val) &&
        /[a-z]/.test(val) &&
        /[0-9]/.test(val) &&
        /[^A-Za-z0-9]/.test(val),
      "Password must include A-Z, a-z, 0-9, and a symbol"
    ),
});

//#==================================================================================================================
//# LOGIN USER SCHEMA VALIDATION
//#==================================================================================================================
export const loginUserSchema = z.object({
  emailOrUsername: z.string().min(3, "Email or username is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
