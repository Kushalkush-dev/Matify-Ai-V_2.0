"use client"
import Sidebar from '@/app/_components/Sidebar';
import { Volumescontext,ActiveChapter } from '@/app/_context/Volumescontext';
import { api } from '@/convex/_generated/api';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useConvex } from 'convex/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'







export interface TEAM {
  createdBy: String,
  title: String,
  _id: String
}

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => 
  {
    const {user}:any=useKindeBrowserClient()
    const convex=useConvex()
    const router=useRouter()

    const [volumesbychapter, setvolumesbychapter] = useState<any>(null)

    const [activeChapter,setactiveChapter]=useState<TEAM|any>(null);
  

    useEffect(()=>{
      user&&checkProjects()
    },[user])


    const checkProjects=async()=>{
      const res=await convex.query(api.project.getProjects,{email:user?.email})

      if(!res?.length){
        router.push('/project/create')
      }

      console.log("Dashboard projects",res);
    }

    




  return (


<Volumescontext.Provider value={{volumesbychapter,setvolumesbychapter}}>
<ActiveChapter.Provider value={{activeChapter,setactiveChapter}}>
  
    <div>

      <div className='grid grid-cols-4'>

      <div className='col-span-1 w-72 h-screen border-r'>
        <Sidebar/>
      </div>

      <div className='col-span-3'>
      {children}
      </div>
      
      </div>
      </div>
  
</ActiveChapter.Provider>
      
</Volumescontext.Provider>
  )
}

export default layout