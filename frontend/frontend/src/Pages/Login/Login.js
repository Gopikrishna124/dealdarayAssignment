import React, { useState, useRef } from "react";
import Logo from "../../Components/Logo";
import { FaRegEyeSlash, FaEye } from "react-icons/fa";
import { toast } from "react-toastify";
import summaryApi from "../../Common/index";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch ,useSelector} from "react-redux";
import {  fetchUserDetails, LoginUser } from "../../Redux/userDetailsSlice";
import { Link } from "react-router-dom";

function Login() {
  const inputField1 = useRef(null);
  const inputField2 = useRef(null);

  const [data, setData] = useState({
    UserName: "",
    Password: "",
  });
 

  const [showPassword, setShowPassword] = useState(false);

  const navigate=useNavigate()
  const dispatch=useDispatch()

  ////////////////////////////////////////////////////////////////////

  const changeInput = (name, value, inputRef) => {
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });

  };

  //////////////////////////////////////////////////////////

  const moveToNextRef = (e, value, inputRef) => {
    if (e.key === "Enter" && value.length > 7) {
      e.preventDefault();
      inputRef.current.focus();
    }
  };
  ////////////////////////////////////////////////
  const handleSubmit = async(e) => {
    e.preventDefault();

    let move = "";
    for (let key in data) {
      if (data[key] === "") {
        move = false;
      }
    }


    if (move === false) {
      toast.error("all fileds must be filled correctly");
    } else {
        try{
           const response=await dispatch(LoginUser({UserName:data.UserName,Password:data.Password}))
           console.log('resp',response)
           console.log('respaylaod',response.payload)
           if(response.payload){
            setData((prev)=>{
              return {
              UserName:'',
              Password:''
              }
            })
   
            navigate('/')
           }
          else{
            throw 'invalid credentails'
          }
        }
        catch(err){
          toast.error(err)
        }
    }
  };
  return (
    <div>
      <div>
        <Logo />
      </div>

      <div className=" flex justify-center items-center top-0 right-0 bottom-0 left-0">
        <div className="bg-[#94618E] w-[500px] h-[500px] opacity-70 rounded-md">
          <form className="w-full" onSubmit={handleSubmit}>
            <h2 className="text-center  text-3xl font-medium text-white my-3 border-b-2 mx-4">
              Login
            </h2>

            <div className="w-full my-7 mx-4">
              <label htmlFor="UserName" className="text-white text-2xl">
                UserName :
              </label>
              <div className="w-full my-3">
                <input
                  ref={inputField1}
                  type="text"
                  id="UserName"
                  name="UserName"
                  placeholder="Enter your User Name"
                  value={data.UserName}
                  className="w-[90%] h-[50px] outline-none rounded-xl placeholder-[#94618E] text-xl"
                  onChange={(e) => changeInput(e.target.name, e.target.value)}
                  onKeyDown={(e) =>
                    moveToNextRef(e, e.target.value, inputField2)
                  }
                />
              </div>
             
            </div>

            <div className="w-full my-7 mx-4">
              <label htmlFor="Password" className="text-white text-2xl">
                Password :
              </label>
              <div className="w-full my-3 flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  ref={inputField2}
                  id="Password"
                  name="Password"
                  placeholder="Enter your Password"
                  value={data.Password}
                  className="w-[90%] h-[50px] outline-none rounded-xl placeholder-[#94618E] text-xl"
                  onChange={(e) => changeInput(e.target.name, e.target.value)}
                />
                <div
                  className="-ml-8 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <span>
                      <FaEye className="text-2xl" />
                    </span>
                  ) : (
                    <span>
                      <FaRegEyeSlash className="text-2xl" />
                    </span>
                  )}
                </div>
              </div>

             
            </div>

            <div className="w-full my-8 mx-4">
              <button
                type="submit"
                className="w-[90%] h-[50px] bg-black text-white rounded-full text-2xl tracking-wider"
              >
                Login
              </button>
            </div>

            <div>
              <p className="my-5 md:text-xl ml-3 text-white">
                {" "}
                don't have an account ?{" "}
                <Link
                  to={"/register"}
                  className="text-black font-bold underline"
                >
                  register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
