import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import UserAvatar from "./UserAvatar";
import { Input } from "./ui/input";

const CreatePostWidget = () => {
  return (
    <section className="rounded-sm border-border border p-2 w-full flex gap-x-2 items-center">
      <UserAvatar
        src="https://github.com/shadcn.png"
        className=""
        fallback="AL"
      />

      <Input placeholder="Create Post" className="px-4 py-2 w-full bg-secondary focus-visible:ring-0 focus-visible:ring-offset-0" />
    </section>
  );
};

export default CreatePostWidget;
