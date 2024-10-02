import React, { useState } from "react";
import { FaEye , FaRegEyeSlash} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import summaryApi from '../../Common/index.js';

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword,setShowConfirmPassword]=useState(false)
  const [data, setData] = useState({
    FullName: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
    
  });
  console.log('data',data)


  const [err, seterr] = useState({
    Email: "",
    Password: "",
    FullName: "",
    ConfirmPassword: "",
  });

  const navigate=useNavigate()
  ////////////////////////////////////
  function changeInput(e) {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }
  /////////////////////////////
  
  
  //////////////////////
 async function handleSubmit(e) {
    e.preventDefault();
    console.log('clicked button')

  for(let key in data){
    if(data[key].length<Number(8)){
        seterr((prev)=>{
    
            return{
              ...prev,
              [key]:`${key} must be atleast 8 characters`
            } 
          })
    }
    else{
     seterr((prev)=>{
        return {
            ...prev,
            [key]:''
        }
     })
    }
  }
 
  data.Password !== data.ConfirmPassword ?
  seterr((prev) => {
    return {
      ...prev,
      ConfirmPassword: "confirm password is not matching",
    };
  }) :
  seterr((prev)=>{
      
    return{
      ...prev,
      ConfirmPassword:''
    }
    
  })

  if (data.FullName.length >= Number(8) &&data.Password.length >= Number(8) &&data.Password === data.ConfirmPassword){

 try{
    const response = await fetch(summaryApi.register.url, {
      method: summaryApi.register.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({FullName:data.FullName,Email:data.Email,Password:data.Password}),
    });
    
 
  const userdata = await response.json();
  console.log(userdata)
  if(userdata.success){
  seterr((prev) => {
    return {
      ...prev,
      name: "",
      password: "",
      email: "",
      confirmPassword: "",
    };
  });

  setData((prev) => {
    return {
      ...prev,
      FullName: "",
      Password: "",
      Email: "",
      ConfirmPassword: "",
    };
  });
  // toast.success(userdata.message)
  toast.success ('user created successfully')
  navigate('/login')
  console.log(userdata)

 }
 else{
  throw userdata.message
 }
    
  }
  catch(err){
    console.log(err)
   
    toast.error(err)
  }

    }

}
  return (
    <div className="my-[200px] md:my-[220px] lg:my-[150px]">
      <div className="w-[430px] max-w-[430px] my-4 md:my-0  md:w-[100%] md:max-w-[100%] h-[calc(100vh-300px)] md:h-[calc(100vh-250px)] flex justify-center items-center top-0 right-0 bottom-0 left-0">
        <div className="bg-[#94618E] w-[300px] h-[650px] md:w-[500px] md:h-[800px]  opacity-70 rounded-md">
          <form  className="w-full">
            <h2 className="text-center text-xl md:text-3xl font-medium text-white my-3 border-b-2 mx-4">
              Register
            </h2>

            <div className="w-full my-7 mx-4">
              <label
                htmlFor="fullName"
                className="text-white text-lg md:text-2xl"
              >
                Full Name:
              </label>
              <div className="w-full my-3">
                <input
                  type="text"
                  id="fullName"
                  name="FullName"
                  placeholder="Enter your Full Name"
                  value={data.FullName}
                  className="w-[80%]  md:w-[90%] h-[30px] md:h-[50px] outline-none rounded-xl placeholder-[#94618E] md:text-xl"
                  onChange={changeInput}
                />
              </div>
              <p className="text-black mb-1 ml-2 ">{err.FullName && err.FullName}</p>
            </div>

            <div className="w-full my-7 mx-4">
              <label htmlFor="Email" className="text-white text-lg md:text-2xl">
                Email:
              </label>
              <div className="w-full my-3">
                <input
                  type="Email"
                  id="Email"
                  name="Email"
                  placeholder="Enter your Email"
                  value={data.Email}
                  className="w-[80%]  md:w-[90%] h-[30px] md:h-[50px] outline-none rounded-xl placeholder-[#94618E] md:text-xl"
                  onChange={changeInput}
                />
              </div>
              
            </div>

            <div className="w-full my-7 mx-4">
              <label
                htmlFor="Password"
                className="text-white text-lg  md:text-2xl"
              >
                Password :
              </label>
              <div className="w-full my-3 flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  id="Password"
                  name="Password"
                  placeholder="Enter your Password"
                  value={data.Password}
                  className="w-[80%] md:w-[90%] h-[30px] md:h-[50px] outline-none rounded-xl placeholder-[#94618E] md:text-xl"
                  onChange={changeInput}
                />
                <div
                  className="-ml-8 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <span>
                      <FaEye className="md:text-2xl" />
                    </span>
                  ) : (
                    <span>
                      <FaRegEyeSlash className="md:text-2xl" />
                    </span>
                  )}
                </div>
              </div>
              <p className="text-black mb-1 ml-2 ">{err.Password && err.Password}</p>
            </div>

            <div className="w-full my-7 mx-4">
              <label
                htmlFor="Confirm-Password"
                className="text-white text-lg  md:text-2xl"
              >
                Confirm Password :
              </label>
              <div className="w-full my-3 flex items-center">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="Confirm-Password"
                  name="ConfirmPassword"
                  placeholder="Enter your Confirm Password"
                  value={data.ConfirmPassword}
                  className="w-[80%] md:w-[90%] h-[30px] md:h-[50px] outline-none rounded-xl placeholder-[#94618E] md:text-xl"
                  onChange={changeInput}
                />
                <div
                  className="-ml-8 cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <span>
                      <FaEye className="md:text-2xl" />
                    </span>
                  ) : (
                    <span>
                      <FaRegEyeSlash className="md:text-2xl" />
                    </span>
                  )}
                </div>
              </div>
              <p className="text-black mb-1 ml-2">
                    {err.ConfirmPassword && err.ConfirmPassword}
               </p>
            </div>

            <div className="w-full my-6 md:my-8 mx-4">
              <button
                onClick={handleSubmit}
                className="w-[80%] h-[30px] md:w-[90%] md:h-[50px] bg-black text-white rounded-full md:text-2xl tracking-wider"
              >
                Register
              </button>
            </div>

           

            <div>
              <p className="my-5 md:text-xl ml-3 text-white">
                {" "}
                already have an account ?{" "}
                <Link to={"/login"} className="text-black font-bold underline">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
