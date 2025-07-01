import { z } from "zod";

//#==================================================================================================================
//# REGISTER USER SCHEMA VALIDATION
//#==================================================================================================================
export const registerUserSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name too short" })
    .max(20, { message: "Name too long" })
    .regex(/^[A-Za-z ]+$/, { message: "Only letters & spaces" }),

  username: z
    .string()
    .min(3, { message: "Username too short" })
    .max(20, { message: "Username too long" })
    .regex(/^[a-zA-Z0-9_]+$/, { message: "Use letters, numbers, _" }),

  email: z
    .string()
    .email({ message: "Invalid email" }),

  password: z
    .string()
    .min(8, { message: "Min 8 chars" })
    .refine(
      (val) =>
        /[A-Z]/.test(val) &&
        /[a-z]/.test(val) &&
        /[0-9]/.test(val) &&
        /[^A-Za-z0-9]/.test(val),
      {
        message: "Must include A-Z, a-z, 0-9, symbol",
      }
    ),
});
