'use client'
import React, { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Model from './model';
import Button from './button';
import { useMutation, UseQueryResult } from '@tanstack/react-query';
import AxiosInstance from '@/utils/axios-instance';
import { Response } from '@/utils/common-type';
import { useGlobalStore } from '@/providers/global-state-provider';
import { Editor } from '@monaco-editor/react';
type FormValues = {
    title: string;
    language: string;
    snippet: string;
    notes?: string;
    tags?: string;
};
interface Snippet{
    id: number,
    tags: string[],
    title: string,
    note: string,
    snippet: string,
    language: string
}

interface CreateSnippetFormProps{
    addSnippetModel:boolean
    setAddSnippetModel: React.Dispatch<React.SetStateAction<boolean>>
    getSnippetsQuery: UseQueryResult<Response<Snippet[]>, Error>
}
const CreateSnippetForm = ({addSnippetModel,setAddSnippetModel,getSnippetsQuery}:CreateSnippetFormProps) => {
    const { control,register, handleSubmit,formState: { errors },reset,resetField } = useForm<FormValues>();
    const addSnippetMutation = useMutation({
        mutationFn: async (data: Omit<Snippet, "id">) => {
          try {
            const response = await AxiosInstance.post<Response<string>>(
              `snippets`,
              data,
              { withCredentials: true }
            );
            return response.data;
          } catch (error) {
            console.error("Failed to add snippet:", error);
            throw error;
          }
        },
        onSuccess: async () => {
          await getSnippetsQuery.refetch()
          setAddSnippetModel((prev) => !prev); 
        },
    });

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        const dataToSend:Omit<Snippet,"id"> = {
          language:data.language,
          note:data.notes ?? "",
          snippet:data.snippet,
          tags:[data.tags!],
          title:data.title,
        }
         reset()
        await addSnippetMutation.mutateAsync(dataToSend)
    };


  return (
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
  )
}

export default CreateSnippetForm