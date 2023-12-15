import PostSubmitComponent from "@/components/submit/post-component";
import { Button } from "@/components/ui/button";
import React from "react";

const SubmitPage = () => {
  return (
    <section className="flex gap-x-4 items-center max-w-5xl mx-auto py-8">
      <div className="flex-[.75]">
        <div className="w-full flex justify-between items-center p-2 border-b">
          <h2 className="font-semibold text-xl">Create a post</h2>
          <Button>Drafted</Button>
        </div>
        <PostSubmitComponent />
        
      </div>
      <div className="flex-[0.25]">Guidelines</div>
    </section>
  );
};

export default SubmitPage;
