import React, { useState, useRef, useEffect } from "react";
import Logo from "../../Components/Logo";
import { FaRegEyeSlash, FaEye } from "react-icons/fa";
import { toast } from "react-toastify";
import summaryApi from "../../Common/index";
import { Navigate, useNavigate } from "react-router-dom";
import {
  fetchUserDetails,
  resetUserDetails,
  selectUserDetails,
} from "../../Redux/userDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../Components/Header/Header";

function Home() {
  const dispatch=useDispatch()
useEffect(()=>{
   dispatch(fetchUserDetails())
},[dispatch])

  const userHome = useSelector(selectUserDetails);
  console.log('userHome',userHome)
  const navigate=useNavigate()
  console.log('valiation',userHome?.error)


  // if(userHome?.error===true){
  //   localStorage.removeItem('LoginToken')
  //     dispatch(resetUserDetails())
   
  //   navigate('/register')
    
  // } 
  
 
  console.log("userHome", userHome);
  return (
    <div>
      <Header userDeatils={userHome}  />
      <div className="m-8 text-3xl text-red-600 p-36">
        <p>{userHome?.data?.UserName}</p>
      </div>
       <div className="flex justify-center items-center 
        text-3xl 
       text-red-600">
          <p>Welcome Admin Panel</p>
       </div>
    </div>
  );
}

export default Home;
