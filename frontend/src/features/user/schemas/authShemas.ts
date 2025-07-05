import z from "zod";

export const LoginSchema = z.object({
    identity: z.string().min(3, "Email or username is required.").max(20, "Email or username is too long."),
    password: z.string().min(8, "Password is required.").max(18, "Password is too long."),
})

export type LoginFormInputs = z.infer<typeof LoginSchema>;