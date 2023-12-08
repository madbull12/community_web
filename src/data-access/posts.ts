import "server-only";

import { db } from "@/lib/drizzle";
import { Post, posts } from "@/db/schema/posts";
import { eq, and } from "drizzle-orm";

export type PostDto = {
  id: string;
  content: string | null;
  authorId: string;
};

export type CreatePostDto = {
  content: string;
  authorId: string;
};

export type PostId = string;

const toDtoMapper = (post: Post) => {
  return {
    id: post.id,
    content: post.content,
    authorId: post.authorId,
  };
};

export const getPosts = async (): Promise<PostDto[]> => {
  const posts = await db.query.posts.findMany({});
  return posts.map(toDtoMapper);
};

export async function createPost(post: CreatePostDto): Promise<void> {
  await db.insert(posts).values(post);
}

export async function deletePost(postId: PostId): Promise<void> {

  const postToDelete = await db.query.posts.findFirst({
    where:eq(posts.id,postId)
  });

  if(!postToDelete) {
    throw new Error("Post not found!")
  }

  await db.delete(posts).where(eq(posts.id, postId));
}

export async function updatePost(post: PostDto): Promise<void> {
  await db.update(posts).set(post).where(eq(posts.id, post.id));
}

export async function getPost(postId: PostId): Promise<PostDto> {
  const post = await db.query.posts.findFirst({
    where: eq(posts.id, postId),
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
  });

  return postsByUserId.map(toDtoMapper);
}
