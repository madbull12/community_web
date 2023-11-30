import React, { FC } from 'react'
import CreatePostWidget from './create-post-widget'
import { auth } from '@/auth';
import { User } from 'next-auth';

const HomeFeed:FC =async() => {
  const session = await auth();

  return (
    <section className='max-w-5xl mx-auto flex gap-x-6  p-2'>
        <div className='w-3/4'>
            <CreatePostWidget user={session?.user as User} />
        </div>
        <div className='w-1/4'>
            Widget
        </div>
    </section>
  )
}

export default HomeFeed