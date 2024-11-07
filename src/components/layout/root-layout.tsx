"use client"
import React from 'react'
import AppBar from '../appbar/app-bar'
import Border from '../border'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const RootLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='bg-black h-screen font-serif text-gray-100 flex flex-col'>
        <AppBar/>
        <Border/>
        <div className='flex-1 bg-black overflow-auto'>
          {children}
        </div>
      </div>
    </QueryClientProvider>
  )
}

export default RootLayout