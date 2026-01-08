import { Button } from '@/components/ui/button'
import { Brain, Calculator, ExpandIcon, Loader2, LucideFlipHorizontal2, LucideMoveHorizontal, LucideUnfoldHorizontal, Save } from 'lucide-react'
import Image from 'next/image'
import React, { useContext } from 'react'
import { aiGenerating } from '../_context/Volumescontext'

const PlaygroundHeader = ({onSave,onCalculate,setview,view}:any) => {

  const {isCalculating,setisCalculating}=useContext(aiGenerating);
  return (
    <div className='w-full flex justify-between items-center border-b-2 shadow-sm p-2'>
      <Image src={"/logoo.png"} alt='logo' width={50} height={51} />
    
      <div className=' flex gap-4'>
        <Button className='bg-[#4871DE]' onClick={()=>setview()}>{view ?<><span>Doc Mode</span><LucideFlipHorizontal2/></>:<><span>Full View</span><LucideUnfoldHorizontal/></> }</Button>
      <Button disabled={isCalculating} onClick={()=>onCalculate()} className='bg-green-600'>{isCalculating ? <><Loader2 className='animate-spin'/></> :<> Calculate <Brain/></> }  </Button>

      <Button  onClick={()=>onSave()} className='bg-yellow-600'>SAVE <Save/></Button>

      </div>
      

    </div>
  )
}

export default PlaygroundHeader