"use client"
import Sidebar from '@/app/_components/Sidebar';
import { api } from '@/convex/_generated/api';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useConvex } from 'convex/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => 
  {
    const {user}:any=useKindeBrowserClient()
    const convex=useConvex()
    const router=useRouter()

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
    <div>

      <div className='grid grid-cols-4'>

      <div className='col-span-1 h-screen border-r '>
        <Sidebar/>
      </div>

      <div className='col-span-3'>
      {children}
      </div>
      
      </div>
      </div>
      
      
  )
}

export default layout