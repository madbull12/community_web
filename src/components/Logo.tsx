"use client"

import Link from 'next/link'
import React, { FC } from 'react'

const Logo:FC = () => {
  return (
    <h2 className='text-3xl font-bold'>
        <Link href="/">socia<span className='text-violet-600'>lite.</span></Link>
        
    </h2>
  )
}

export default Logo