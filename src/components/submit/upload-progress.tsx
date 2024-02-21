"use client"
import useImageFileStore from '@/store/use-image-file';
import React from 'react'
import { Progress } from '@/components/ui/progress';

const UploadProgress = ({ progress}:{ progress:number}) => {

  return (
    <div>
        <p className='text-xs'>
          {progress.toFixed(0)}% uploaded
        </p>
        <Progress className="h-[8px] w-[50%] my-4 rounded-sm " value={progress} />
      
    </div>
  )
}

export default UploadProgress