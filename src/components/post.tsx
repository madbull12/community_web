import { PostDto } from "@/data-access/posts";
import React from "react";
import UserAvatar from "./user-avatar";
import moment from "moment";

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
        <span className="text-[12px] text-foreground">
          Posted by • {post.author.name} {moment(post.createdAt).fromNow()}
        </span>
      </div>
      <div className="mt-2">
      <p className="text-xl font-bold">{post.title}</p>
      <p>{post.content}</p>
      </div>

    </div>
  );
};

export default Post;
