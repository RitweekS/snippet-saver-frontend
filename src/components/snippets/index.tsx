import React from 'react'
import SearchBox from '../search-box'
import ListItem from './list-item'

const Snippets = () => {
  return (
    <div className='flex flex-col gap-8 py-16'>
        {/* snippets */}
        <p className='text-4xl font-bold'>Snippets</p>
        <div className='flex flex-col gap-5'>
            <SearchBox/>
            <ListItem code='<p>test</p>' language='html' title='Fist Code'/>
        </div>
        {/* search box */}
        {/* langs */}
        {/* list items */}
    </div>
  )
}

export default Snippets