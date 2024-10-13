const User=require('../../Models/userModel').module

var bcrypt = require('bcryptjs');

const RegisterUser=async(req,res)=>{
  
      const {UserName,Password}=req.body 
    try{ 
      
      var salt = bcrypt.genSaltSync(10);
      var hashPassword = bcrypt.hashSync(Password, salt);
      
      const payload={
         ...req.body,
         Password:hashPassword   
      }

      const user=new User(payload)
      const result=await user.save()
      res.json({
         data:result,
         message:'user Registered successfully',
         success:true,
         error:false
      })
    }
    catch(err){
       res.json({message:err.message || err ,success:false,error:true})
    }
}

exports.module=RegisterUser