'use client'
import React, { useState } from 'react'
import SearchBox from '../search-box'
import ListItem from './list-item'
import Image from 'next/image'
import Model from '../model'
import Button from '../button'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import Editor from "@monaco-editor/react";
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Response } from '@/utils/common-type'

type FormValues = {
  title: string;
  language: string;
  snippet: string;
  notes?: string;
  tags?: string;
};

interface Snippet{
    id: 3,
    tags: string[],
    title: string,
    note: string,
    snippet: string,
    language: string
}

const Snippets = () => {
  const [addSnippetModel,setAddSnippetModel] = useState(false)
  const { control,register, handleSubmit,getValues ,formState: { errors } } = useForm<FormValues>();
  const queryClient = new QueryClient()
  const addSnippetMutation = useMutation({
    mutationFn:async (data:Omit<Snippet,"id">)=>{
        await axios.post<Response<string>>("http://localhost:8080/v1/snippets/1",data)
    },
    onSuccess:()=>{
      queryClient.invalidateQueries({
        queryKey: ['getSnippets'],
      })
    }
  }); 
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const dataToSend:Omit<Snippet,"id"> = {
      language:data.language,
      note:data.notes ?? "",
      snippet:data.snippet,
      tags:[data.tags!],
      title:data.title,
    }
    await addSnippetMutation.mutateAsync(dataToSend)
  };

  const getSnippetsQuery = useQuery({
    queryKey:["getSnippets"],
    queryFn: async ()=>{
      const response = await axios.get<Response<Snippet[]>>("http://localhost:8080/v1/snippets/1")
      return response.data
    }
  })


  return (
    <div className='flex flex-col gap-8 py-6'>
        <div className='flex justify-between items-center'>
          <p className='text-4xl font-bold leading-[0px]'>Snippets</p>
          <button className='hover:opacity-80 active:opacity-70' onClick={()=>setAddSnippetModel(true)}>
            <Image src={"/add.svg"} alt='snippet' width={30} height={30}/>
          </button>
        </div>
        <Model 
          open={addSnippetModel} 
          setOpen={setAddSnippetModel} 
          footer={
            <div className='flex justify-end items-center p-[16px]'>
              <Button onClick={handleSubmit(onSubmit)}>Add</Button>
            </div>} 
          title='Add New Snippet'
        >
          <div className='p-4 overflow-auto'>
              <form  className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  placeholder="Type a title"
                  {...register("title", { required: "Title is required" })}
                  className="w-full p-3 bg-gray-800 text-white placeholder-gray-400 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-gray-600"
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Language</label>
                <input
                  type="text"
                  placeholder="Type a language"
                  {...register("language", { required: "language is required" })}
                  className="w-full p-3 bg-gray-800 text-white placeholder-gray-400 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-gray-600"
                />
                {errors.language && <p className="text-red-500 text-sm mt-1">{errors.language.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Snippet</label>
                <Controller
                  name="snippet"
                  control={control}
                  render={({ field }) => (
                    <div className='rounded-[4px] overflow-hidden'>
                    <Editor
                      height="150px"
                      value={field.value}
                      theme='vs-dark'
                      onChange={(value) => field.onChange(value)}
                      language="javascript"
                      options={{
                        // readOnly: true,
                        // minimap: { enabled: false },
                        // scrollBeyondLastLine: false,
                        // editorBackground: 'black',
                      }}
                      
                    />
                  </div>
                  )}
                />
                {errors.snippet && <p className="text-red-500 text-sm mt-1">{errors.snippet.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Notes</label>
                <textarea
                  placeholder="Optional: add notes, context, or usage instructions"
                  {...register("notes")}
                  className="w-full p-3 bg-gray-800 text-white placeholder-gray-400 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-gray-600"
                  rows={3}
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Tags</label>
                <input
                  type="text"
                  placeholder="#javascript #api #frontend"
                  {...register("tags")}
                  className="w-full p-3 bg-gray-800 text-white placeholder-gray-400 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-gray-600"
                />
              </div>
            </form>
          </div>
        </Model>
        <div className='flex flex-col gap-5'>
            <SearchBox/>
            {
              getSnippetsQuery.data?.response_data && getSnippetsQuery.data?.response_data.map((snippet)=>{
                return <ListItem code={snippet.snippet} language={snippet.language} title={snippet.title} key={snippet.id}/>

              })
            }
        </div>
    </div>
  )
}

export default Snippets