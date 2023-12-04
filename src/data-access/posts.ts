import "server-only"

import { db } from '@/lib/drizzle'
import { Post, posts } from "@/db/schema/posts"
import { eq, and } from "drizzle-orm";

export type PostDto = {
    id:string;
    content:string | null;
    authorId:string;

}

export type CreatePostDto = {
    content:string;
    authorId:string;
}

const toDtoMapper = (post:Post) => {
    return {
        id:post.id,
        content:post.content,
        authorId:post.authorId
    }
}

export const getPosts = async():Promise<PostDto[]> => {
    const posts = await db.query.posts.findMany({});
    return posts.map(toDtoMapper);
}