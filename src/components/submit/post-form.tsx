"use client";

import React, { useState, useTransition } from "react";
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
import { useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import useTagStore from "@/store/use-tag-store";
const PostForm = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  // const { files } = useImageFileStore();
  const form = useForm<PostSchema>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      content: "",
      title: "",
      // link: [],
    },
  });

  const toastCall = () => {
    toast("Post has been created", {
      // description: "Sunday, December 03, 2023 at 9:00 AM",
      action: {
        label: "Dismiss",
        onClick: () => toast.dismiss(),
      },
      duration: 2000,
    });
  };

  const toastError = () => {
    toast("An error occured when creating a post", {
      // description: "Sunday, December 03, 2023 at 9:00 AM",
      action: {
        label: "Dismiss",
        onClick: () => toast.dismiss(),
      },
      duration: 2000,
    });
  };

  const { edgestore } = useEdgeStore();
  const { file, setFile, setPreview, setProgress, setIsUploading } =
    useImageFileStore();

    const { setTags } = useTagStore()
  const resetForm = () => {
    form.reset();
    setFile(undefined);
    setPreview(undefined);
    setTags([])
  };
  function onSubmit(values: PostSchema) {
    console.log(values);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    startTransition(async () => {
      try {
        if (file) {
          setIsUploading(true);

          const res = await edgestore.publicFiles.upload({
            file: file,
            onProgressChange: (progress) => {
              // you can use this to show a progress bar
              setProgress(progress);
              console.log(progress);
            },
          });
          setIsUploading(false);

          createPostAction(values, res.url).then(() => {
            toastCall();
            resetForm();
          });
        } else {
          createPostAction(values).then(() => {
            toastCall();
            resetForm();
          });
        }
      } catch {
        toastError();
      }
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
        <TabsContent value="tags">
          <LinkSection />
        </TabsContent>
        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          Post
        </Button>
      </form>
    </Form>
  );
};

export default PostForm;
