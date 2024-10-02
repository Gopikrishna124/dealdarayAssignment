const User=require('../../Models/userModel').module
const ApiResponse=require('../../Reusers/ApiResponse').module

const updateUser=async(req,res)=>{
    const id=req.params.id
    console.log('paramsId',id)
    console.log('paramsBody',req.body)
    try{ 
        
        const result=await User.findByIdAndUpdate(id,req.body,{new:true})
        res.json(new ApiResponse(result,'user added successfully',true))
    }
    catch(err){
        res.json({message:err.message || err ,success:false,error:true})
    }
}

exports.module=updateUser