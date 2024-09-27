const User=require('../Models/Usermodel').module
const Address=require('../Models/AddressModel').module

//sample images of user-table and address-table which i
// stored in mongodb are in assets folder in backend section 


const StoringData=async(req,res)=>{
    const {userAddress,userName}=req.body
    try{
        const user=new User({name:userName})
        await user.save()

        const address=new Address({userId:user._id,address:userAddress})
        await address.save()
        res.json({
            
            message:'user  and address registered successfully',
            success:true,
            error:false
        })
    }catch(err){
           res.json({
             message:err.message || err,
             success:false,
             error:true
           })
    }
}


exports.module=StoringData