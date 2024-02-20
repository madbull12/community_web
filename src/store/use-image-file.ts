import { create } from "zustand";

type PostStore = {
  file?: File;
  setFile: (file: File) => void;
  preview: string | undefined;
  setPreview: (preview: string | undefined) => void;
};

const useImageFileStore = create<PostStore>((set) => ({
  file: undefined,
  setFile: (file) =>
    set(() => ({
      file: file,
    })),
  preview: undefined,
  setPreview: (preview: string | undefined) =>
    set(() => ({
      preview: preview,
    })),
}));

export default useImageFileStore;
