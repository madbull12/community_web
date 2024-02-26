"use client";

import React from "react";
import PostSection from "./post-section";
import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import PollInputs from "./poll-inputs";
import usePollStore from "@/store/use-polls-store";
const PollSection = () => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const { setPolls,polls} = usePollStore()
  function handleDragEnd(event:DragEndEvent) {
    const { active, over } = event;
    if (active?.id !== over?.id) {
      //  setItems((prev) => {
      //   const activeIndex = prev.findIndex((item) => item.id === active?.id);
      //   const overIndex = prev.findIndex((item) => item.id === over?.id);
      //   return arrayMove(prev, activeIndex, overIndex);
      // });
      setPolls(polls,event)
    }
  }

  return (
    <div>
      <PostSection />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <PollInputs />
      </DndContext>
    </div>
  );
};

export default PollSection;
