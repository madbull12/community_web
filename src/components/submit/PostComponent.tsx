"use client";

import React, { useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { BookImage, BookText, Link, ListOrdered } from "lucide-react";
import { Input } from "@/components/ui/input";
import TitleInput from "./TitleInput";
import PostSection from "./PostSection";
import { useToast } from "../ui/use-toast";
import { useFormState } from "react-dom";
import { createPostAction } from "@/app/_actions/create_post_action";
import MediaSection from "./MediaSection";
import { Button } from "../ui/button";
import LinkSection from "./LinkSection";

const PostSubmitComponent = () => {
  const { toast, dismiss } = useToast();
  const [formState, onCreatePostAction] = useFormState(createPostAction, {
    form: {
      content: "",
    },
    status: "default",
  });
  console.log(formState.status);
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <Tabs defaultValue="post" className="w-full mt-4">
      <TabsList className="w-full flex [&>*]:h-full  [&>*]:flex-[0.25] h-12">
        <TabsTrigger value="post" className="flex items-center gap-x-2">
          <BookText size={20} />
          Post
        </TabsTrigger>
        <TabsTrigger className="flex items-center gap-x-2" value="media">
          <BookImage size={20} />
          Image & Video
        </TabsTrigger>
        <TabsTrigger value="link" className="flex items-center gap-x-2">
          <Link size={20} />
          Link
        </TabsTrigger>
        <TabsTrigger value="poll" className="flex items-center gap-x-2">
          <ListOrdered />
          Poll
        </TabsTrigger>
      </TabsList>
      <form
        className="p-4 bg-secondary"
        ref={formRef}
        action={onCreatePostAction}
      >
        <TitleInput />

        <TabsContent value="post">
          <PostSection />
        </TabsContent>
        <TabsContent value="media">
          <MediaSection />
        </TabsContent>
        <TabsContent value="link">
          <LinkSection />
        </TabsContent>
        <TabsContent value="poll"></TabsContent>
        <div className="flex items-center gap-x-2 mt-4 justify-end">
          <Button className="rounded-full" variant={"outline"}>
            Save draft
          </Button>
          <Button className="rounded-full px-4">Post</Button>
        </div>
      </form>
    </Tabs>
  );
};

export default PostSubmitComponent;
