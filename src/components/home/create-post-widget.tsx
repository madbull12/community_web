"use client";

import React, { FC, useEffect, useRef } from "react";
import UserAvatar from "@/components/user-avatar";
import { Input } from "@/components/ui/input";
import { UserProps } from "@/interface/users";
import { useToast } from "../ui/use-toast";
import { createPostAction } from "@/app/_actions/create_post_action";
import { useFormState } from "react-dom";

import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useRouter } from "next/navigation";

export function AlertDestructive() {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
  );
}

const CreatePostWidget: FC<UserProps> = ({ user }) => {
  const { toast, dismiss } = useToast();
  const router = useRouter();
  const [formState, onCreatePostAction] = useFormState(createPostAction, {
    form: {
      content: "",
    },
    status: "default",
  });
  console.log(formState.status);
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (formState.status === "success") {
      toast({
        title: "Post Created",
        description: "You have succesfully created post",
        variant: "success",
      });
      formRef.current?.reset();
    }
    if (formState.status === "error") {
      toast({
        title: "Oops... something went wrong",
        description: formState.errors,
        variant: "destructive",
      });
      formRef.current?.reset();
    }
    setTimeout(() => {
      dismiss();
    }, 2000);
  }, [toast, formState]);

  return (
    <>
      <section className="rounded-sm border-border border p-2 w-full flex gap-x-2 items-center">
        <UserAvatar
          src={user?.image as string}
          className=""
          fallback={user?.name?.split("")[0].charAt(0) as string}
        />
        <form ref={formRef} action={onCreatePostAction} className="w-full">
          <Input
            onClick={() => router.push("/submit")}
            name="content"
            placeholder="Create Post"
            className="px-4 py-2 w-full bg-secondary focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </form>
      </section>
      {formState.status === "field-errors" ? (
        <Error error={formState.errors.content as string} />
      ) : null}
    </>
  );
};

const Error = ({ error }: { error: string }) => {
  return <span className="text-red-400 text-xs">{error}</span>;
};

export default CreatePostWidget;
