
import "./App.css";
import React, { useEffect } from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
import Header from "./Components/Header";
import { fetchUserDetails } from "./Redux/UserDetailsSlice";
import { useDispatch } from "react-redux";

function App() {
  const dispatch=useDispatch()

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
