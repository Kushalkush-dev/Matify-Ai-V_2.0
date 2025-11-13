
"use client"

import Header from '@/app/_components/Header'
import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { useMutation } from 'convex/react'
import { useRouter } from 'next/navigation'
import React, { use, useState } from 'react'

const page = () => {
const router=useRouter()
  const {user}:any=useKindeBrowserClient()
  const createProject=useMutation(api.project.createProject)



  const [projectTitle, setprojectTitle] = useState('')

  const projectCreate=async()=>{

    createProject({
      createdBy:user?.email,
      title:projectTitle
    }).then((res)=>{
      console.log("Created",res);
      router.push('/dashboard')
      
      
    }).catch((err)=>{
      console.log("Error Creating Project",err);
    })

  }



  return (
    <div>
      <Header />
      <div className=' p-4 flex flex-col mt-10 justify-center items-center'>
        <h2 className='text-[32px] font-bold py-3'>What would you like to call your Project? </h2>
        <h2 className='text-[20px]  text-gray-500 '>Create a your new project...</h2>

       <div className='mt-14'>
        <label htmlFor="text" className="relative">
          <input onChange={(e)=>setprojectTitle(e.target.value)} type="text" id="text" placeholder="" className="peer w-80 px-2 py-2 mt-0.5  rounded border-2 border-gray-900 shadow-sm sm:text-sm"/>

            <span className="absolute inset-y-0 start-3 -translate-y-5 bg-white px-0.5 text-sm font-medium text-gray-700 transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5">
             Enter the project Title
            </span>
        </label>

       </div>
       <Button onClick={projectCreate} className='mt-7 w-64'>Create Project</Button>

      </div>

    </div>
  )
}

export default page