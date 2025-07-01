import { z } from "zod";

//#==================================================================================================================
//# REGISTER USER SCHEMA VALIDATION
//#==================================================================================================================
export const registerUserSchema = z.object({
  name: z.string().min(3).max(20).regex(/^[A-Za-z ]+$/, "Only letters & spaces"),
  username: z.string().min(3).max(20).regex(/^[a-zA-Z0-9_]+$/, "Use letters, numbers, _"),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .refine(val =>
      /[A-Z]/.test(val) &&
      /[a-z]/.test(val) &&
      /[0-9]/.test(val) &&
      /[^A-Za-z0-9]/.test(val),
      "Must include A-Z, a-z, 0-9, symbol"
    )
});