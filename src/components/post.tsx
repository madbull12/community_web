import { PostDto } from '@/data-access/posts'
import React from 'react'


const Post = ({post}:{post:PostDto}) => {
    console.log(post)
  return (
    <div className='bg-secondary cursor-pointer rounded-md p-2 text-foreground border hover:border-primary border-border '>
        {post.content}
    </div>
  )
}

export default Post