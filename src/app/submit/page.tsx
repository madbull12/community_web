import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

const SubmitPage = () => {
  return (
    <section className="flex gap-x-4 items-center max-w-5xl mx-auto py-8">
      <div className="flex-[.75] p-2 border-b ">
        <div className="w-full flex justify-between items-center">
          <h2 className="font-semibold text-xl">Create a post</h2>
          <Button>Drafted</Button>
        </div>
        
      </div>
      <div className="flex-[0.25]">Guidelines</div>
    </section>
  );
};

export default SubmitPage;