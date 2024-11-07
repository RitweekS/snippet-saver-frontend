"use client"
import Button from '@/components/button'
import { Editor } from '@monaco-editor/react'
import React from 'react'

const Snippet = () => {
  return (
    <div className='p-6 h-full flex gap-6 flex-col'>
        {/* breadcrumbs */}
        <h1 className='text-3xl font-bold'>Snippet Details</h1>
         <div className='flex flex-col'>
            <p className='text-2xl font-semibold'>Create a code</p>
            <p className='text-[14px] text-gray-300 font-normal'>python</p>
        </div>
        <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
                <label className='text-base font-semibold'>Tags</label> 
                 <span>
                    <p className='text-[14px] font-normal px-[6px] rounded-[4px] bg-gray-700 text-gray-100 inline-block'>chip</p>
                </span>
            </div>
            <div className='flex flex-col gap-2'>
                <label className='text-base font-semibold'>
                    Notes
                </label>
                <p className='text-[14px] text-gray-100'>dfsf fdsdf fddf dfdsffds fdsf ds fd fds fds</p>
            </div>
            <div className='flex flex-col gap-2'>
                <label className='text-base font-semibold'>Snippet</label>
                <Editor
                    height="300px"
                    value={"log"}
                    theme='vs-dark'
                    language="javascript"
                    options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    }}
                />
            </div>
        </div> 
        <div className='flex gap-4 self-end'>
            <button className='hover:bg-gray-100 hover:text-gray-950 active:opacity-80 pr-4 pl-4 pt-1 pb-1 rounded-[4px]'>Delete</button>
            <Button>Edit</Button>
        </div>
    </div>
  )
}

export default Snippet