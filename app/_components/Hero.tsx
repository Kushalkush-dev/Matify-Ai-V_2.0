import { RegisterLink } from '@kinde-oss/kinde-auth-nextjs'
import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
<section className="bg-white lg:grid lg:h-screen lg:place-content-center dark:bg-gray-900">
  <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-10 md:grid md:grid-cols-2 md:items-center md:gap-4 lg:px-8 lg:py-32">
    <div className="max-w-prose text-left">
      <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl dark:text-white">
        Math solving,<strong className="text-indigo-600">reimagined</strong> on canvas.
        
      </h1>

      <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed dark:text-gray-200">
        Don't just type, draw. Matify AI interprets your handwriting to solve complex logic, geometry, and calculus problems instantly.


      </p>

      <div className="mt-4 flex gap-4 sm:mt-6">
        
         <RegisterLink className="inline-block rounded border border-indigo-600 bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700">Get Started</RegisterLink> 
        

        <a className="inline-block rounded border border-gray-200 px-5 py-3 font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white" href="#">
          Learn More
        </a>
      </div>
    </div>

   <Image className='ml-7' src={"/newherov2.png"} width={500} height={500} alt='heroo'/>
    
  </div>
</section>  )
}

export default Hero