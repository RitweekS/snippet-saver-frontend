import Snippet from '@/components/snippets/snippet'
import React from 'react'

const page = ({params}:{params:{snippetId:number}}) => {

  return (
    <Snippet snippetId={params.snippetId}/>
  )
}

export default page