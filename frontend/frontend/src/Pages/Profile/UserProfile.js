import React, { useEffect, useState } from "react";
import { selectUserDetails } from "../../Redux/UserDetailsSlice";
import { useSelector, useDispatch } from "react-redux";
import EditDetailsPop from "../../Components/EditDetailsPop";
import { fetchUserDetails } from "../../Redux/UserDetailsSlice";

function UserProfile() {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserDetails);
  console.log("userInfo-profile", userInfo);
  const [data, setData] = useState({
    FullName: "",
    Email: "",
  });
  const [showForm,setShowForm]=useState(false)
  ////////////////////////////////////////////////////
  function changeInput(e) {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }
  ///////////////////////////////////////////////////
 useEffect(()=>{
   dispatch(fetchUserDetails())
 },[dispatch,showForm])
  return (
    //   <div className="my-[200px] md:my-[220px] lg:my-[150px]">
    //   <div className="w-[430px] max-w-[430px] my-4 md:my-0  md:w-[100%] md:max-w-[100%] h-[calc(100vh-300px)] md:h-[calc(100vh-250px)] flex justify-center items-center top-0 right-0 bottom-0 left-0">
    //     <div className="bg-[#94618E] w-[300px] h-[650px] md:w-[500px] md:h-[800px]  opacity-70 rounded-md">
    //       <form  className="w-full">
    //         <h2 className="text-center text-xl md:text-3xl font-medium text-white my-3 border-b-2 mx-4">
    //           Register
    //         </h2>

    //         <div className="w-full my-7 mx-4">
    //           <label
    //             htmlFor="fullName"
    //             className="text-white text-lg md:text-2xl"
    //           >
    //             Full Name:
    //           </label>
    //           <div className="w-full my-3">
    //             <input
    //               type="text"
    //               id="fullName"
    //               name="FullName"
    //               placeholder="Enter your Full Name"
    //               value={data.FullName}
    //               className="w-[80%]  md:w-[90%] h-[30px] md:h-[50px] outline-none rounded-xl placeholder-[#94618E] md:text-xl"
    //               onChange={changeInput}
    //             />
    //           </div>

    //         </div>

    //         <div className="w-full my-7 mx-4">
    //           <label htmlFor="Email" className="text-white text-lg md:text-2xl">
    //             Email:
    //           </label>
    //           <div className="w-full my-3">
    //             <input
    //               type="Email"
    //               id="Email"
    //               name="Email"
    //               placeholder="Enter your Email"
    //               value={data.Email}
    //               className="w-[80%]  md:w-[90%] h-[30px] md:h-[50px] outline-none rounded-xl placeholder-[#94618E] md:text-xl"
    //               onChange={changeInput}
    //             />
    //           </div>

    //         </div>

    //         <div className="w-full my-6 md:my-8 mx-4">
    //           <button
    //             onClick={handleSubmit}
    //             className="w-[80%] h-[30px] md:w-[90%] md:h-[50px] bg-black text-white rounded-full md:text-2xl tracking-wider"
    //           >
    //             Edit
    //           </button>
    //         </div>

    //       </form>
    //     </div>
    //   </div>
    // </div>

    <div className="flex justify-center items-center">
      <div className="bg-white w-[500px] h-[300px] my-10 p-4">
        <div className="my-3">
          <p className="text-red-500 text-2xl">
            FullName : <span className="text-black text-xl">{userInfo?.FullName}</span>
          </p>
        </div>
        <div>
          <p className="text-red-500 text-2xl">
            Email :
            <span className="text-black text-xl">{userInfo?.Email}</span>
          </p>
        </div>

        <div className="my-8 text-center">
        <button onClick={()=>setShowForm(true)} className=" w-[150px] h-[50px] bg-black  text-white md:text-xl rounded-md hover:bg-black hover:text-white ml-[40px] md:ml-[0px]">
               Edit Details
        </button>
        </div>
      </div>

      {
        showForm && <EditDetailsPop userInfo={userInfo} data={data} setData={setData} close={()=>setShowForm(false)}/>
      }
    </div>
  );
}

export default UserProfile;
