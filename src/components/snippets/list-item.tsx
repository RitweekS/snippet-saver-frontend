import React from 'react'

interface ListItemProps {
    title : string
    language : string
    code : string
}
const ListItem = ({code,language,title}:ListItemProps) => {
  return (
    <div className='flex justify-between rounded-[4px] border border-gray-700 p-4'>
        <div className='flex gap-4'>
            <div>i</div>
                <div className='flex flex-col gap-1'>
                    <p>{title}</p>
                    <p>{language}</p>
                    <p>{code}</p>
                </div>
            </div>
        <div>menu</div>
    </div>
  )
}

export default ListItem