"use client"
import Editor from '@/app/_components/Editor'
import PlaygroundHeader from '@/app/_components/PlaygroundHeader'
import { api } from '@/convex/_generated/api'
import { useConvex } from 'convex/react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'


const page = ({params}:any) => {
  
  const [save, setsave] = useState(false)

  const convex=useConvex()

  const [volumeData, setvolumeData] = useState<any>()


  useEffect(()=>{
   params.volumeId &&getVolumeDoc()

  },[])

    const getVolumeDoc=async()=>{
    try {
      const res=await convex.query(api.volume.getVolumeById,{_id:params.volumeId})
        if(res){
          
          setvolumeData(res)
          console.log(res);
          
          toast.success("Volume fetched successfull")

        }      
    } catch (error) {
      console.log("Error to fetch Volume",error);
      toast.error("Error fetching Document")
      
      
    }

  }


  return (
    <div>
      <PlaygroundHeader onSave={()=>setsave(!save)} />


      <div className='grid md:grid-cols-2 p-2 grid-cols-1 w-full'>

        <div className=' h-screen'>
          <Editor params={params.volumeId} volumeData={volumeData} saveClick={save}/>
        </div>


        <div className='flex flex-col h-screen bg-green-400'>
          <div className=''>
            whiteboard
          </div>

          <div className=''>
              Ai
          </div>
        </div>

      </div>


    </div>
  )
}

export default page