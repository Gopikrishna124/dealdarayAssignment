import React from 'react'
import { useState } from 'react'
import summaryApi from '../Common/index';
import { IoMdClose } from "react-icons/io";

function AddReviewPop({reviewData,setreviewData,bookId,data,setData,close,}) {

    ///////////////////////////////////////////////
    function changeInput(e){
        const { name, value } = e.target;

        setData((prev) => {
          return {
            ...prev,
            [name]: value,
          };
        });
    }
 
    ////////////////////////////////////////////////
 
    async function handleSubmit(e){
        e.preventDefault()
         const response=await fetch(summaryApi.addreview.url,{
            method:summaryApi.addreview.method,
            credentials:'include',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({bookId:bookId,Name:data.Name,description:data.description})
         })
         const responseData=await response.json()
         console.log('responseData',responseData)
       setreviewData(responseData.data)

       close()

    }
  return (
    <div className='bg-blue-100 bg-opacity-10 '>
        
    <div className='bg-blue-50 flex w-full h-full max-w-[850px] max-h-[750px]  fixed top-36  justify-center items-center'>
       <form >
      
       <div className="my-[200px] md:my-[220px] lg:my-[150px]">
  

      <div className="w-[430px] max-w-[430px] my-4 md:my-0  md:w-[100%] md:max-w-[100%] h-[calc(100vh-300px)] md:h-[calc(100vh-250px)] flex justify-center items-center top-0 right-0 bottom-0 left-0">
      
    


        <div className="bg-[#94618E] w-[300px] h-[450px] md:w-[500px] md:h-[500px]  opacity-70 rounded-md">

              <div className='cursor-pointer text-5xl mt-5 ml-[500px] absolute top-1' onClick={close}><IoMdClose/> </div>         
              
          <form className="w-full">

        
            <div className="w-full my-7 mx-4">
              <label htmlFor="Email" className="text-white text-lg md:text-2xl">
                Name
              </label>
              <div className="w-full my-3">
                <input
                  type="text"
                  id="Name"
                  name="Name"
                  placeholder="Enter your Name"
                  value={data.Name}
                  className="w-[80%]  md:w-[90%] h-[30px] md:h-[50px] outline-none rounded-xl placeholder-[#94618E] md:text-xl"
                  onChange={changeInput}
                />
              </div>
            </div>


            <div className="w-full my-7 mx-4">
              <label htmlFor="Email" className="text-white text-lg md:text-2xl">
                description
              </label>
              <div className="w-full my-3">
                <textarea
                  type="text"
                  id="description"
                  name="description"
                  placeholder="Enter your description"
                  value={data.description}
                  className=" w-[90%] h-[100px]  outline-none  placeholder-[#94618E] text-xl"
                  onChange={changeInput}
                />
              </div>
            </div>


            <div className="w-full my-6 md:my-8 mx-4">
              <button
                onClick={handleSubmit}
                className="w-[80%] h-[30px] md:w-[90%] md:h-[50px] bg-black text-white rounded-full md:text-2xl tracking-wider"
              >
                Submit
              </button>
            </div>
 
          </form>
        </div>
      </div>
    </div>
        </form>    
     </div>
    
 
</div>
  )
}

export default AddReviewPop