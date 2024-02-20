import { z } from "zod";

export const postSchema = z.object({
  content: z.string().min(1),
  title:z.string().min(1),
  link:z.string(),
  authorId: z.string().min(1),
});

export type PostSchema = z.infer<typeof postSchema>