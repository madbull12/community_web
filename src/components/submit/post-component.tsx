"use client";

import React, { useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { BookImage, BookText, Link, ListOrdered } from "lucide-react";
import { Input } from "@/components/ui/input";
import TitleInput from "./title-input";
import PostSection from "./post-section";
import { useToast } from "../ui/use-toast";
import { useFormState } from "react-dom";
import { createPostAction } from "@/app/_actions/create_post_action";
import MediaSection from "./media-section";
import { Button } from "../ui/button";
import LinkSection from "./link-section";
import { cn } from "@/lib/utils";

const PostSubmitComponent = () => {
  const { toast, dismiss } = useToast();
  const [title, setTitle] = useState<string>("");
  const [content,setContent] = useState<string>("");

  // const handleContent = (e:React.FormEvent<HTMLInputElement>) => {
  //   setContent(e.currentTarget.value)
  // }

  const [formState, onCreatePostAction] = useFormState(createPostAction, {
    form: {
      content: "",
      title:"",
      link:""
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
        <Input
          className="focus-visible:ring-violet-400"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          name="title"
        />

        <TabsContent value="post">
          <PostSection content={content} setContent={setContent} />
        </TabsContent>
        <TabsContent value="media">
          <MediaSection />
        </TabsContent>
        <TabsContent value="link">
          <LinkSection />
        </TabsContent>
        <TabsContent value="poll"></TabsContent>
        <div className="flex items-center gap-x-2 mt-4 justify-end">
          <Button type="button" className="rounded-full" variant={"outline"}>
            Save draft
          </Button>
          <Button type="submit"  className={cn("rounded-full px-4 ",{
            "cursor-not-allowed" : title===""
          })} disabled={title===""}>Post</Button>
        </div>
      </form>
    </Tabs>
  );
};

export default PostSubmitComponent;
