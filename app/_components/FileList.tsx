
"use client"

import React, { useContext, useEffect, useState } from 'react'
import { Volumescontext } from '../_context/Volumescontext'
import { useConvex } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { ActiveChapter } from '../_context/Volumescontext'
import { toast } from 'sonner'
import moment from 'moment'
import Image from 'next/image'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { Cog, Drone, EllipsisVertical, Eye, Settings, Settings2, Trash, Trash2, View } from 'lucide-react'


import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation'

 
    











const FileList = () => {


  const router=useRouter()


  const {volumesbychapter,setvolumesbychapter}=useContext(Volumescontext)

const {user}:any=useKindeBrowserClient()
  const convex=useConvex()

  const {activeChapter}=useContext(ActiveChapter)

  useEffect(()=>{

   if(activeChapter && activeChapter._id){
    getVolumesByChapter()
   }

  },[activeChapter])


useEffect(()=>{
    console.log("chapter files",volumesbychapter);
   },[volumesbychapter])


  const getVolumesByChapter=async()=>{
    try {
      if(activeChapter && activeChapter._id){

        const res=await convex.query(api.volume.getVolumesByChapter,{chapterId:activeChapter._id})
        if(res){
          setvolumesbychapter(res)
          toast.success("Fetched Volumes for the chapter")
        }
      }
    } catch (error) {
      console.log("Error fetching the Volumes by chapters",error);
      toast.error("Could not fetch volumes for the chapter")
      
      
    }

  }


  return (
    <div className='mt-6'>

      <div className="overflow-x-auto">
  <table className="min-w-full divide-y-2 divide-gray-200">
    <thead className="ltr:text-left rtl:text-right">
      <tr className="*:font-medium *:text-gray-900 text-sm">
        <td className="px-1 py-2 whitespace-nowrap">Volume Name</td>
        <td className="px-1 py-2 whitespace-nowrap">Created At</td>
        <td className="px-1 py-2 whitespace-nowrap">Edited At</td>
        <td className="px-1 py-2 whitespace-nowrap">Author</td>
        

      </tr>
    </thead>

 
    <tbody className="divide-y divide-gray-200 *:even:bg-gray-50">
    

    {volumesbychapter && volumesbychapter.map((volume:any,idx:number)=>(

      <tr onClick={()=>router.push(`/playground/${volume._id}`)} key={idx} className="*:text-gray-900 *:first:font-sm text-sm  ">
        <td className="px-1 py-2 whitespace-nowrap">{volume?.volumeTitle}</td>
        <td className="px-1 py-2 whitespace-nowrap">{ moment(volume?._creationTime).format("MMM Do YYYY")  }</td>
        <td className="px-1 py-2 whitespace-nowrap">{ moment(volume?._creationTime).format("MMM Do YYYY") }</td>
        <td className="px-3 py-2 whitespace-nowrap"><Image className='rounded-full' src={user?.picture} width={30} height={30} alt='user'/></td>
        <td className="px-1 py-2 whitespace-nowrap">
          
          <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Settings2 className='hover:text-emerald-500 hover:scale-110 transition-transform' size={20}/>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start">
        <DropdownMenuLabel>{volume?.volumeTitle}</DropdownMenuLabel>
        
          <DropdownMenuItem >
         <h3 className='w-full flex gap-1 items-center hover:text-green-500 '><Eye size={18}/>View Volume</h3>  
          </DropdownMenuItem>
          <DropdownMenuItem>
         <h3 className='w-full flex gap-1 items-center hover:text-red-500 '><Trash size={18}/>Delete</h3>  
          </DropdownMenuItem>
          <DropdownMenuItem>
           <Settings/> Settings
          </DropdownMenuItem>
       
      </DropdownMenuContent>
    </DropdownMenu>
          
          </td>
       
      </tr>

    ))}

      
    </tbody>
  </table>
</div>

    </div>
 )
}

export default FileList