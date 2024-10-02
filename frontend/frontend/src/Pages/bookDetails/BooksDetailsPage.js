import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import summaryApi from '../../Common/index.js'
import AddReviewPop from '../../Components/AddReviewPop.js'

function BooksDetailsPage() {
  const params=useParams()
  const [paramData,setParamData]=useState('')
  console.log('params',params)
  const [showForm,setShowForm]=useState(false)
  const [data,setData]=useState({
   Name:'',
   description:''
})
const[reviewData,setreviewData]=useState([])
  
///////////////////////////////////////////////////////////

  async function getReviews(){
      const response=await fetch(`${summaryApi.getreviews.url}/${params.id} `,{
         method:summaryApi.getreviews.method,
         credentials:'include'
      })

      const responseData=await response.json()
      console.log('getReeviews',responseData)
      setreviewData(responseData.data)
  } 
//////////////////////////////////////////////////////////
  const fetchParamsBook=async()=>{
      const response=await fetch(`${summaryApi.paramsBookDetails.url}/${params.id}`,{
         method:summaryApi.paramsBookDetails.method,
         credentials:'include'
      })

      const data=await response.json()
      console.log('paramsData',data)
      setParamData(data.data)
  }
  ////////////////////////////////////////////////
  useEffect(()=>{
     fetchParamsBook()
     getReviews()
  },[params.id,showForm])


  return (
    <div className='flex flex-col justify-center items-center relative'>
       <div className='flex gap-11 items-center my-8'>
         <div className='w-[500px] h-[700px] max-h-[800px] bg-yellow-200'>
           <img src={paramData.imageURL} className='w-full h-full'/>
         </div>

         <div className='w-[500px] h-[700px]'>
             <div className='my-4 text-2xl'>
                <h1 className='text-red-500'>Title : <span className='text-black'>{paramData.bookTitle}</span></h1>
             </div>
              
              <div className='my-4 text-2xl'>
                 <p className='text-red-500'>Author : <span className='text-black text-xl'>{paramData.authorName}</span></p>
              </div>

              <div className='my-4 text-2xl'>
                  <p className='text-red-500'>Description : <span className='text-black'>{paramData.bookDescription}</span></p>
              </div>

              <div>
              <button  onClick={()=>setShowForm(true)} className=" w-[150px] h-[50px] bg-black  text-white md:text-xl rounded-md hover:bg-black hover:text-white ml-[40px] md:ml-[0px]">
               add Review
            </button>


             </div>
             
         </div>
       </div>

       <div className='w-[80%] min-h-[100px]  max-h-[500px] h-auto items-center overflow-scroll  border border-black'>
           <div className='text-center text-2xl'>
              <h1>Reviews</h1>
           </div>

           <div className='flex justify-center items-center flex-col gap-5 my-5'>
             {
               reviewData.length > 0 ?
                 reviewData.map((review,index)=>(
                     <div className='w-[600px] min-h-[100px]  h-auto border border-black rounded-xl p-6'>                 
                    <div className='my-3'>
                       <p className='text-red-500 text-2xl'>Name : <span className='text-black text-xl'>{review.Name}</span></p>
                     </div>
                     <div>
                        <p className='text-red-500 text-2xl'>description :<span className='text-black text-xl'>{review.description}</span></p>
                        </div>
                     </div>
                 ))
              :<div className='text-2xl'>
               No reviews yet 
               </div>
             }
           </div>
       </div>

       
       {
         showForm && <AddReviewPop reviewData={reviewData} setreviewData={setreviewData} bookId={paramData._id} data={data} setData={setData} close={()=>setShowForm(false)} />
       }
       
    </div>
  )
}

export default BooksDetailsPage
