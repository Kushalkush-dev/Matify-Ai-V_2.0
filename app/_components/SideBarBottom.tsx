"use client"
import { Flag, Github, LogOut } from 'lucide-react'
import React, { useEffect, useState } from 'react'
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
  
  {
    title:"Logout",
    icon:LogOut
  }
]
const convex=useConvex()
const createnewVolume=useMutation(api.volume.createVolume)


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
      <div key={idx} className='flex hover:bg-gray-500/20 p-2 rounded-md  items-center gap-2 '>
        <menu.icon size={20}/>
        <h2 className='text-sm'>{menu?.title}</h2>
      </div>
    ))}

     <Dialog>
      <DialogTrigger asChild>
        <Button className='bg-blue-500 text-white' variant="outline">Create Volume</Button>
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
        style={{ width:`${(allVolumes/5)*100}%` }}>
            
        </div>
    </div>
    
    
      <h2 className='text-[12px] mt-2'>
        <strong>{allVolumes}</strong> out of <strong>5</strong> files used</h2>
      <h2 className='text-[12px] '>Upgrade your plan for unlimited access.</h2>  

      
    </div>

   </div>



  )
}

export default SideBarBottom