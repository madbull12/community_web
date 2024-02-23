import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";
import { PostSchema } from "@/lib/validations/posts";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tag, TagInput } from "@/components/ui/tag-input";

const LinkSection = () => {
  const form = useFormContext<PostSchema>();
  const [tags, setTags] = React.useState<Tag[]>([]);

  const { setValue } = form;
  return (
    <FormField
      control={form.control}
      name="tags"
      render={({ field }) => (
        <FormItem className="flex flex-col items-start">
          <FormLabel>Tags</FormLabel>
          <FormControl>
            <TagInput
              // showCount={true}
              // maxTags={5}
              {...field}
              placeholder="Enter a topic"
              tags={tags}
              className="sm:min-w-[450px]"
              setTags={(newTags) => {
                setTags(newTags);
                setValue("tags", newTags as [Tag, ...Tag[]]);
              }}
            />
          </FormControl>
          <FormDescription>These are tags that tell about your post</FormDescription>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default LinkSection;
