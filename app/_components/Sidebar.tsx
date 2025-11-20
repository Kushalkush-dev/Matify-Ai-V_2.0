"use client"
import React, { useContext, useState } from 'react'
import SidebarTop from './SidebarTop'
import SideBarBottom from './SideBarBottom'
import { ActiveChapter } from '../_context/Volumescontext'
export interface TEAM {
  createdBy: String,
  title: String,
  _id: String
}
const Sidebar = () => {

const {activeChapter,setactiveChapter}=useContext(ActiveChapter)
  return (


    <div>
      <div className='h-screen flex flex-col p-2 '>

      <div  className='flex-1'>
        <SidebarTop activeChapter={activeChapter} setactiveChapter={setactiveChapter}  />

        </div>


        <SideBarBottom activeChapter={activeChapter}/>
      </div>
    </div>
  )
}

export default Sidebar