import React, {useCallback} from 'react'
import {Accept, useDropzone} from 'react-dropzone'

function Dropzone() {
  const onDrop = useCallback((acceptedFiles:Accept)=> {
    // Do something with the files
    console.log(acceptedFiles)
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    accept: {
        'image/jpeg': [],
        'image/png': []
      }
  })

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
}

export default Dropzone