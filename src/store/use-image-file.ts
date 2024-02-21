import { create } from "zustand";

type PostStore = {
  file?: File;
  setFile: (file: File | undefined) => void;
  preview: string | undefined;
  setPreview: (preview: string | undefined) => void;
  progress: number;
  setProgress: (progress: number) => void;
  isUploading: boolean;
  setIsUploading: (value: boolean) => void;
};

const useImageFileStore = create<PostStore>((set) => ({
  file: undefined,
  progress: 0,
  setProgress: (value) =>
    set(() => ({
      progress: value,
    })),
  setFile: (file) =>
    set(() => ({
      file: file,
    })),
  preview: undefined,
  setPreview: (preview: string | undefined) =>
    set(() => ({
      preview: preview,
    })),
  isUploading: false,
  setIsUploading: (value) =>
    set(() => ({
      isUploading: value,
    })),
}));

export default useImageFileStore;
