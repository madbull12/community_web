"use server"

import { auth } from "@/auth"
import { ValidationError, createPostUseCase } from "@/use-cases/posts"
import { User } from "next-auth"
import { createPost } from "@/data-access/posts"
import { revalidatePath } from "next/cache"

type Form = {
  content:string;
}

type CreatePostState = { form: Form } & (
  | {
      status: "success";
    }
  | {
      status: "error";
      errors: string;
    }
  | {
      status: "field-errors";
      errors: Partial<Record<keyof Form, string>>;
    }
  | {
      status: "default";
    }
);



export const createPostAction = async(state:CreatePostState,formData:FormData):Promise<CreatePostState>=>{


  const submittedForm = {
    content:formData.get("content"),
  }

  const user = await auth()

  try {
    await createPostUseCase({
      user:user?.user as User,
      createPost:(submittedForm)=>submittedForm

    },{
      content:submittedForm.content as string,
      
    })
    revalidatePath("/");
    return {
      form:{
        content:""
      },
      status:"success",

    };
  }catch(err) {
    const error = err as Error;
    if (error instanceof ValidationError) {
      return {
        form: submittedForm as Form,
        status: "field-errors",
        errors: error.getErrors(),
      };
    } else {
      return {
        form: submittedForm as Form,

        status: "error",
        errors: error.message,
      };
    }
  }


}