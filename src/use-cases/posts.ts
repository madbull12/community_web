import { PostDto } from "@/data-access/posts";
import { PostEntity, PostEntityValidationError } from "@/entities/posts";
import { User } from "next-auth";

// type UserProps = User;
type CreatePost =(postDto:PostDto) => void;

type CreatePostCtx = {
  user:User
  createPost:CreatePost;
};

export class ValidationError extends Error {
    private errors: Record<string, string | undefined>;
  
    constructor(errors: Record<string, string | undefined>) {
      super("An validation error occured");
      this.errors = errors;
    }
  
    getErrors() {
      return this.errors;
    }
  }
  

export class AuthenticationError extends Error {
    constructor() {
        super("You must be authenticated to do this action");
    }
}

// type PostWithoutId = Omit<PostDto,"id">

export const postToCreateDtoMapper = (postEntity:PostEntity):PostDto=> {
    return {
        content:postEntity.getContent(),
        authorId:postEntity.getAuthorId(),
        // id:postEntity.getId() as string,
    }
}

export const createPostUseCase = async (ctx: CreatePostCtx,data:{
    content:string,
}) => {
    const user = ctx.user
    if (!user) {
        throw new AuthenticationError();
      }
    

    const newPost = new PostEntity({
        authorId:user.id,
        content:data.content

    });

    try {
        newPost.validate();
    } catch(err) {
        const error = err as PostEntityValidationError;
        
        throw new ValidationError(error.getErrors());
    }

    await ctx.createPost(postToCreateDtoMapper(newPost))
};
