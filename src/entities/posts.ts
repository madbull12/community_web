import { ZodError, z } from "zod";

type ValidatedFields = "content" | "authorId";

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

  constructor({
    id,
    content,
    authorId,
  }: {
    id?: string;
    content: string;
    authorId: string;
  }) {
    this.id = id;
    this.content = content;
    this.authorId = authorId;
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

  validate() {
    const itemSchema = z.object({
      content: z.string().min(1),
      authorId: z.string().min(1),
    });

    try {
      itemSchema.parse(this);
    } catch (err) {
      const error = err as ZodError;
      const errors = error.flatten().fieldErrors;
      throw new PostEntityValidationError({
        content: errors.content?.[0],
        authorId: errors.authorId?.[0],
      });
    }
  }
}
