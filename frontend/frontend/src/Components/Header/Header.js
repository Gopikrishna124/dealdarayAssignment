import React from "react";
import { Link, useNavigate } from "react-router-dom"; 
import Logo from "../Logo";
import {
    fetchUserDetails,
    selectUserDetails,
  } from "../../Redux/userDetailsSlice";
  import { useDispatch, useSelector } from "react-redux";
  import { useEffect } from "react";
import summaryApi from "../../Common";
import ProtectedRoute from "../ProtectedRoute";
import Home from "../../Pages/Home/Home";
function Header() {
    const dispatch = useDispatch();
    const navigate=useNavigate()
  //////////////////////////////////////////////////////
 async function LogOut(){
  const response=await fetch(summaryApi.LogOut.url,{
    method:summaryApi.LogOut.method,
    headers:{
      'content-type':'application/json'
    },
    body:JSON.stringify()
   })

   const responseData=await response.json()
   if(responseData.success===true){
      localStorage.removeItem('LoginToken')
      navigate('/login')
      
   }
 }
    function handleLogout(){
      LogOut()
   }

  ///////////////////////////////////////////////////////
    useEffect(() => {
      dispatch(fetchUserDetails());
    }, [dispatch]);
  
    const userHome = useSelector(selectUserDetails);
    console.log('userHome',userHome)
    if(userHome?.error===true){
      LogOut()
    }
  return (
    <div className="bg-blue-100 fixed w-full -mt-8">
         <div>
            <Logo/>
         </div>
      <div className="flex justify-between items-center mx-[10%] h-[70px] text-2xl text-black font-semibold cursor-pointer">
        <div>
          <Link to="/">
            <p>Home</p>
          </Link>
        </div>

        <div>
          <Link to='/employee-list'>
            <p>Employee List</p>
          </Link>
        </div>

        <div>
           <p>{userHome?.data?.UserName}</p>
        </div>

        <div>
          <button onClick={handleLogout} className="bg-black  text-sm md:text-xl px-2 py-1 md:px-5 md:py-2 rounded-full justify-center text-white">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
