import React from 'react'
import { Link } from 'react-router-dom'

function ProductCard({data}) {
  return (
    <Link to={`/book-details/${data._id}`}>
    <div className='w-[500px] h-[600px] border border-black rounded-lg '>
        <div className='w-[500px] h-[450px]'>
            <img src={data?.imageURL} className='w-full h-full'/>
        </div>

        <div className='m-5 text-2xl'>
            <h1>Title : <span className='text-[#94618E] font-medium'>{data?.bookTitle}</span></h1>
        </div>

        <div className='m-3 text-2xl'>
             <p>Author : <span className='text-[#94618E] font-medium'>{data?.authorName}</span></p>
        </div>
    </div>
    </Link>
  )
}

export default ProductCard