import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type Props = {
  content: string;
  setContent:React.Dispatch<React.SetStateAction<string>>
}
const PostSection = ({
  content,
  setContent
}: Props) => {
  return (
    <ReactQuill
      id="content"
      theme="snow"
      value={content}
      onChange={setContent}
      style={{}}
    ></ReactQuill>
  );
};

export default PostSection;
