import Editor from '@/app/_components/Editor'
import PlaygroundHeader from '@/app/_components/PlaygroundHeader'
import React from 'react'


const page = () => {
  return (
    <div>
      <PlaygroundHeader />


      <div className='grid md:grid-cols-2 p-2 grid-cols-1 w-full'>

        <div className=' h-screen'>
          <Editor/>
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