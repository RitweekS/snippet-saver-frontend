"use client"
import Button from '@/components/button'
import Model from '@/components/model'
import { useGlobalStore } from '@/providers/global-state-provider'
import AxiosInstance from '@/utils/axios-instance'
import { Response } from '@/utils/common-type'
import { Editor } from '@monaco-editor/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React, { useMemo, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

interface SnippetProps{
    snippetId:number
}
interface Snippet{
    id: number,
    tags: string[],
    title: string,
    note: string,
    snippet: string,
    language: string
}
type FormValues = {
    title: string;
    language: string;
    snippet: string;
    notes?: string;
    tags?: string;
  };
const Snippet = ({snippetId}:SnippetProps) => {
    
   
    const [updateSnippet,setUpdateSnippetModel] = useState(false)

    const {userId} = useGlobalStore()
    const router = useRouter()
    const getSnippetByIdQuery = useQuery({
        queryKey:["getSnippetByID"],
        queryFn: async ()=>{
          const response = await AxiosInstance.get<Response<Snippet>>(`snippets/${snippetId}`)
          return response.data
        },
        enabled:!!userId && !!snippetId
    })

    const snippetDetails:Snippet|null = useMemo(()=>{
        const data = getSnippetByIdQuery.data?.response_data
         if(data){
             const snippet:Snippet = {
                 id:data.id,
                 language:data.language,
                 note:data.note,
                 snippet:data.snippet,
                 tags:data.tags,
                 title:data.title
             } 
             return snippet
         }
         return null
    },[getSnippetByIdQuery.isLoading])

    const { control,register, handleSubmit,formState: { errors,isDirty } } = useForm<FormValues>({
        defaultValues:{
            language:snippetDetails?.language,
            notes:snippetDetails?.note,
            snippet:snippetDetails?.snippet,
            tags:snippetDetails?.tags.join(","),
            title:snippetDetails?.title
        }
    });

    const deleteSnippetByIDmutation = useMutation({
        mutationKey:["deleteSnippetByID"],
        mutationFn: async ()=>{
          const response = await AxiosInstance.delete<Response<Snippet>>(`snippets/${snippetId}`)
          return response.data
        },
        onSuccess:({response_code})=>{
            if(response_code===200){
                router.back()
            }
        }
    })

    const updateSnippetByIDmutation = useMutation({
        mutationKey:["updateSnippetByID"],
        mutationFn: async (data:Omit<Snippet,"id">)=>{
          const response = await AxiosInstance.put<Response<Snippet>>(`snippets/${snippetId}`,data)
          return response.data
        },
        onSuccess:({response_code})=>{
            if(response_code===200){
               setUpdateSnippetModel(false)
               getSnippetByIdQuery.refetch()
            }
        }
    })

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        const dataToSend:Omit<Snippet,"id"> = {
          language:data.language,
          note:data.notes ?? "",
          snippet:data.snippet,
          tags:[data.tags!],
          title:data.title,
        }
        await updateSnippetByIDmutation.mutateAsync(dataToSend)
    };


    
    
  return (
    <div className='p-6 h-full flex gap-6 flex-col'>
        <h1 className='text-3xl font-bold'>Snippet Details</h1>
         <div className='flex flex-col'>
            <p className='text-2xl font-semibold'>{snippetDetails?.title}</p>
            <p className='text-[14px] text-gray-300 font-normal'>{snippetDetails?.language}</p>
        </div>
        <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
                <label className='text-base font-semibold'>Tags</label> 
                {
                    snippetDetails?.tags.map((tag,index)=>
                    <span key={index+tag}>
                        <p className='text-[14px] font-normal px-[6px] rounded-[4px] bg-gr  ay-700 text-gray-100 inline-block'>{tag}</p>
                    </span>)
                }

            </div>
            <div className='flex flex-col gap-2'>
                <label className='text-base font-semibold'>
                    Notes
                </label>
                <p className='text-[14px] text-gray-100'>{snippetDetails?.note}</p>
            </div>
            <div className='flex flex-col gap-2'>
                <label className='text-base font-semibold'>Snippet</label>
                <Editor
                    height="300px"
                    value={snippetDetails?.snippet}
                    theme='vs-dark'
                    language={snippetDetails?.language}
                    options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    }}
                />
            </div>
        </div>
        <Model 
          open={updateSnippet} 
          setOpen={setUpdateSnippetModel} 
          footer={
            <div className={`flex justify-end items-center p-[16px] ${!isDirty?"opacity-80":"opacity-100"}`}>
              <Button onClick={handleSubmit(onSubmit)} disabled={!isDirty}>Update</Button>
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
                  defaultValue={snippetDetails?.title}
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
                  defaultValue={snippetDetails?.language}
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
                      value={snippetDetails?.snippet}
                      theme='vs-dark'
                      onChange={(value) => field.onChange(value)}
                      language="javascript"
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
                  defaultValue={snippetDetails?.note}
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
                  disabled
                  defaultValue={snippetDetails?.tags}
                  {...register("tags")}
                  className="w-full p-3 bg-gray-800 opacity-70 text-white placeholder-gray-400 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-gray-600"
                />
              </div>
            </form>
          </div>
        </Model>
        <div className='flex gap-4 self-end'>
            <button className='hover:bg-gray-100 hover:text-gray-950 active:opacity-80 pr-4 pl-4 pt-1 pb-1 rounded-[4px]' onClick={async ()=>{
                await deleteSnippetByIDmutation.mutateAsync()
            }}>Delete</button>
            <Button onClick={()=>setUpdateSnippetModel(!updateSnippet)}>Edit</Button>
        </div>
    </div>
  )
}

export default Snippet