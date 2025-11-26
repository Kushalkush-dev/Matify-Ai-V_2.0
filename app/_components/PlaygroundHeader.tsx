import { Button } from '@/components/ui/button'
import { Brain, Calculator, Save } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const PlaygroundHeader = ({onSave,onCalculate}:any) => {
  return (
    <div className='w-full flex justify-between items-center border-b-2 shadow-sm p-2'>
      <Image src={"/logoo.png"} alt='logo' width={50} height={51} />

      <div className=' flex gap-4'>
      <Button onClick={()=>onCalculate()} className='bg-green-600'> Calculate <Brain/></Button>

      <Button onClick={()=>onSave()} className='bg-yellow-600'>SAVE <Save/></Button>

      </div>
      

    </div>
  )
}

export default PlaygroundHeader