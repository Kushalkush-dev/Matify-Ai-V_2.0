import { Separator } from '@/components/ui/separator'
import { api } from '@/convex/_generated/api'
import { LogoutLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { useConvex } from 'convex/react'
import { ChevronDown, ChevronDownCircle, FileInput, LayoutList, LogIn, LogOut, Settings } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

export interface TEAM {
  createdBy: String,
  title: String,
  _id: String
}

const SidebarTop = ({activeChapter,setactiveChapter}:any) => {

  const convex = useConvex()
  const { user }: any = useKindeBrowserClient()

  const [chapterList, setchapterList] = useState<TEAM[]>()
  const [selectedChapter, setselectedChapter] = useState<TEAM>()



  useEffect(() => {
    if (user) {
      getChapters()
      console.log(user);
      
    }
  }, [user])

  useEffect(()=>{
    if(chapterList && chapterList?.length>0){
      setactiveChapter(chapterList[0])
    }

  },[chapterList])


  useEffect(()=>{
    if(selectedChapter){
      setactiveChapter(selectedChapter)
    }

  },[selectedChapter])



  const getChapters = async () => {
    try {
      const res = await convex.query(api.project.getProjects, { email: user.email })

      if (res) {
        setchapterList(res)
      }


    } catch (error) {
      console.log("Error fetching chapter", error);

    }
  }

  

  const popupcontent = [
    {
      title: "Create Chapter",
      icon: FileInput,
      path: "/chapter/create"
    },
    {
      title: "Settings",
      icon: Settings,
      path: ""
    },

  ]




  return (

    <div  >
    <Popover>
      <PopoverTrigger>
        <div className='flex items-center gap-5 p-3 m-2  rounded-md hover:bg-gray-300/50'>

          <Image className='mt-1' src={"/whisprOutLogo.png"} width={50} height={50} alt='logo' />

          <div className='flex items-center gap-8'>
            <h2 className='flex items-center font-bold text-md'>MY Chapters</h2>
            <ChevronDown size={25} />
          </div>

        </div>
      </PopoverTrigger>
      <PopoverContent className='p-5 ml-8 bg-slate-100 rounded-lg w-72 shadow-lg'>

        <div className='flex flex-col gap-2'>

          {chapterList?.map((chapter, idx) => (
            
            <h2 key={idx} onClick={()=>setselectedChapter(chapter)}  className={`p-2 hover:bg-blue-500
                         hover:text-white
                         rounded-lg mb-1 cursor-pointer ${activeChapter && activeChapter?._id == chapter?._id && "text-white bg-blue-500"} `}>{chapter.title}</h2>

          ))}


        </div>


        <Separator className='mt-2 bg-gray-500/40' />

        <div className='flex flex-col gap-2 mt-3' >

          {popupcontent.map((ele, idx) => (
            <div key={idx} className='flex hover:bg-gray-500/20  p-2 rounded-md  items-center gap-4 '>
              {<ele.icon size={16} />}
              <h2 className='text-sm'>{ele.title}</h2>
            </div>
          ))}


          <LogoutLink>
            <div className='flex hover:bg-red-500 hover:text-white  p-2 rounded-md  items-center gap-5 '>
              <LogOut size={16} />
              <h2 className='text-sm'>Logout</h2>
            </div>


          </LogoutLink>

        </div>

          <Separator className='mt-2 bg-gray-500/40' />

          <div className='flex mt-3 items-center gap-3'>
            <Image className='rounded-full' src={user?.picture} width={40} height={40}  alt='profilePic'/>
            <div>
              <h2 className='text-sm font-bold'>{user?.family_name} {user?.given_name}</h2>
              <h2 className='text-[12px] font-medium text-slate-500'>{user?.email}</h2>
            </div>
          </div>

      </PopoverContent>
    </Popover>



        <div className='flex h-full m-3 rounded-lg p-2 gap-3 items-center bg-gray-300/40 '>
          <LayoutList/>
          <h2 className='text-sm font-bold'>All Volumes</h2>
        </div>
    </div>

   






  )
}

export default SidebarTop