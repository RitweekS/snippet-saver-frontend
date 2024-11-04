import React from 'react'
import AppBar from '../app-bar'
import Border from '../border'


const RootLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='bg-black h-screen flex flex-col'>
      <AppBar/>
      <Border/>
      <div className='flex-1'>
        {children}
      </div>
    </div>
  )
}

export default RootLayout