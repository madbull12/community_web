"use client";

import React from "react";
import { Tabs,  TabsList, TabsTrigger } from "../ui/tabs";
import { BookImage, BookText, Hash, ListOrdered } from "lucide-react";

import PostForm from "./post-form";

const PostSubmitComponent = () => {


  // const handleContent = (e:React.FormEvent<HTMLInputElement>) => {
  //   setContent(e.currentTarget.value)
  // }


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
        <TabsTrigger value="tags" className="flex items-center gap-x-2">
        <Hash size={20}/>
          Tags 
        </TabsTrigger>
        <TabsTrigger value="poll" className="flex items-center gap-x-2">
          <ListOrdered />
          Poll
        </TabsTrigger>
      </TabsList>
      <PostForm />
      
      {/* <form
        className="p-4 bg-secondary"
        ref={formRef}
        action={onCreatePostAction}
      >
        <Input
          className="focus-visible:ring-violet-400"
          // onChange={(e) => setTitle(e.target.value)}
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
      </form> */}
    </Tabs>
  );
};

export default PostSubmitComponent;
