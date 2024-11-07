import React from 'react'

const SnippetLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className=' flex flex-col items-center h-full'>
      <div className='w-[60%] flex-1'>
        {children}
      </div>
    </div>
  )
}

export default SnippetLayout