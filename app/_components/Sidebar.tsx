
import React from 'react'
import SidebarTop from './SidebarTop'
import SideBarBottom from './SideBarBottom'

const Sidebar = () => {

  

  return (
    <div>
      <div className='h-screen flex flex-col p-2 '>

      <div  className='flex-1'>
        <SidebarTop  />

        </div>


        <SideBarBottom/>
      </div>
    </div>
  )
}

export default Sidebar