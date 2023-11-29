import React, { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import UserAvatar from "./UserAvatar";
import { Input } from "./ui/input";
import { UserProps } from "@/interface/users";


const CreatePostWidget:FC<UserProps> = ({user}) => {
  return (
    <section className="rounded-sm border-border border p-2 w-full flex gap-x-2 items-center">
      <UserAvatar
        src={user?.image as string}
        className=""
        fallback={user?.name?.split("")[0].charAt(0) as string}
      />

      <Input placeholder="Create Post" className="px-4 py-2 w-full bg-secondary focus-visible:ring-0 focus-visible:ring-offset-0" />
    </section>
  );
};

export default CreatePostWidget;
