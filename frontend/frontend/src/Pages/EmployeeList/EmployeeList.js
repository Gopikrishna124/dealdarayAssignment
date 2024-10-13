import React, { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import EmployeePopup from "../../Components/EmployeePopup/EmployeePopup";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment'
import summaryApi from "../../Common/index";
import { useLocation, useNavigate } from "react-router-dom";


function EmployeeList() {
  const [showPopup, setShowPopup] = useState(false);
  const [showEditpopup,setShowEditPopup]=useState(false)
  const [employeeData,setEmployeeData]=useState([])
  
  const [data, setData] = useState({
     id:'',
    Name:'',
    Email:'',
    MobileNo:'',
    Designation:'',
    Gender:'',
    Course:'',
    ImageUrl:''
  });

  const [search,setSearch]=useState('')
  

  ////////////////////////////////////////////

  const searchEmployeees=async(value)=>{
    const response=await fetch(`${summaryApi.searchEmployee.url}?q=${value}`,{
      method:summaryApi.searchEmployee.method,
    
    })
   const responseData=await response.json()
   console.log('searchData',responseData.data)
   setEmployeeData(responseData.data)
    

  }

  ///////////////////////////////////////////////

  const deleteEmployee=async(id)=>{
     
    const response=await fetch(summaryApi.deleteEmployee.url,{
      method:summaryApi.deleteEmployee.method,
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify({id:id})
    })
    const responseData=await response.json()
    setEmployeeData(responseData.data)
    fetchEmployeeDetails()
  }

////////////////////////////////////////////////////////
  const handleSearch=async(e)=>{
    setSearch(e.target.value)
    
  }
  function handleEdit(user){
    setShowEditPopup(true)
    setData((prev)=>{
      return {
        ...prev,
        Name:user.Name,
        Email:user.Email,
        MobileNo:user.MobileNo,
        Designation:user.Designation,
        Gender:user.Gender,
        Course:user.Course,
        ImageUrl:user.ImageUrl,
        id:user._id
      }
    })
  }
  /////////////////////////////////////////////////////
    
  const fetchEmployeeDetails=async()=>{
    const response=await fetch(summaryApi.getEmployeeDetails.url,{
        method:summaryApi.getEmployeeDetails.method
    })
    const responseData=await response.json()
    console.log('fetchemployeeDetqails',responseData)
   
    setEmployeeData(responseData.data)
  }
  //////////////////////////////////////////////////////
  const handleDelete=async(id)=>{
   
    deleteEmployee(id)
   
  
  }

  //////////////////////////////////////
  useEffect(()=>{
     fetchEmployeeDetails()
     if(search.length>1){
      searchEmployeees(search)
    }
    
  },[showPopup,search.length])


 useEffect(()=>{
   fetchEmployeeDetails()
 },[showEditpopup])
 
   
  return (
    <div className="relative">
      <div>
        <Header />

        <div className="m-8 text-3xl text-red-600 p-24">
          <p>Employee List</p>
        </div>

        <div className="flex justify-end items-center gap-16 mx-[400px] text-xl">
          <div>
            <p>Total Count : {employeeData?.length}</p>
          </div>
          <button
            onClick={() => setShowPopup(true)}
            className="bg-black  text-sm md:text-xl px-2 py-1 md:px-5 md:py-2 rounded-full justify-center text-white"
          >
            Create Employee
          </button>
        </div>

        <div className="flex justify-end items-center gap-16 mx-[200px] my-8 text-2xl">
          <div>
            <p>Search</p>
          </div>

          <div>
            <input
              type="text"
              placeholder="Enter Search Keyword"
              className="w-[400px] h-[40px] outline-none text-xl"
              value={search}
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>

      <div>
        {employeeData?.length<1  ? (
          <p className="text-center text-2xl font-bold">No Employess yet</p>
        ) : (
          <div>
            <table className="w-full mx-autpo mt-11 font-semibold usertable">
              <thead>
                <tr className="text-xl bg-black bg-opacity-70 text-white">
                  <th>Unique Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>MobileNo</th>
                  <th>Designation</th>
                  <th>Gender</th>
                  <th>Course</th>
                  <th>Create Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {employeeData?.map((user, index) => (
                  <tr>
                 
                    <td>{user?._id}</td>
                    <td>{user?.Name}</td>
                    <td>{user?.Email}</td>
                    <td>{user?.MobileNo}</td>
                    <td>{user?.Designation}</td>
                    <td>{user?.Gender}</td>
                    <td>{user?.Course}</td>
                    <td>{moment(user.createdAt).format("DD-MMM-YY")}</td>
                    <td>
                      <button  onClick={()=>handleEdit(user)}className="bg-black text-xl px-5 py-2 rounded-full justify-center text-white mx-3">
                        Edit
                      </button>
                      <button onClick={()=>handleDelete(user._id)}className="bg-black text-xl px-5 py-2 rounded-full justify-center text-white">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div>
        {showPopup && <EmployeePopup  data={data} name='Create Form' close={() => setShowPopup(false)} />}
      </div>

      <div>
        {showEditpopup && <EmployeePopup  emdata={data} name='Edit Form' close={() => setShowEditPopup(false)} />}
      </div>
    </div>
  );
}

export default EmployeeList;
