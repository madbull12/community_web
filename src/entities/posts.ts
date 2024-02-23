import { ZodError, z } from "zod";

type ValidatedFields = "content" | "authorId" | "title";

export class PostEntityValidationError extends Error {
  private errors: Record<ValidatedFields, string | undefined>;

  constructor(errors: Record<ValidatedFields, string | undefined>) {
    super("An error occured validating a post entity");
    this.errors = errors;
  }

  getErrors() {
    return this.errors;
  }
}

export class PostEntity {
  private id?: string;
  private content: string;
  private authorId: string;
  private title: string;
  private media: string | null;
  private tags: string[] | null;

  constructor({
    id,
    content,
    authorId,
    title,
    media,
    tags,
  }: {
    id?: string;
    content: string;
    authorId: string;
    title: string;
    media: string | null;
    tags: string[] | null;
  }) {
    this.id = id;
    this.content = content;
    this.authorId = authorId;
    this.title = title;
    this.media = media;
    this.tags = tags;
  }

  getContent() {
    return this.content;
  }
  getAuthorId() {
    return this.authorId;
  }
  getId() {
    return this.id;
  }

  getTitle() {
    return this.title;
  }

  getMedia() {
    return this.media;
  }

  getTags() {
    return this.tags;
  }

  validate() {
    const postSchema = z.object({
      title: z.string().min(1),
      tags: z.array(z.string()).optional(),
      content: z.string().min(1),
      authorId: z.string().min(1),
      media:z.string().optional(),
    });

    try {
      postSchema.parse(this);
    } catch (err) {
      const error = err as ZodError;
      const errors = error.flatten().fieldErrors;
      throw new PostEntityValidationError({
        content: errors.content?.[0],
        authorId: errors.authorId?.[0],
        title:errors.title?.[0]
      });
    }
  }
}
