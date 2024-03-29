import "server-only";

import { db } from "@/lib/drizzle";
import { Post, postTags, posts } from "@/db/schema/posts";
import { eq, and, inArray } from "drizzle-orm";
import { User } from "next-auth";
import { Tag, tags } from "@/db/schema/tags";

export type PostDto = {
  id?: string;
  content: string | null;
  authorId?: string;
  author: User;
  createdAt: Date;
  title: string;
  media: string | null;
  postTags: {
    postId: string;
    tagId: string;
    tag: {
      tag: string;
    };
  }[];
};

export type CreatePostDto = {
  content: string;
  authorId: string;
  title: string;
  media: string | null;
  tags?: string[] | null
};

export type PostId = string;

const toDtoMapper = (post: PostDto) => {
  return {
    id: post.id,
    content: post.content,
    authorId: post.authorId,
    author: post.author,
    media: post.media,
    postTags: post.postTags,
    title: post.title,
    createdAt: post.createdAt
  };
};

export const getPosts = async (): Promise<PostDto[]> => {
  const posts = await db.query.posts.findMany({
    with: {
      author: true,
      postTags: {
        with: {
          tag: {
            columns: {
              tag: true
            }
          }
        }
      }
    },
    orderBy: (posts, { desc }) => [desc(posts.createdAt)],
  });
  return posts.map(toDtoMapper);
};

export async function createPost(post: CreatePostDto): Promise<void> {
  const [insertedPost] = await db.insert(posts).values(post).returning();
  if (post?.tags) {

    const existingTags = await db
      .select({ id: tags.id, tags: tags.tag })
      .from(tags)
      .where(inArray(tags.tag, post?.tags));

      if(existingTags) {
        for (const tag of existingTags) {
          await db.insert(postTags).values({ postId: insertedPost.id, tagId: tag.id }).execute();
        }
      }

    for (const tagName of post?.tags) {
      // Insert tags here. This example assumes you handle the existence check of a tag separately.
      const [insertedTag] = await db.insert(tags).values({ tag: tagName }).returning();

      // Insert the relationship into the junction table (assuming 'postTags' as your junction table).
      await db.insert(postTags).values({
        postId: insertedPost.id,
        tagId: insertedTag.id
      });
    }
  }
}

export async function deletePost(postId: PostId): Promise<void> {
  const postToDelete = await db.query.posts.findFirst({
    where: eq(posts.id, postId),
  });

  if (!postToDelete) {
    throw new Error("Post not found!");
  }

  await db.delete(posts).where(eq(posts.id, postId));
}

export async function updatePost(post: PostDto): Promise<void> {
  await db
    .update(posts)
    .set(post)
    .where(eq(posts.id, post?.id as string));
}

export async function getPost(postId: PostId): Promise<PostDto> {
  const post = await db.query.posts.findFirst({
    where: eq(posts.id, postId),
    with: {
      author: true,
      postTags: {
        with: {
          tag: {
            columns: {
              tag: true
            }
          }
        }
      }
    },

  });

  if (!post) {
    throw new Error("could not find item");
  }

  return toDtoMapper(post);
}

export async function getPostsByUserId(
  postId: PostId,
  userId: string
): Promise<PostDto[]> {
  const postsByUserId = await db.query.posts.findMany({
    where: and(eq(posts.id, postId), eq(posts.authorId, userId)),
    with: {
      author: true,
      postTags: {
        with: {
          tag: {
            columns: {
              tag: true
            }
          }
        }
      }
    },
  });

  return postsByUserId.map(toDtoMapper);
}
