import React, { useEffect, useState } from "react";
import { MdManageSearch } from "react-icons/md";
import Logo from "./Logo.js";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails, selectUserDetails } from "../Redux/UserDetailsSlice.js";
import { reset } from "../Redux/UserDetailsSlice.js";

function Header() {
  const [search, setSearch] = useState('');
  const dispatch=useDispatch()
  
  const userInfo = useSelector(selectUserDetails);
  
  const navigate=useNavigate()
  

  function handleSearch(e) {
    const {value}=e.target
    setSearch(value)
       navigate(`/search?q=${value}`)
  }

  function handleLogout() {
    dispatch(reset())
  }

 
  return (
    <div className="w-[430px] max-w-[430px] md:w-[100%] md:max-w-[100%] h-[80px] md:h-[100px] bg-[#94618E] ">
      <div className="w-full max-w-full md:w-[80%] md:max-w-[80%] flex justify-between items-center   md:mx-[10%] my-auto md:p-3">
        <div>
          <Link to="/">
            <Logo />
          </Link>
        </div>

        <div className="hidden lg:flex items-center w-full justify-between max-w-lg border rounded-full focus-within:shadow pl-3 border-blue-200 ">
          <input
            type="text"
            placeholder="Search any Product...."
            className="w-full outline-none bg-transparent text-black placeholder-black"
            onChange={handleSearch}
            value={search}
          />
          <div className="text-lg min-w-[70px] bg-black flex items-center justify-center rounded-r-full">
            <MdManageSearch className="w-10 h-8 text-white" />
          </div>
        </div>

        <div className=" w-[250px] md:w-[500px] md:ml-6 flex md:justify-between">
          {userInfo.Role === "Admin" && (
            <Link to="/admin" className="my-4 w-[180px]">
              <button className=" hidden md:block md:w-[130px] md:h-[50px] bg-[#F8EEE7] text-black md:text-xl rounded-md hover:bg-black hover:text-white ml-[40px] md:ml-[0px]">
                Admin
              </button>
            </Link>
          )}

          {userInfo?._id && (
            <Link to="/userInfo" className="my-4 w-[180px]">
              <button className="w-[90px] h-[40px] md:w-[130px] md:h-[50px] bg-[#F8EEE7] text-black md:text-xl rounded-md hover:bg-black hover:text-white ml-[40px] md:ml-[0px]">
                userProfile
              </button>
            </Link>
          )}
           {
            userInfo?._id ?
            <Link to="/login" className="my-4 w-[180px]">
            <button onClick={handleLogout} className="w-[70px] h-[40px] md:w-[100px] md:h-[50px] bg-[#F8EEE7] text-black md:text-xl rounded-md hover:bg-black hover:text-white ml-[40px] md:ml-[0px]">
              Logout
            </button>
          </Link>
              :  <Link to="/login" className="my-4 w-[180px]">
              <button className="w-[70px] h-[40px] md:w-[100px] md:h-[50px] bg-[#F8EEE7] text-black md:text-xl rounded-md hover:bg-black hover:text-white ml-[40px] md:ml-[0px]">
                Login
              </button>
            </Link>
           }
        
        </div>
      </div>
    </div>
  );
}

export default Header;
