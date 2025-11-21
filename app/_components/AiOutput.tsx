import React from 'react';
import { Bot, Copy, Calculator, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface AIOutputProps {
  output?: string;
  isGenerating?: boolean;
}

const AIOutputDisplay = ({ output, isGenerating = false }: AIOutputProps) => {
  
  const copyToClipboard = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    toast.success("Result copied to clipboard");
  };

  return (
    <div className="flex flex-col h-full w-full bg-white rounded-lg border border-stone-200 overflow-hidden shadow-sm">
      {/* Header Section */}
      <div className="flex items-center justify-between px-4 py-2 bg-stone-50 border-b border-stone-200">
        <div className="flex items-center gap-2">
          <div className="p-1 bg-emerald-100 rounded-md">
            <Bot className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="text-sm font-medium text-stone-700">AI Math Assistant</span>
        </div>

        <button 
          onClick={copyToClipboard}
          disabled={!output}
          className="p-1.5 hover:bg-stone-100 rounded-md transition-colors text-stone-400 hover:text-stone-600 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Copy result"
        >
          <Copy className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Content Section */}
      <div className="relative flex-1 p-4 overflow-y-auto bg-white custom-scrollbar">
        {output ? (
          <div className="prose prose-stone prose-sm max-w-none">
            {/* Using whitespace-pre-wrap to preserve formatting. 
              If your mathematical output uses LaTeX (e.g. $E=mc^2$), 
              you might want to wrap this later with a library like 'react-latex' or 'katex'.
            */}
            <p className="text-sm text-stone-800 leading-relaxed whitespace-pre-wrap font-medium">
              {output}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-stone-400 gap-2">
            {isGenerating ? (
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