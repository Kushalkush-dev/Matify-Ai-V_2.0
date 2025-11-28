
import React, { useContext, useEffect, useState } from 'react'
import { Excalidraw, exportToBlob, Footer, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { aiGenerating, aiSolution } from '../_context/Volumescontext';


const Canvas = ({ saveClick, params, volumeData,calculateClick }: any) => {





  const [canvasData, setcanvasData] = useState<any>()


  const [excalidrawAPI, setexcalidrawAPI] = useState<any>(null)


  const [capturedImage, setcapturedImage] = useState<any>('')


  const [latexSolution, setlatexSolution] = useState<any>()


  const {aianswer,setaianswer}=useContext(aiSolution)

  const {isCalculating,setisCalculating}=useContext(aiGenerating)

  const captureCanvasImage=async()=>{
    if(!excalidrawAPI)return null;


    // 1. Get the current image/state of excalidraw
    
    const elements = excalidrawAPI.getSceneElements();
    const appState = excalidrawAPI.getAppState();
    const files = excalidrawAPI.getFiles();

    // 2. Generate the Blobimage which removes unwanted grids and mistakes and returns a plain canvas with user drawn data (Image file)
    
    const blob = await exportToBlob({
      elements,
      appState: {
        ...appState,
        exportWithDarkMode: false, // Force light mode for the image
        exportBackground: true,
      },
      files,
      mimeType: "image/png",
      quality: 1,
    });


    //Convert blob image to base64 string 

    return new Promise((resolve) => {
      const reader=new FileReader()
      reader.readAsDataURL(blob)
      reader.onloadend=()=>{
        const base64Image=reader.result;
        console.log("Base64 image",base64Image);
        setcapturedImage(base64Image)
        resolve(base64Image)
      }
    })


  }





  const AiResponse=async()=>{
    if(!excalidrawAPI) return;

    
    try {
      setisCalculating(true)
      const base64Image = await captureCanvasImage()
      const response =await fetch('/api/calculate',{
        method:'POST',
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({image:base64Image})
      })
      console.log(response);
      
      if(response.ok){
       
        const data = await response.json();
        console.log("AI Solution:", data);
        setlatexSolution(data.solution)
        setaianswer(data.solution)
        setisCalculating(false)

        
      }

    } catch (error) {
      console.log("Error in AI response",error);
      
    }

  }



  useEffect(()=>{

    setaianswer(latexSolution)

  },[latexSolution])


  useEffect(()=>{

    if(!params || !canvasData) return;
    console.log(capturedImage);
    
    AiResponse()


  },[calculateClick])



  useEffect(() => {

    if (!params || !canvasData) return;

    saveCanvasData()

    captureCanvasImage()


  }, [saveClick])

  const updatecanvas = useMutation(api.volume.updateWhiteboard)

  const saveCanvasData = async () => {

    try {
      const res = await updatecanvas({
        _id: params,
        whiteboard: JSON.stringify(canvasData)
      })


      toast.success("Canvas saved Successfully")
      console.log(res);




    } catch (error) {
      console.log("Error Canvas DB", error);
      toast.error("Error saving canvas data to DB")
    }
  }


  return (

    <div className='w-full h-[550px]'  >
      {volumeData && <Excalidraw excalidrawAPI={(api)=>setexcalidrawAPI(api)}  theme='light' initialData={{ elements: volumeData?.whiteboard && JSON.parse(volumeData?.whiteboard) }}
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