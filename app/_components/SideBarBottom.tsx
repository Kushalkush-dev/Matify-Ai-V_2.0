"use client"
import { Flag, Github, LogOut } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { DialogClose } from '@radix-ui/react-dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { useConvex, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { toast } from 'sonner'
import { Volumescontext } from '../_context/Volumescontext'
import MAXVolumeConstant from '../_constants/MAXVolumeConstant'




const SideBarBottom = ({activeChapter}:any) => {

const {user}:any=useKindeBrowserClient()
const [volumeName, setvolumeName] = useState('')

const[allVolumes,setallVolumes]=useState<any>(0)

const menus=[
  {
    title:"Getting Started",
    icon:Flag,
    
  },
   {
    title:"GitHub",
    icon:Github,
    
  },
  

]
const convex=useConvex()
const createnewVolume=useMutation(api.volume.createVolume)


const {volumesbychapter,setvolumesbychapter}=useContext(Volumescontext)

useEffect(()=>{
  if(user && user.email){
    getAllVolumes()
  }
},[user])


const getAllVolumes=async()=>{
  try {
    const res=await convex.query(api.volume.getTotalVolumes,{createdBy:user.email})
    console.log("All Volumes",res);
    if(res){

      setallVolumes(res.length)
    }
    
  } catch (error) {
    console.log("Error fetching all volumes",error);
  }
}

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

const createVolume=async()=>{

  try {
   if(user && user.email){
   await createnewVolume({
      volumeTitle:volumeName,
      chapterId:activeChapter._id,
      document:"",
      whiteboard:"",
      createdBy:user.email
    })
   

    getAllVolumes()
    getVolumesByChapter()
    
  } 

  toast.success("Volume Created Successfully")
  
}catch (error) {
  console.log("Error creating volume",error);
  toast.error("Error creating volume")
  
}







}


  return (
    
   <div>

    <div className='flex flex-col gap-2 p-3 '>
      
    {menus.map((menu,idx)=>(
      <div key={idx} className='cursor-pointer flex hover:bg-gray-500/20 p-2 rounded-md  items-center gap-2 '>
        <menu.icon size={20}/>
        <h2 className='text-sm'>{menu?.title}</h2>
      </div>
    ))}
     <div className='flex cursor-pointer hover:bg-red-500 hover:text-white p-2 rounded-md  items-center gap-2 '>
        <LogOut size={20}/>
        <h2 className='text-sm'>Logout</h2>
      </div>

     <Dialog>
      <DialogTrigger asChild>
        <Button disabled={allVolumes>=5}  className='bg-blue-500 text-white' variant="outline">Create Volume</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create a New Volume </DialogTitle>
          <DialogDescription> 
            Create a volume with just a click.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              value={volumeName}
              onChange={(e)=>setvolumeName(e.target.value)}
              placeholder='Enter the Volume Title'
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button onClick={createVolume} type="button" variant="secondary">
              Create
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>

      <div className='w-full h-4 mt-2 bg-gray-300 rounded-full'>
        <div className='w-[90%] h-4 bg-red-500 rounded-full' 
        style={{ width:`${(allVolumes/MAXVolumeConstant.maxfile)*100}%` }}>
            
        </div>
    </div>
    
    
      <h2 className='text-[12px] mt-2'>
        <strong>{allVolumes}</strong> out of <strong>{MAXVolumeConstant.maxfile}</strong> files used</h2>
      <h2 className='text-[12px] '>Upgrade your plan for unlimited access.</h2>  

      
    </div>

   </div>



  )
}

export default SideBarBottom