import { PostDto } from "@/data-access/posts";
import { User } from "next-auth";

type GetUser = () => User | undefined;
type CreatePost =(postDto:PostDto) => void;

type CreatePostCtx = {
  getUser: GetUser;
  createPost:CreatePost;
};

export class AuthenticationError extends Error {
    constructor() {
        super("You must be authenticated to do this action");
    }
}

export const createPostUseCase = async (ctx: CreatePostCtx) => {
    const user = ctx.getUser();
    if (!user) {
        throw new AuthenticationError();
      }
    
};
