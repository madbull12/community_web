import usePollStore from "@/store/use-polls-store";
import React from "react";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableItem from "./sortable-item";

const PollInputs = () => {
  const { polls, add, remove } = usePollStore();
  console.log(polls);

  return (
    <div className="space-y-4 mt-4">
        
      <SortableContext items={polls.map((poll)=>poll.id)} strategy={verticalListSortingStrategy}>
        {polls.map((poll, i) => (
          <SortableItem poll={poll} index={i} />
        ))}
      </SortableContext>

      <Button onClick={add} type="button" variant="ghost">
        Add Option
      </Button>
    </div>
  );
};

export default PollInputs;
