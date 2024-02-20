// "use client";

// import { TrashIcon } from "lucide-react";
// import Image from "next/image";
// import React, { useCallback, useState } from "react";
// import { Accept, useDropzone, DropzoneOptions } from "react-dropzone";
// import { useToast } from "../ui/use-toast";
// import useImageFileStore from "@/store/use-image-file";
// import {
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
// } from "@/components/ui/form";
// import { useFormContext } from "react-hook-form";
// import { PostSchema } from "@/lib/validations/posts";
// import { Input } from "../ui/input";

// function Dropzone() {
//   // const onDrop = useCallback((acceptedFiles: Accept) => {
//   //   // Do something with the files
//   //   console.log(acceptedFiles);
//   // }, []);

//   const { setFiles, files, preview, setPreview } = useImageFileStore();
//   // const [files, setFiles] = useState<(File & { preview: string | null })[]>([]);
//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     accept: {
//       "image/*": [],
//     },
//     onDrop: (acceptedFiles) => {
//       // console.log(acceptedFiles);
//       setFiles(
//         acceptedFiles.map((file) =>
//           Object.assign(file, {
//             preview: URL.createObjectURL(file),
//           })
//         )
//       );
//       acceptedFiles.map((file) => setPreview(URL.createObjectURL(file)));
//     },
//   });

//   const removePreview = (): void => {
//     setPreview(undefined);
//   };

//   return (
//     <div className="h-full w-full">
//       {preview ? (
//         <div className="w-full h-full relative">
//           <Image
//             alt="preview-img"
//             width={0}
//             height={0}
//             sizes="100vw"
//             style={{ width: "100%", height: "auto" }}
//             src={preview as string}
//           ></Image>
//           <div
//             onClick={removePreview}
//             className="rounded-full h-8 w-8 grid place-items-center absolute top-2 right-2  cursor-pointer bg-background"
//           >
//             <TrashIcon className=" text-foreground " size={14} />
//           </div>
//         </div>
//       ) : (
//         <div
//           {...getRootProps()}
//           className="h-full w-full flex items-center justify-center cursor-pointer"
//         >
//           <input {...getInputProps()} />

//           {isDragActive ? (
//             <p>Drop the files here ...</p>
//           ) : (
//             <p>Drag 'n' drop some files here, or click to select files</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Dropzone;
