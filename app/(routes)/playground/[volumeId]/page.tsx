"use client"
import AIOutputDisplay from '@/app/_components/AiOutput'
import Canvas from '@/app/_components/Canvas'
import Editor from '@/app/_components/Editor'
import PlaygroundHeader from '@/app/_components/PlaygroundHeader'
import { api } from '@/convex/_generated/api'
import { useConvex } from 'convex/react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { aiSolution,aiGenerating } from '@/app/_context/Volumescontext';


const page = ({params}:any) => {
  

  const [save, setsave] = useState(false)  //save button trigger state

  const [Calculate, setCalculate] = useState(false) //calculate button trigger state

  const convex=useConvex()
  
  const [volumeData, setvolumeData] = useState<any>()

  const [aianswer,setaianswer]=useState<any>('')

  const [isCalculating, setisCalculating] = useState<boolean>(false)



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

    <aiGenerating.Provider value={{isCalculating,setisCalculating}}>

    <aiSolution.Provider value={{aianswer,setaianswer}}>
    
    <div className='min-h-screen flex- flex flex-col'>
      



      <PlaygroundHeader onCalculate={()=>setCalculate(!Calculate)} onSave={()=>setsave(!save)} />


      <div className='flex-1 grid md:grid-cols-5 p-1 grid-cols-1 w-full'>

        <div className='col-span-2  border-r-slate-600/35 border-r-2 p-3'>
          <Editor params={params.volumeId} volumeData={volumeData} saveClick={save}/>
        </div>


        <div className='flex flex-col col-span-3 h-full p-1  '>
          <div className='border-b-slate-300/35 border-b-2'>
           <Canvas params={params.volumeId} volumeData={volumeData} saveClick={save} calculateClick={Calculate} />
          </div>

          <div className='p-2 h-full'>
             <AIOutputDisplay/>
          </div>
        </div>

      </div>


    </div>
      </aiSolution.Provider>
    </aiGenerating.Provider>
  )
}

export default page