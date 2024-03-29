"use server"

import { auth } from "@/auth"
import { ValidationError, createPostUseCase } from "@/use-cases/posts"
import { User } from "next-auth"
import { createPost } from "@/data-access/posts"
import { revalidatePath } from "next/cache"
import { PostSchema, postSchema } from "@/lib/validations/posts"

type Data = {
  content:string;
  title:string;
  tags?:string[];
  media?:string;
}

type CreatePostState = { data:Data } & (
  | {
      status: "success";
    }
  | {
      status: "error";
      errors: string;
    }
  | {
      status: "field-errors";
      errors: Partial<Record<keyof Data, string>>;
    }
  | {
      status: "default";
    }
);



export const createPostAction = async(values:PostSchema,mediaUrl?:string):Promise<CreatePostState>=>{
  // const validatedFields = postSchema.safeParse(values);  
  // if (!validatedFields.success) {
  //   return {
  //       data:{
  //         content:"",
  //         title:"",
  //         // link:[]
  //       },
  //       status:"error",
  //       errors:"Invalid fields!"
  //     }
    

  //   };

  const { title,content,tags } = values;
  const mappedTags = tags?.map((tag)=>tag.text);
  const submittedData = {
    title,
    content,
    tags:mappedTags,
    media:mediaUrl
  }


  const user = await auth()

  try {
    await createPostUseCase({
      user:user?.user as User,
      createPost

    },submittedData)
    revalidatePath("/");

   
    return {
      data:submittedData,
      status:"success",

    };
  }catch(err) {
    const error = err as Error;
    if (error instanceof ValidationError) {
      return {
        data: submittedData as Data,
        status: "field-errors",
        errors: error.getErrors(),
      };
    } else {
      return {
        data: submittedData as Data,

        status: "error",
        errors: error.message,
      };
    }
  }


}