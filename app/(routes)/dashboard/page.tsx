"use client"
import { Button } from '@/components/ui/button'
import { LogoutLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { useConvex, useMutation } from 'convex/react'
import React, { useEffect } from 'react'
import { api } from '@/convex/_generated/api'

const page = () => {

  const {user}:any=useKindeBrowserClient()

  const convex=useConvex()
  const createUser=useMutation(api.user.CreateUser)


  useEffect(()=>{
    if(user){
      checkUser()
    }


  },[user])


  const checkUser=async()=>{

    const res=await convex.query(api.user.getUser,{email:user?.email})

    if(!res?.length){
      createUser({
        name:user.given_name,
        email:user.email,
        image:user.picture
      }).then((res)=>{
        console.log(res);
        
      }).catch((err)=>{
        console.log("Error Creating User",err);
        
      })
    }




    }

    
      return (
        <div>
        <LogoutLink><Button>Logout</Button></LogoutLink>  
        </div>
      )
  }




export default page