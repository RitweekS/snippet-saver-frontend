import Image from 'next/image'
import React from 'react'

const Landing = () => {
  return (
    <div className=' h-full flex justify-center items-center'>
      <div className='w-[70%] h-[70%] bg-red-300 relative'>
          <Image src={"/snipptes.jpg"} alt='snippets' fill/>
          <div className='inline-block absolute z-50   left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-center'>
              <div className="relative overflow-hidden text-white  text-4xl tracking-wider border-r-4 border-white whitespace-nowrap w-full  animate-typing">
                   Save, Manage and Copy Code Snippets...
                  <span className="absolute top-0 right-0 animate-cursor">&nbsp;</span>
              </div>
          </div>
         
      </div>
     

    </div>
  )
}

export default Landing