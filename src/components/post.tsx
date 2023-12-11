import { PostDto } from "@/data-access/posts";
import React from "react";
import UserAvatar from "./user-avatar";

const Post = ({ post }: { post: PostDto }) => {
  console.log(post);
  return (
    <div className="bg-secondary cursor-pointer rounded-md p-2 text-foreground border hover:border-primary border-border ">
      <div className="flex gap-x-2 items-center">
        <UserAvatar
          src={post.author.image as string}
          fallback={post?.author?.name?.split("")[0].charAt(0) as string}

          className="rounded-full w-6 h-6"

        />
        <span className="text-[12px] text-foreground">Posted by {post.author.name}</span>
      </div>
      <p>
        {post.content}
      </p>
    </div>
  );
};

export default Post;
