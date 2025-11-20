import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Github } from 'lucide-react'
import React from 'react'

const DashHeader = () => {
  return (
    <div className='flex justify-end ' >

      <div className='flex gap-2 items-center '>
      <Input type='text' placeholder='Search volumes' className='w-64 bg-slate-100' />
      <Button><Github/>Github</Button>
      

      </div>
    </div>
  )
}

export default DashHeader