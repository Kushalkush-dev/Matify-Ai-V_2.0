import React, { useEffect, useState } from 'react'
import { Excalidraw, Footer, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
const Canvas = ({ params, volumeData, saveClick }: any) => {





  const [canvasData, setcanvasData] = useState<any>()


  useEffect(() => {

  }, [saveClick])

  const updatecanvas = useMutation(api.volume.updateWhiteboard)

  const saveCanvasData = () => {
    try {
      const res=updatecanvas({
        _id:params,
        whiteboard:canvasData
      })
    
  } catch (error) {

  }
}


return (

  <div className='w-full h-[550px]'  >
    <Excalidraw theme='light'
      onChange={(excalidrawElements, appState, files) => console.log(excalidrawElements)
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

    </Excalidraw>

  </div>

)
}

export default Canvas