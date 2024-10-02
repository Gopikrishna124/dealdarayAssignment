const User=require('../../Models/userModel').module
const ApiResponse=require('../../Reusers/ApiResponse').module

const fetchUserDetails=async(req,res)=>{
        console.log('authId',req.user)
    try {
        const result=await User.findById(req.user)
        res.json(new ApiResponse(result,'details fetched successfully',true))
    } catch (err) {
         res.json({
            message:err.message || err,
            success:false,
            error:true
         })
    }
}

exports.module=fetchUserDetails