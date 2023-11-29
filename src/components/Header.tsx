"use client"

import React, { FC } from 'react'
import Logo from './Logo'
import ProfileWidget from './ProfileWidget'

const Header:FC = () => {
  return (
    <div className="px-4 py-2 container flex items-center justify-between">
        <Logo />
        <ProfileWidget />
    </div>
  )
}

export default Header