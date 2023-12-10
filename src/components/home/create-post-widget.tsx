"use client";

import React, { FC, useEffect, useRef } from "react";
import UserAvatar from "@/components/user-avatar";
import { Input } from "@/components/ui/input";
import { UserProps } from "@/interface/users";
import { useToast } from "../ui/use-toast";
import { createPostAction } from "@/app/_actions/create_post_action";
import { useFormState } from "react-dom";
const CreatePostWidget:FC<UserProps> = ({user}) => {
  const { toast } = useToast();
  const [formState,onCreatePostAction] = useFormState(createPostAction,{
    form:{
      content:""
    },
    status:"default"
  });
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (formState.status === "success") {
      toast({
        title: "Post Created",
        description: "You have succesfully created post",
      });
      formRef.current?.reset();
    }
  }, [toast, formState]);

  return (
    <section className="rounded-sm border-border border p-2 w-full flex gap-x-2 items-center">
      <UserAvatar
        src={user?.image as string}
        className=""
        fallback={user?.name?.split("")[0].charAt(0) as string}
      />
      <form ref={formRef} action={onCreatePostAction} className="w-full">
        <Input name="content" placeholder="Create Post" className="px-4 py-2 w-full bg-secondary focus-visible:ring-0 focus-visible:ring-offset-0" />

      </form>
    </section>
  );
};

export default CreatePostWidget;
