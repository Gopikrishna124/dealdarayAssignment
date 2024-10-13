import React, { useRef, useState } from "react";
import summaryApi from "../../Common/index";
import { useDispatch } from "react-redux";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";

function EmployeePopup({name,emdata,close}) {
    
  console.log('emdata',emdata?.Name?.length)

    const dispatch=useDispatch()

  const [data, setData] = useState({
    id:emdata?.id,
    Name:emdata?.Name,
    Email:emdata?.Email,
    MobileNo:emdata?.MobileNo,
    Designation:emdata?.Designation,
    Gender:emdata?.Gender,
    Course:emdata?.Course,
    ImageUrl:emdata?.ImageUrl
    
  });

//   console.log('data',data)
 
  const [err, seterr] = useState({
    Name:'',
    Email:'',
    MobileNo:'',
    Designation:'',
    Gender:'',
    Course:'',
    ImageUrl:''
  });
  console.log('err',err)
 console.log('emdata',emdata)
  const[gender,setGender]=useState(emdata?.Gender)
   console.log('gender',gender)
   const [emCheckboxes,setEmcheckboxes]=useState(emdata?.Course)
   console.log('emcheckboxes',emCheckboxes)
  
  const [checkboxes,setCheckboxes]=useState({
    checkbox1:false,
    checkbox2:false,
    checkbox3:false
 })

 const nameRegex = /^[A-Za-z\s]+$/; // Only alphabets and spaces
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format
 const mobileRegex = /^[0-9]{10}$/; // 10 digit numbers only


/////////////////////////////////////////////////////

  function handleCheckbox(e){
    const {name,checked,value}=e.target
     let  selectedBox=''
     setCheckboxes((prev)=>{
        return {
            ...prev,
            [name]:checked
        }
     })
      
     if(e.target.checked===true){
        setData((prev)=>{
            return {
                ...prev,
                Course:e.target.value
            }
        })
     }
     else{
        for(let key in checkboxes){
           if(e.target.key===true){
            setData((prev)=>{
                return {
                    ...prev,
                    Course:e.target.value
                }
            })
           }
        }
        
       
     }
  
   
    
  }
////////////////////////////////////////////////////////
  function changeImage(e){
        
         const file=e.target.files[0]
         console.log('file',file)
      
        if(file){
            let fileType=file.type
            if(fileType=== "image/jpg" || fileType === "image/png"){
                
                setData((prev)=>{
                    return {
                        ...prev,
                        ImageUrl:file.name
                    }
                })
                
            }
            else{
              seterr((prev)=>{
                return {
                    ...prev,
                     ImageUrl:'image should be in JPG or PNG format'
                }
              })
              
            }
        }
        
  }
////////////////////////////////////////////////////////
  function changeInput(e) {
    const {name,value}=e.target
    setData((prev)=>{
        return {
            ...prev,
            [name]:value
        }
    })
  }
  /////////////////////////////////////////
   
  function validate(){
     
     const errors={}

     //validate Name

     if(!data.Name){
        errors.Name='Name is required'
     }
     else if(!nameRegex.test(data.Name)){
        errors.Name='Name can only contain letters and spaces'
     }
  
       // Validate Email
       if (!data.Email) {
        errors.Email = 'Email is required';
      } else if (!emailRegex.test(data.Email)) {
        errors.Email = 'Enter a valid email address';
      }
  
      // Validate Mobile Number
      if (!data.MobileNo) {
        errors.MobileNo = 'Mobile number is required';
      } else if (!mobileRegex.test(data.MobileNo)){
        errors.MobileNo = 'Enter a valid 10-digit mobile number';
      } 
         
      ///////////////
      if(!data.Designation){
        errors.Designation='Designation is required'
      }

      if(!data.Gender){
        errors.Gender='choose Gender'
      }

      if(!data.Course){
        errors.Course='choose course'
      }
      
     if(!data.ImageUrl){
        errors.ImageUrl='image should be in jpg or png'
     }
      seterr(errors)

      return Object.keys(errors).length==0

  }

  ////////////////////////////////////////////

 async function handleSubmit(e) {

    e.preventDefault()
     
    if(validate()){
       try{
        if(emdata?.Name?.length>0){
          const response=await fetch(summaryApi.EditEmployee.url,{
            method:summaryApi.EditEmployee.method,
            credentials:'include',
            headers:{
             'content-type':'application/json',
            },
            body:JSON.stringify(data)
         })
         
         const resposneData=await response.json()
         console.log('EDitedEmployee',resposneData)
         if(resposneData.success===true){
        
            close()
         }
         else{
            throw resposneData.message
         }
        }
        else{
        const response=await fetch(summaryApi.createEmployee.url,{
            method:summaryApi.createEmployee.method,
            credentials:'include',
            headers:{
             'content-type':'application/json',
            },
            body:JSON.stringify(data)
         })
         
         const resposneData=await response.json()
         console.log('createddEmployee',resposneData)
         if(resposneData.success===true){
        
            close()
         }
         else{
            throw resposneData.message
         }
         
       }
      }
       catch(err){
           toast.error(err)
       }
    }

  }


  return (
    <div className="absolute bg-red-500  -top-4  w-full min-h-[calc(100vh-50px)] flex justify-center items-center">
      <div className="  border border-red-500 p-12 w-[700px] text-center h-auto">
        <h1 className="text-3xl text-white">{name}</h1>
        <form onSubmit={handleSubmit} className="text-black">
            <IoMdClose className='text-2xl ml-auto block' onClick={close}/>
        <div className="my-12 h-auto">
          <div className="flex gap-6 text-2xl">
            <p className="w-[180px] text-white">Name</p>
            <input type="text" name='Name' value={data.Name} onChange={changeInput} text-xl className="w-[400px]  text-black h-[50px]"/>
          </div>
          <div className="my-4">
            <p>{err.Name && err.Name}</p>
          </div>
        </div>

        <div className="my-12 h-auto">
          <div className="flex gap-6 text-2xl">
            <p className="w-[180px] text-white">Email</p>
            <input type="Email" name='Email' value={data.Email} onChange={changeInput} className="w-[400px] h-[50px]" />
          </div>
          <div className="my-4">
            <p>{err.Email && err.Email}</p>
          </div>
        </div>

        <div className="my-12 h-auto">
          <div className="flex gap-6 text-2xl">
            <p className="w-[180px] text-white">Mobile No</p>
            <input type="text" name='MobileNo' value={data.MobileNo} onChange={changeInput} className="w-[400px] h-[50px]"/>
          </div>
          <div className="my-4">
            <p>{err.MobileNo && err.MobileNo}</p>
          </div>
        </div>

        <div className="my-12 h-auto">
          <div className="flex gap-6 text-2xl">
            <p className="w-[180px] text-white">Designation</p>
            <select className="w-[400px] h-[50px] outline-none text-black" name='Designation'  onChange={changeInput} defaultValue={emdata?.Designation}>
                <option value='HR'>HR</option>
                <option value='Manager'>Manager</option>
                <option value='Sales'>Sales</option>
            </select>
          </div>
          <div className="my-4">
            <p>{err.Designation && err.Designation}</p>
          </div>
          
        </div>

        <div className="my-12 h-auto">
          <div className="flex gap-6 text-2xl">
            <p className="w-[180px] text-white">Gender</p>
            <div>
            <input type="radio" name='Gender' value='male' id='male' defaultChecked={emdata ?gender==='male' : data.Gender}  onChange={changeInput}/>
             <label htmlFor="male" className="ml-3">Male</label>
             </div>

             <div>
            <input type="radio" name='Gender' value='Female' id='Female' defaultChecked={emdata ? gender==='Female':data.Gender}  onChange={changeInput}/>
             <label htmlFor="Female" className="ml-3">Female</label>
             </div>

          </div>

          <div className="my-4">
            <p>{err.Gender && err.Gender}</p>
          </div>
         
        </div>

        <div className="my-12 h-auto">
          <div className="flex gap-6 text-2xl">
            <p className="w-[180px] text-white">Course</p>
        
       
        <input
          type="checkbox"
          name="checkbox1"
        
           onChange={handleCheckbox}
           className="m-2"
           value='MCA'
           defaultChecked={emdata?emCheckboxes==='MCA' :checkboxes.checkbox1}
           
          
        />
        <label>
        MCA
      </label>
      
      
        <input
          type="checkbox"
          name="checkbox2"
          
          onChange={handleCheckbox}
           className="m-2"
           value='BCA'
           defaultChecked={emdata?emCheckboxes==='BCA' :checkboxes.checkbox2}
           
          
        />
        <label>
        BCA
      </label>
      
        <input
          type="checkbox"
          name="checkbox3"
        
          onChange={handleCheckbox}
          className="m-2"
          value='BSC'
          defaultChecked={emdata?emCheckboxes==='BSC' :checkboxes.checkbox3}
          
        />
        <label>
        BSC
      </label>

          </div>

          <div className="my-4">
            <p>{err.Course && err.Course}</p>
          </div>
          
        </div>

        <div className="my-12 h-auto">
          <div className="flex gap-6 text-2xl">
            <p className="w-[180px] text-white">Image Upload</p>
            <input type="file" name='ImageUrl'  onChange={changeImage} className="w-[400px] h-[50px]"/>
          </div>
          <div className="my-4">
            <p>{err.ImageUrl && err.ImageUrl}</p>
          </div>
        </div>
         
         <div>
         <button className="bg-black  text-sm md:text-xl px-2 py-1 md:px-5 md:py-2 rounded-full justify-center text-white">
            Submit
          </button>
         </div>
         </form>
      </div>
    </div>
  );
}

export default EmployeePopup;
