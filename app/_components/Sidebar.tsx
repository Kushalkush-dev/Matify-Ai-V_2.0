"use client"

import React from 'react'
import SidebarTop from './SidebarTop'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'

const Sidebar = () => {

  const {user}:any=useKindeBrowserClient();

  return (
    <div>
      <div className=''>
        <SidebarTop user={user} />
      </div>
    </div>
  )
}

export default Sidebar