import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { create } from "zustand";

interface Poll {

    id: number
}
interface PollStore {
    polls: Poll[],
    add: () => void,
    remove: (id: number) => void;
    setPolls: (polls: Poll[],event:DragEndEvent) =>  void
}

const usePollStore = create<PollStore>((set) => ({
    polls: [{
        id: 1
    }, {
        id: 2
    }],
    add: () => set((state) => ({
        polls: [...state.polls, {
            id: state.polls.length + 1
        }]
    })),
    remove: (id: number) => set((state) => ({
        polls: state.polls.filter((poll) => poll.id !== id)
    })),
    setPolls:(polls,{active,over})=>{
        const activeIndex = polls.findIndex((item) => item.id === active?.id);
        const overIndex = polls.findIndex((item) => item.id === over?.id);
        const res = arrayMove(polls, activeIndex, overIndex);
        set(()=>({
            polls:res
        }))
    }
}));

export default usePollStore;