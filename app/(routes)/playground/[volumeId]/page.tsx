import PlaygroundHeader from '@/app/_components/PlaygroundHeader'
import React from 'react'

const page = () => {
  return (
    <div>
      <PlaygroundHeader />


      <div className='grid md:grid-cols-2 grid-cols-1 w-full'>

        <div className='bg-gray-500 h-screen'>
          Document
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