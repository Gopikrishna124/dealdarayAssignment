import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const [name, setname] = useState("");
  console.log('name',name.length)
  const [address, setaddress] = useState("");
  
  const handleSubmit=async(e)=>{

     e.preventDefault()

    
     if(name<Number(1) || address.length<Number(1)){ 
        
      toast.error('all fields must be filled ') 
    }
    else{

      try{

           const response=await fetch('http://localhost:4000/api/v1/register',{
            method:'post',
            include:true,
            headers:{
              "content-type": "application/json",
            },
            body:JSON.stringify({userName:name,userAddress:address })
           
           })

           const responseData=await response.json()
           console.log('response',responseData)

           
          if(responseData.success){
            toast.success(responseData.message)
            setname('')
            setaddress('')
          }
   
           
      }
    catch(err){
     toast.error(err)
    }
   
    }      
  }
  return (
    <div>
    <ToastContainer position='top-center'/>
    <div className="w-[430px] max-w-[430px] my-4 md:my-0  md:w-[100%] md:max-w-[100%] h-[calc(100vh-300px)] md:h-[calc(100vh-250px)] flex justify-center items-center top-0 right-0 bottom-0 left-0">
      <div className="bg-[#94618E] w-[300px] h-[440px] md:w-[500px] md:h-[450px] opacity-70 rounded-md">
        <form className="w-full">
          <h2 className="text-center text-xl md:text-3xl font-medium text-white my-3 border-b-2 mx-4">
            Register
          </h2>

          <div className="w-full my-7 mx-4">
            <label
              htmlFor="userName"
              className="text-white text-lg md:text-2xl"
            >
              UserName :
            </label>
            <div className="w-full my-3">
              <input
                type="text"
                id="userName"
                name="userName"
                placeholder="Enter your UserName"
                value={name}
                className="w-[80%]  md:w-[90%] h-[30px] md:h-[50px] outline-none rounded-xl placeholder-[#94618E] md:text-xl"
                onChange={(e) => setname(e.target.value)}
              />
            </div>
          </div>

          <div className="w-full my-7 mx-4">
            <label
              htmlFor="Address"
              className="text-white text-lg  md:text-2xl"
            >
              Address:
            </label>
            <div className="w-full my-3 flex items-center">
              <input
                type='text'
                id="Address"
                name="Address"
                placeholder="Enter your Address"
                value={address}
                className="w-[80%] md:w-[90%] h-[30px] md:h-[50px] outline-none rounded-xl placeholder-[#94618E] md:text-xl"
                onChange={(e) => setaddress(e.target.value)}
              />
             
            
            </div>
          </div>

          <div className="w-full my-6 md:my-8 mx-4" >
            <button  onClick={handleSubmit} className="w-[80%] h-[30px] md:w-[90%] md:h-[50px] bg-black text-white rounded-full md:text-2xl tracking-wider">
              Submit
            
            </button>
          </div>

      
        </form>
      </div>
    </div>

  </div>
  );
}

export default App;
