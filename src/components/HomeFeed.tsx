import React, { FC } from 'react'
import CreatePostWidget from './CreatePostWidget'

const HomeFeed:FC = () => {
  return (
    <section className='max-w-5xl mx-auto flex gap-x-6  p-2'>
        <div className='w-3/4'>
            <CreatePostWidget />
        </div>
        <div className='w-1/4'>
            Widget
        </div>
    </section>
  )
}

export default HomeFeed