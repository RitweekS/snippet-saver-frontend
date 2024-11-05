"use client"
import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import Button from '../button'
import { usePathname, useRouter } from 'next/navigation';
import { MdExitToApp } from "react-icons/md";

const RightHeader = () => {
    const session = useSession();
    const router = useRouter();
    const path = usePathname();
  return (
    <div className='h-6 flex items-center justify-center'>
        {
            session.data?.user ?
            <div className='flex justify-center items-center gap-2'>
                 {path==="/" && <button onClick={()=>router.push("/snippets")}type="button" className=" text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 active:opacity-85 font-medium rounded-[4px] text-sm px-5 py-[4px]  text-center ">Snippets</button>}
                <div className="h-6 w-6 rounded-full text-gray-100 text-center bg-gray-400 flex justify-center items-center">{session.data.user.name?.split(" ")[0][0]}</div>
                <button className='hover:opacity-80 active:opacity-60' onClick={()=>signOut()}>
                    <MdExitToApp className='text-xl text-gray-100'/>
                </button>
            </div>
            :
            <Button onClick={()=>router.push("api/auth/signin")}>Sign</Button>
        }
    </div>
  )
}

export default RightHeader