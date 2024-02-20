"use client";

import React, { useTransition } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { PostSchema, postSchema } from "@/lib/validations/posts";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TabsContent } from "@/components/ui/tabs";
import PostSection from "./post-section";
import { createPostAction } from "@/app/_actions/create_post_action";
import MediaSection from "@/components/submit/media-section";
import LinkSection from "@/components/submit/link-section";
import useImageFileStore from "@/store/use-image-file";
import { useEdgeStore } from "@/lib/edgestore";
const PostForm = () => {
  const [isPending, startTransition] = useTransition();
  // const { files } = useImageFileStore();
  const form = useForm<PostSchema>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      content: "",
      title: "",
      link:""
    },
  });
  const { edgestore } = useEdgeStore();
  const { file } = useImageFileStore();
  function onSubmit(values: PostSchema) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    let mediaUpload:any;

    startTransition(async() => {
      if(file) {
        mediaUpload = await edgestore.publicFiles.upload({
          file:file,
          onProgressChange: (progress) => {
            // you can use this to show a progress bar
            console.log(progress);

          },
        });
      }
 
      createPostAction(values,mediaUpload.url);
    });
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="p-4 bg-secondary space-y-4"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <TabsContent value="post">
          <PostSection />
        </TabsContent>
        <TabsContent value="media">
          <MediaSection />
        </TabsContent>
        <TabsContent value="link">
          <LinkSection />
        </TabsContent>
        <Button type="submit" disabled={isPending}>
          Post
        </Button>
      </form>
    </Form>
  );
};

export default PostForm;
