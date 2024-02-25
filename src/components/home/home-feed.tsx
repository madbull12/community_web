import React, { FC } from "react";
import CreatePostWidget from "./create-post-widget";
import { auth } from "@/auth";
import { User } from "next-auth";
import { getPosts } from "@/data-access/posts";
import Post from "../post";

const fetchPosts = async () => {
  const posts = await getPosts();
  return posts;
};

const HomeFeed: FC = async () => {
  const session = await auth();
  const posts = await fetchPosts();

  return (
    <section className="max-w-5xl mx-auto flex gap-x-6  p-2">
      <div className="w-3/4">
        <CreatePostWidget user={session?.user as User} />
        <div className="display flex flex-col gap-y-4 mt-4">
          {posts?.map((post,i) => (
            <Post post={post} key={i} />
          ))}
        </div>
      </div>
      <div className="w-1/4">Widget</div>
    </section>
  );
};

export default HomeFeed;
