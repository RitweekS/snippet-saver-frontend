import React from 'react'
import RightHeader from './right-header';

const AppBar =  () => {
  return (
    <div className='flex flex-row justify-between p-4 items-center'>
        <p className='text-gray-100'>snippet saver</p>
        <RightHeader/>
    </div>
  )
}

export default AppBar