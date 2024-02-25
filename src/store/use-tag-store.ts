import { Tag } from "@/components/ui/tag-input";
import { create } from "zustand";

interface TagStore {
    tags: Tag[];
    setTags: (tags:Tag[]) => void;

}

const useTagStore = create<TagStore>((set) => ({
    tags: [],
    setTags:(value)=>set(()=>({
        tags:value
    }))
}));

export default useTagStore;