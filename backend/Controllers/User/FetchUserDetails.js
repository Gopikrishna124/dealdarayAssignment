const User=require('../../Models/userModel').module


const fetchUserDetails=async(req,res)=>{
       
    try {
        const result=await User.findById(req.user)
      
          if(!result){
            throw new Error('pls register')
          }
        res.json({
            data:result,
            message:'userDeatails fetched successfully',
            success:true,
            error:false
        })
    } catch (err) {
         res.json({
            message:err.message || err,
            success:false,
            error:true
         })
    }
}

exports.module=fetchUserDetails