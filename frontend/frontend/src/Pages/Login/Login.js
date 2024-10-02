import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import summaryApi from "../../Common";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { fetchUserDetails } from "../../Redux/UserDetailsSlice";
import { authReset } from "../../Redux/UserDetailsSlice";
function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    Email: "",
    Password: "",
  });
  console.log("data", data);
  const navigate = useNavigate();
  const dispatch=useDispatch()

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

  async function handleSubmit(e) {
    e.preventDefault();

    if (data.Email.length < Number(1) || data.Password.length < Number(1)) {
      toast.error("email or password should not be empty ");
    } else {
      try {
        const response = await fetch(summaryApi.login.url, {
          method: summaryApi.login.method,
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({Email:data.Email,Password:data.Password}),
        });
        const userdata = await response.json();

        if (userdata.success) {
          setData((prev) => {
            return {
              ...prev,
              email: "",
              password: "",
            };
          });
          toast.success("login successful");
           
          navigate("/");
        } else {
          throw userdata.message;
        }
      } catch (err) {
        console.log(err);
        toast.error(err);
      }
    }
  }
  return (
    <div className="my-[200px] md:my-[220px] lg:my-[150px]">
      <div className="w-[430px] max-w-[430px] my-4 md:my-0  md:w-[100%] md:max-w-[100%] h-[calc(100vh-300px)] md:h-[calc(100vh-250px)] flex justify-center items-center top-0 right-0 bottom-0 left-0">
        <div className="bg-[#94618E] w-[300px] h-[450px] md:w-[500px] md:h-[500px]  opacity-70 rounded-md">
          <form className="w-full">
            <h2 className="text-center text-xl md:text-3xl font-medium text-white my-3 border-b-2 mx-4">
              Login
            </h2>

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
            </div>

            <div className="w-full my-6 md:my-8 mx-4">
              <button
                onClick={handleSubmit}
                className="w-[80%] h-[30px] md:w-[90%] md:h-[50px] bg-black text-white rounded-full md:text-2xl tracking-wider"
              >
                Login
              </button>
            </div>

            <div className="">
              <Link
                to="/forgot-password"
                className="block ml-auto w-fit mr-5 text-white md:text-xl underline"
              >
                Forgot-Password
              </Link>
            </div>

            <div>
              <p className="my-5 md:text-xl ml-3 text-white">
                {" "}
                Don't have an account ?{" "}
                <Link
                  to={"/register"}
                  className="text-black font-bold underline"
                >
                  Register
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
