import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Github } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const DashHeader = () => {
  return (
    <div className='flex justify-end ' >

      <div className='flex gap-2 items-center '>
      <Input type='text' placeholder='Search volumes' className='w-64 bg-slate-100' />
     <Link href={"https://github.com/Kushalkush-dev/Matify-Ai-V_2.0"} target='_blank' >
     <Button><Github/>Github</Button>
     </Link> 
      

      </div>
    </div>
  )
}

export default DashHeader