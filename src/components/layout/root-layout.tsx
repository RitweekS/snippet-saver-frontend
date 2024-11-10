"use client"
import React, { useEffect } from 'react'
import AppBar from '../appbar/app-bar'
import Border from '../border'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useGlobalStore } from '@/providers/global-state-provider'

const queryClient = new QueryClient()

const RootLayout = ({children}:{children:React.ReactNode}) => {
  const session = useSession()
  const {setUserId} = useGlobalStore()
 
  useEffect(() => {
    if(session.status==="authenticated" && session.data.user){
      setUserId(Number((session.data.user as any).id))
    }
  }, [session.status, session.data, setUserId])
  
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