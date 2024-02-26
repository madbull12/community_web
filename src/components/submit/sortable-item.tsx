import { useSortable } from "@dnd-kit/sortable";
import React from "react";
import { CSS } from "@dnd-kit/utilities";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "@/components/ui/input";
import { GripVertical, TrashIcon } from "lucide-react";
import usePollStore from "@/store/use-polls-store";
import { useForm } from "react-hook-form";
const SortableItem = ({
  poll,
  index,
}: {
  poll: {
    id: number;
  };
  index: number;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({
    id: poll.id,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const form = useForm();

  const { remove } = usePollStore();

  return (
    <div
      className="flex items-center gap-x-2"
      {...attributes}
      ref={setNodeRef}
      style={style}
    >
      <div
        {...listeners}
        ref={setActivatorNodeRef}
        className="p-1 flex items-center cursor-grab hover:bg-gray-100 rounded"
      >
        <GripVertical className="w-4 h-4" />
      </div>
      {/* <FormField
        control={form.control}
        name={'zzz'+poll.id+1}
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormControl>
              <Input placeholder={"Option " + (index + 1)} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      /> */}
      <div className="w-full ">Handle {poll.id}</div>
      {index + 1 > 2 ? (
        <TrashIcon className="cursor-pointer" onClick={() => remove(poll.id)} />
      ) : null}
    </div>
  );
};

export default SortableItem;
