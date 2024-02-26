import usePollStore from "@/store/use-polls-store";
import React from "react";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { SortableContext } from "@dnd-kit/sortable";

const PollInputs = () => {
  const { polls, add, remove } = usePollStore();
  const form = useForm();
  console.log(polls);
  return (
    <div className="space-y-4 mt-4">
      <SortableContext items={polls.map((poll)=>poll.id)}>
        {polls.map((poll, i) => (
          <div key={i} className="flex items-center gap-x-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input placeholder={"Option " + (i + 1)} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {i + 1 > 2 ? (
              <TrashIcon
                className="cursor-pointer"
                onClick={() => remove(poll.id)}
              />
            ) : null}
          </div>
        ))}
      </SortableContext>

      <Button onClick={add} type="button" variant="ghost">
        Add Option
      </Button>
    </div>
  );
};

export default PollInputs;
