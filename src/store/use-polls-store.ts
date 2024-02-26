import { create } from "zustand";

interface PollStore {
    polls: {
        id: number
    }[],
    add: () => void,
    remove: (id: number) => void;

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
    }))
}));

export default usePollStore;