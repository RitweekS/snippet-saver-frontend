import Image from 'next/image'
import React from 'react'
import { MdMoreHoriz } from "react-icons/md";
import DropdownMenu from '../DropdownMenu';


interface ListItemProps {
    title : string
    language : string
    code : string
}
const ListItem = ({code,language,title}:ListItemProps) => {
  return (
    <div className='flex justify-between items-start rounded-[4px] border border-gray-700 p-4'>
        <div className='flex gap-4 items-start'>
            <Image src={"/snippet-list-item.svg"} alt='snippet' width={48} height={48}/>
            <div className='flex flex-col gap-1 items-start'>
                <p className='text-base font-medium'>{title}</p>
                <p className='text-[14px] text-gray-400 font-normal'>{language}</p>
                <pre className='text-[14px] text-gray-400 font-normal'>{code.split('\n')[0]}</pre>
            </div>
        </div>
        <DropdownMenu/>
    </div>
  )
}

export default ListItem