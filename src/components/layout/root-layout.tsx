import React from 'react'
import AppBar from '../appbar/app-bar'
import Border from '../border'


const RootLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='bg-black h-screen font-serif text-gray-100 flex flex-col'>
      <AppBar/>
      <Border/>
      <div className='flex-1'>
        {children}
      </div>
    </div>
  )
}

export default RootLayout