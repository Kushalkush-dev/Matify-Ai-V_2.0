"use client"

import React, { useEffect, useState } from 'react'
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import EditorjsList from '@editorjs/list';
import Quote from '@editorjs/quote';
import ColorPicker from 'editorjs-color-picker';


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




const Editor = () => {

  useEffect(() => {
    initalizeEditor()
  }, [])

  const [initalDoc, setinitalDoc] = useState(initialDocument)




  const initalizeEditor = () => {

    const editor = new EditorJS({

      holder: 'editorjs',
      data: initalDoc,



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


  }




  return (
    <div id='editorjs' className='ml-3'></div>
  )
}

export default Editor