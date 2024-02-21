import { z } from "zod";

export const postSchema = z.object({
  content: z.string().min(1),
  title:z.string().min(1),
  // link: z.array(z.string().url()),
  // authorId: z.string().min(1),
  // media:z.string()
});

export type PostSchema = z.infer<typeof postSchema>