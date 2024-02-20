import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";
import { PostSchema } from "@/lib/validations/posts";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const LinkSection = () => {
  const form = useFormContext<PostSchema>();

  return (
    <FormField
      control={form.control}
      name="link"

      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Textarea
              placeholder="Url"
              className="focus-visible:ring-violet-400"
              {...field}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default LinkSection;
