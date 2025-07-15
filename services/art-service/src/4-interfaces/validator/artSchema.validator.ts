import z from "zod";
const ART_TYPES = ["digital", "ai", "painting"];

export const CreateArtworkSchema = z.object({
  userId: z.string().min(1, "User ID is required"), 

  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title can't exceed 100 characters"),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(2000, "Description can't exceed 2000 characters")
    .optional(),

  tags: z.array(z.string()).optional(), 

  images: z
    .array(z.string())
    .min(1, "At least one image is required"),

  nsfw: z.boolean().optional(),

  isCollectible: z.boolean().optional(),

  artType: z.enum(ART_TYPES, {
    errorMap: () => ({ message: "Please select an art type" }),
  }),

  price: z.number().optional(),

  downloadAccess: z.boolean().optional(),

  isCommentEnabled: z.boolean().optional(),
});
