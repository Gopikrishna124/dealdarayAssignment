
import "./App.css";
import React, { useEffect } from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Components/Header";
import { fetchUserDetails, selectAuth, selectUserDetails } from "./Redux/UserDetailsSlice";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const userInfo=useSelector(selectUserDetails)
  console.log('userINfo',userInfo)
    
  useEffect(()=>{
      dispatch(fetchUserDetails())
      
      
  },[dispatch])

 
  return (
    <div>
       <ToastContainer position='top-center'/>
      <Header/>
      <Outlet/>
    </div>
  )
}

export default App;
