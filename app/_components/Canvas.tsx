import React from 'react'
import { Excalidraw, Footer, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
const Canvas = () => {

  return (


    <div className='w-full h-[550px]'  >
      <Excalidraw theme='light' 
          onChange={(excalidrawElements, appState, files)=>console.log(excalidrawElements)
          }

          
       UIOptions={{

        
        canvasActions:{
           saveToActiveFile:false,
            loadScene:false,
            export:false,
            toggleTheme:false

        },
    }} >
        <WelcomeScreen>
         <WelcomeScreen.Hints.MenuHint />
         <WelcomeScreen.Hints.ToolbarHint/>

        </WelcomeScreen>

        <MainMenu>
          <MainMenu.DefaultItems.ClearCanvas/>
          <MainMenu.DefaultItems.ChangeCanvasBackground/>
          <MainMenu.DefaultItems.Export/>
        </MainMenu>

        <Footer>
          
        </Footer>

      </Excalidraw>

    </div>

  )
}

export default Canvas