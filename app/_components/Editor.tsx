"use client"

import React, { useEffect } from 'react'
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';

import EditorjsList from '@editorjs/list';
const Editor = () => {

useEffect(()=>{
  initalizeEditor()
},[])

const initalizeEditor=()=>{
  
const editor = new EditorJS({
 
  holder: 'editorjs',
  tools: { 
    header: Header, 
     List: {
      class: EditorjsList,
      inlineToolbar: true,
      config: {
        defaultStyle: 'unordered'
      },
    },
  }, 
});
  

}




  return (
    <div id='editorjs'></div>
  )
}

export default Editor