"use client"
import React, { useState } from 'react'
import SidebarTop from './SidebarTop'
import SideBarBottom from './SideBarBottom'
export interface TEAM {
  createdBy: String,
  title: String,
  _id: String
}
const Sidebar = () => {

 const [activeChapter,setActiveChapter]=useState<TEAM|any>();

  return (
    <div>
      <div className='h-screen flex flex-col p-2 '>

      <div  className='flex-1'>
        <SidebarTop activeChapter={activeChapter} setActiveChapter={setActiveChapter}  />

        </div>


        <SideBarBottom activeChapter={activeChapter}/>
      </div>
    </div>
  )
}

export default Sidebar