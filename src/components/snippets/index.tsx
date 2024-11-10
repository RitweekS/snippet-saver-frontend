'use client'
import React, { useState } from 'react'
import SearchBox from '../search-box'
import ListItem from './list-item'
import Image from 'next/image'
import Model from '../model'
import Button from '../button'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import Editor from "@monaco-editor/react";
import { useMutation, useQuery } from '@tanstack/react-query'
import { Response } from '@/utils/common-type'
import AxiosInstance from '@/utils/axios-instance'
import { useGlobalStore } from '@/providers/global-state-provider'
import CreateSnippetForm from '../create-snippet-form'

 interface Snippet{
    id: number,
    tags: string[],
    title: string,
    note: string,
    snippet: string,
    language: string
}

const Snippets = () => {
  const [addSnippetModel,setAddSnippetModel] = useState(false)
  const {userId} = useGlobalStore()
  
  const getSnippetsQuery = useQuery({
    queryKey:["getSnippets"],
    queryFn: async ()=>{
      const response = await AxiosInstance.get<Response<Snippet[]>>(`snippets/${userId}`)
      return response.data
    },
    enabled:!!userId
  })

  return (
    <div className='flex flex-col gap-8 py-6'>
        <div className='flex justify-between items-center'>
          <p className='text-4xl font-bold leading-[0px]'>Snippets</p>
          <button className='hover:opacity-80 active:opacity-70' onClick={()=>setAddSnippetModel(true)}>
            <Image src={"/add.svg"} alt='snippet' width={30} height={30}/>
          </button>
        </div>
        <CreateSnippetForm addSnippetModel={addSnippetModel} setAddSnippetModel={setAddSnippetModel} getSnippetsQuery={getSnippetsQuery}/>
        <div className='flex flex-col gap-5'>
            <SearchBox/>
            {
              getSnippetsQuery.data?.response_data && getSnippetsQuery.data?.response_data.map((snippet)=>{
                return <ListItem code={snippet.snippet} language={snippet.language} title={snippet.title} key={snippet.id} id={snippet.id}/>

              })
            }
        </div>
    </div>
  )
}

export default Snippets