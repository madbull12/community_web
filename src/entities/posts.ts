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
  private title: string;
  private media: string | null;
  private link: string[] | null;

  constructor({
    id,
    content,
    authorId,
    title,
    media,
    link,
  }: {
    id?: string;
    content: string;
    authorId: string;
    title: string;
    media: string | null;
    link: string[] | null;
  }) {
    this.id = id;
    this.content = content;
    this.authorId = authorId;
    this.title = title;
    this.media = media;
    this.link = link;
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

  getLink() {
    return this.link;
  }

  validate() {
    const postSchema = z.object({
      title: z.string().min(1),
      link: z.array(z.string().url()),
      content: z.string().nullable(),
      authorId: z.string().min(1),
    });

    try {
      postSchema.parse(this);
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
