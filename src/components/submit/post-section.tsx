import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { PostSchema } from "@/lib/validations/posts";

const PostSection = () => {
  const form = useFormContext<PostSchema>()
  return (

    <FormField
      control={form.control}
      name='content'
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <ReactQuill
              // id="content"
              placeholder="Text(optional)"
              theme="snow"
              style={{}}
              {...field}
            ></ReactQuill>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PostSection;
