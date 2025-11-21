import { Button } from '@/components/ui/button'
import { Save } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const PlaygroundHeader = ({onSave}:any) => {
  return (
    <div className='w-full flex justify-between items-center border-b-2 shadow-sm p-2'>
      <Image src={"/whisprOutLogo.png"} alt='logo' width={50} height={51} />
      <Button onClick={()=>onSave()}>SAVE <Save/></Button>

    </div>
  )
}

export default PlaygroundHeader