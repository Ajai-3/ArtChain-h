import { count } from "console";
import { z } from "zod";

//#==================================================================================================================
//# START REGISTER USER SCHEMA VALIDATION
//#==================================================================================================================
export const startRegisterSchema = z.object({
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
});

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
      "Password must include uppercase, lowercase, number, and symbol"
    ),
});

//#==================================================================================================================
//# LOGIN USER SCHEMA VALIDATION
//#==================================================================================================================
export const loginUserSchema = z.object({
  identifier: z.string().min(3, "Invalid email or username"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

//#===================================================================================================================
//# PASSWORD AND TOKEN SCHEMA VALIDATION
//#===================================================================================================================
export const passwordTokenSchema = z.object({
  token: z.string().min(10, "Invalid token"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .refine(
      (val) =>
        /[A-Z]/.test(val) &&
        /[a-z]/.test(val) &&
        /[0-9]/.test(val) &&
        /[^A-Za-z0-9]/.test(val),
      "Password must include uppercase, lowercase, number, and symbol"
    ),
});

//#==================================================================================================================
//# CURRENT PASSWORD NEW PASSWORD SCHEMA VALIDATION
//#==================================================================================================================
export const currentPasswordNewPasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .refine(
        (val) =>
          /[A-Z]/.test(val) &&
          /[a-z]/.test(val) &&
          /[0-9]/.test(val) &&
          /[^A-Za-z0-9]/.test(val),
        "Password must include uppercase, lowercase, number, and symbol"
      ),
  })
  .refine((data) => data.newPassword !== data.currentPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  });

//#===================================================================================================================
//# UPDATE USER SCHEMA VALIDATION
//#===================================================================================================================
export const updateUserSchema = z.object({
  name: z
    .string()
    .min(3, "Name too short")
    .max(20, "Name too long")
    .regex(/^[A-Za-z ]+$/, "Only letters and spaces allowed")
    .optional(),

  username: z
    .string()
    .min(3, "Username too short")
    .max(20, "Username too long")
    .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, underscores allowed")
    .optional(),

  bio: z
    .string()
    .transform((val) => (val.trim() === "" ? undefined : val))
    .refine((val) => !val || val.length >= 3, { message: "Bio too short" })
    .refine((val) => !val || val.length <= 100, { message: "Bio too long" })
    .optional(),

  country: z
    .string()
    .transform((val) => (val.trim() === "" ? undefined : val))
    .refine((val) => !val || val.length >= 3, { message: "Country too short" })
    .refine((val) => !val || val.length <= 20, { message: "Country too long" })
    .optional(),

  profileImage: z.string().optional(),
  bannerImage: z.string().optional(),
  backgroundImage: z.string().optional(),
});
