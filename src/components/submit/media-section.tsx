import React from "react";
import Dropzone from "./dropzone";

const MediaSection = () => {
  return (
    <div className="min-h-[300px] border border-dashed border-violet-400 grid place-items-center">
      {/* <div className='flex items-center gap-x-2'>
            <p>Drag and drop an image or</p>
            <Button variant={"outline"}>Upload</Button>
        </div> */}
      <Dropzone />
    </div>
  );
};

export default MediaSection;
