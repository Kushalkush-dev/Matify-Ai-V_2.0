import React, { useContext, useEffect, useState } from 'react';
import { Bot, Copy, Calculator, Loader2, LucideChartBarDecreasing, LucideSeparatorHorizontal, SuperscriptIcon } from 'lucide-react';
import { toast } from 'sonner';
import { aiGenerating, aiSolution } from '../_context/Volumescontext';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';
import { BlockMath } from 'react-katex';
import { Button } from '@/components/ui/button';


interface AIOutputProps {
  output?: string;
  isCalculating?: boolean;
}

const AIOutputDisplay = () => {


  const {aianswer,setaianswer}=useContext(aiSolution)

  const {isCalculating}=useContext(aiGenerating)

  const [isDetailedOutput, setisDetailedOutput] = useState<boolean>(false)


  useEffect(()=>{
    console.log(aianswer);
  },[aianswer])
  
  const copyToClipboard = () => {
    if (!aianswer) return;
    navigator.clipboard.writeText(aianswer);
    toast.success("Result copied to clipboard");
  };

  return (
    <div className="flex flex-col h-full w-full bg-white rounded-lg border border-stone-200 overflow-hidden shadow-sm">
      {/* Header Section */}
      <div className="flex items-center justify-between px-4 py-2 bg-stone-100 border-b border-stone-200">
        <div className="flex items-center gap-2">
          <div className="p-1 bg-emerald-100 rounded-md">
            <Bot className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="text-sm font-medium text-stone-700">AI Math Assistant</span>

           <div className='flex ml-3 gap-4 '>
          <Button className={`${!isDetailedOutput ? "bg-[#4871DE] text-white":" bg-white text-emerald-600 border-2 border-[#4871DE]"}  active:scale-95 
           transition-colors hover:bg-[#4871DE] hover:text-white shadow-2xl`}
           
           onClick={()=>setisDetailedOutput(false)}>
            Direct Solution <SuperscriptIcon/>
          </Button>

          <Button className={`${isDetailedOutput ? "bg-[#2AB0BB] text-white":"bg-white text-emerald-600 border-2 border-[#2AB0BB]" }  active:scale-95  transition-colors 
           hover:bg-[#2AB0BB] hover:font-bold hover:text-white shadow-2xl`}
           
           onClick={()=>setisDetailedOutput(true)}>
            Detailed Solution <LucideSeparatorHorizontal />
          </Button>
        </div>

        </div>


       

        <button 
          onClick={copyToClipboard}
          disabled={!aianswer}
          className="p-1.5 hover:bg-stone-100 rounded-md transition-colors text-stone-400 hover:text-stone-600 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Copy result"
        >
          <Copy className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Content Section */}
      <div className="relative flex-1 p-4 overflow-y-auto h-full bg-white custom-scrollbar">
        {aianswer ? (
          <div className="prose prose-stone prose-sm max-w-none flex justify-center h-full items-center">
           
            <div className="text-3xl items-start overflow-x-auto   text-stone-800 leading-relaxed whitespace-pre-wrap font-medium">
             <BlockMath  math={aianswer && isDetailedOutput ? aianswer?.detailedsolution:aianswer?.directsolution} />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-stone-400 gap-2">
            {isCalculating ? (
               <>
                 <Loader2 className="w-6 h-6 animate-spin text-emerald-500" />
                 <span className="text-xs font-medium text-stone-500">Calculating...</span>
               </>
            ) : (
              <>
                <Calculator className="w-8 h-8 opacity-20" />
                <span className="text-xs font-medium text-stone-500">Waiting for expression...</span>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIOutputDisplay;