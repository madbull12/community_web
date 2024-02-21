import React, { useState } from "react";
import { SingleImageDropzone } from "./single-image-dropzone";
import useImageFileStore from "@/store/use-image-file";
import { Progress } from "@/components/ui/progress";
import UploadProgress from "./upload-progress";
const MediaSection = () => {
  const { file, setFile, isUploading,progress } = useImageFileStore();
  return (
    <>
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
      {isUploading ? <UploadProgress progress={progress} /> : null}
    </>
  );
};

export default MediaSection;
