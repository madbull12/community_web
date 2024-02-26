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
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import PollInputs from "./poll-inputs";
const PollSection = () => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (e: DragStartEvent) => {};

  const handleDragMove = (e: DragMoveEvent) => {};

  const handleDragEnd = (e: DragEndEvent) => {};
  return (
    <div>
      <PostSection />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragMove={handleDragMove}
        onDragEnd={handleDragEnd}
      >
        <PollInputs />
      </DndContext>
    </div>
  );
};

export default PollSection;
