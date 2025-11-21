"use client"

import React, { useEffect, useRef, useState } from 'react'
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import EditorjsList from '@editorjs/list';
import Quote from '@editorjs/quote';
import ColorPicker from 'editorjs-color-picker';
import { useConvex, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';


const initialDocument = {
  time: 1550476186479,
  blocks: [
    {
      id: "123",
      type: "header",
      data: {
        text: "Document Name",
        level: 2
      }
    }
    ,
    {
      data: {

        level: 4,
      },
      id: "1234",
      type: "header",
    }],
  version: "2.8.1"
}




const Editor = ({ saveClick,params,volumeData}: any) => {


  useEffect(() => {

  volumeData && initalizeEditor()
  }, [volumeData])

  const [initalDoc, setinitalDoc] = useState(initialDocument)



  const ref = useRef<EditorJS>()

  const saveDocumentDB=useMutation(api.volume.saveVolume);

  const convex=useConvex()


  useEffect(() => {

     saveDoc()
     

  }, [saveClick])

  
  const saveDoc = () => {

    if (ref.current) {
      ref.current.save().then((outputData) => {

        
          saveDocumentDB(
          {
            _id:params,
            document: JSON.stringify(outputData)  ,
          }
         
        ).then((res)=>toast.success("Updated Successfully")).catch((err)=>toast.error("Error saving Document"))
      
        
        console.log('Article data: ', outputData)
      }).catch((error) => {
        console.log('Saving failed: ', error)
      });
    }
  }



  

  

  const initalizeEditor = () => {

    const editor = new EditorJS({

      holder: 'editorjs',
      data: volumeData?.document?JSON.parse(volumeData.document):initalDoc,



      tools: {
        header: {
          class: Header as any,
          inlineToolbar: true,
          config: {
            placeholder: "Enter the Header",
            defaultLevel: 4,
          },
        },
        List: {
          class: EditorjsList,
          inlineToolbar: true,
          config: {
            defaultStyle: 'unordered'
          },
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
          shortcut: 'CMD+SHIFT+O',
          config: {
            quotePlaceholder: 'Enter a quote',
            captionPlaceholder: 'Quote\'s author',
          },
        },
        ColorPicker: {
          class: ColorPicker as any,
        },


      },
    });

    ref.current=editor

  }



  return (
    <div id='editorjs' className='ml-3'></div>
  )
}

export default Editor