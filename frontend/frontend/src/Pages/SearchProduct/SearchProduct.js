import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import summaryApi from '../../Common/index'
import { useEffect } from 'react'
import ProductCard from '../../Components/ProductCard'

function SearchProduct() {
    const query=useLocation()
    console.log('query',query)
    const [searchData,setSearchData]=useState('')
  
    const fetchProduct=async(req,res)=>{
          const response=await fetch(summaryApi.searchBook.url+query.search,{
                  method:summaryApi.searchBook.method
            })
            const data=await response.json()
            console.log('searchData',data)
            setSearchData(data.data)
    }
    useEffect(()=>{
         fetchProduct()
    },[query])
  return (
    
    <div className='flex justify-around items-center p-4'>
    <div className='m-6 grid grid-cols-3 gap-10'>    
        {
            searchData.length > 0 && (
           searchData.map((book,index)=>(
              <ProductCard data={book} />
           ))
        )
        }
    </div>
    </div>
  )
}

export default SearchProduct