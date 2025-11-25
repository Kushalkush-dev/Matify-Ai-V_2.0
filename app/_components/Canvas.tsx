
import React, { useEffect, useState } from 'react'
import { Excalidraw, Footer, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';


const Canvas = ({ saveClick,params,volumeData}: any) => {





  const [canvasData, setcanvasData] = useState<any>()


  useEffect(() => {
   
    if(!params || !canvasData) return;

      saveCanvasData()
    

  }, [saveClick])

  const updatecanvas = useMutation(api.volume.updateWhiteboard)

  const saveCanvasData = async() => {
    
    try {
      const res=await updatecanvas({
        _id:params,
        whiteboard: JSON.stringify(canvasData)
      })

      
        toast.success("Canvas saved Successfully")
        console.log(res);
        
     
      

  } catch (error) {
    console.log("Error Canvas DB",error);
    toast.error("Error saving canvas data to DB")
  }
}


return (

  <div className='w-full h-[550px]'  >
   { volumeData && <Excalidraw theme='light' initialData={{elements:volumeData?.whiteboard && JSON.parse(volumeData?.whiteboard) }}
      onChange={(excalidrawElements, appState, files) => setcanvasData(excalidrawElements)
      }


      UIOptions={{


        canvasActions: {
          saveToActiveFile: false,
          loadScene: false,
          export: false,
          toggleTheme: false

        },
      }} >
      <WelcomeScreen>
        <WelcomeScreen.Hints.MenuHint />
        <WelcomeScreen.Hints.ToolbarHint />

      </WelcomeScreen>

      <MainMenu>
        <MainMenu.DefaultItems.ClearCanvas />
        <MainMenu.DefaultItems.ChangeCanvasBackground />
        <MainMenu.DefaultItems.Export />
      </MainMenu>

      <Footer>

      </Footer>

    </Excalidraw>}

  </div>

)
}

export default Canvas