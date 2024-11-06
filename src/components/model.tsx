import React from 'react'
import Border from './border'
import Image from 'next/image'


interface ModelProps{
    open : boolean
    setOpen : React.Dispatch<React.SetStateAction<boolean>>
    title : string
    children : React.ReactNode
    footer ?:   React.ReactNode
}
const Model = ({children,open,setOpen,title,footer}:ModelProps) => {
    return (
    <div aria-hidden="true" className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-10 backdrop-blur-[3px] ${!open && "hidden"}`}>
        <div className='flex-1 h-full flex justify-center items-center'>
            <div className='bg-black rounded-[4px] flex flex-col w-[50%] h-[80%]'>
                <div className='flex justify-between items-center p-[16px]'>
                    <p className='text-xl font-semibold'>{title}</p>
                    <button className='hover:opacity-80 active:opacity-70' onClick={()=>setOpen(false)}>
                        <Image src={"/cancel.svg"} alt='snippet' width={30} height={30}/>
                    </button>
                </div>
                <Border/>
                <div className='flex-1 overflow-auto'>
                    {children}
                </div>
                {footer}
            </div>
        </div>
    </div> 
  )
}

export default Model