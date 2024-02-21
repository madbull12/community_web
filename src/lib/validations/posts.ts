import { z } from "zod";

export const postSchema = z.object({
  content: z.string().min(1),
  title:z.string().min(1),
  tags: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
    })
  ).optional(),
  // link: z.array(z.string().url()),
  // authorId: z.string().min(1),
  // media:z.string()
});

export type PostSchema = z.infer<typeof postSchema>