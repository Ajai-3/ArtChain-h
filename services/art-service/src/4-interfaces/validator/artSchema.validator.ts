import z from "zod";

export const CreateArtworkSchema = z.object({
  userId: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
  images: z.array(z.string()).min(1),
  nsfw: z.boolean().optional(),
  isCollectible: z.boolean().optional(),
  artType: z.string().optional(),
  price: z.number().optional(),
  downloadAccess: z.boolean().optional(),
  isCommentEnabled: z.boolean().optional(),
});