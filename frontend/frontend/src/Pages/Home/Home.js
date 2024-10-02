import React from 'react'
import { useEffect } from 'react'
import { fetchUserDetails } from '../../Redux/UserDetailsSlice'
import { selectUserDetails } from '../../Redux/UserDetailsSlice'
import {useDispatch, useSelector} from 'react-redux'
import { fetchBookDetails } from '../../Redux/BookSlicer'
import { selectBookDetails } from '../../Redux/BookSlicer'
import ProductCard from '../../Components/ProductCard'

function Home() {
    
  const dispatch=useDispatch()
  const userInfo=useSelector(selectUserDetails)
  // console.log('userInfo',userInfo)
  const booksInfo=useSelector(selectBookDetails)
  // console.log('booksInfo',booksInfo)
  ///////////////////////////////////
  useEffect(()=>{
     dispatch(fetchUserDetails())
     dispatch(fetchBookDetails())
  },[dispatch,userInfo?._id,booksInfo?.length])

/////////////////////////////////////
  
  return (
    <div className='flex justify-around items-center p-4'>
    <div className='m-6 grid grid-cols-3 gap-10'>
     {
      booksInfo.map((book,index)=>{
       return (
        <div>
       <ProductCard data={book}/>
       </div>
        )
      })

    }
  </div>
 </div>
   
  )
}

export default Home