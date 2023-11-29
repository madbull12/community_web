"use client"

import React, { FC } from 'react'
import Logo from './Logo'
import ProfileWidget from './ProfileWidget'
import { Session, User } from 'next-auth'

type Props = {
  user:User;
}
const Header:FC<Props> = ({ user }) => {

  return (
    <div className="px-4 py-2 container flex items-center justify-between">
        <Logo />
        <ProfileWidget user={user} />
    </div>
  )
}

export default Header