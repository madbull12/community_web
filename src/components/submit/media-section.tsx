import React, { useState } from "react";
import { SingleImageDropzone } from "./single-image-dropzone";
import useImageFileStore from "@/store/use-image-file";

const MediaSection = () => {
  // const { setFiles, files, preview, setPreview } = useImageFileStore();
  const [file, setFile] = useState<File>();
  return (
    <SingleImageDropzone
      width={0}
      className="min-w-full min-h-[300px]"
      height={0}
      value={file}
      dropzoneOptions={{
        maxSize: 1024 * 1024 * 1,
      }}
      onChange={(file) => {
        setFile(file);
      }}
    />
  );
};

export default MediaSection;
