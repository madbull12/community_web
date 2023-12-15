import React from 'react'
import { Input } from '../ui/input'

const TitleInput = ({ title}:{title:string}) => {
    
  return (
    <Input className="focus-visible:ring-violet-400" placeholder="Title" />

  )
}

export default TitleInput