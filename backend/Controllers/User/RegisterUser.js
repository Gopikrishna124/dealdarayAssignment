const User=require('../../Models/userModel').module
const ApiResponse=require('../../Reusers/ApiResponse').module
var bcrypt = require('bcryptjs');

const RegisterUser=async(req,res)=>{
  
      const {FullName,Email,Password}=req.body 
    try{ 
      const ExistingEmail=await User.findOne({Email})
      if(ExistingEmail){
          throw new Error('Email already exists in database')
      }
      var salt = bcrypt.genSaltSync(10);
      var hashPassword = bcrypt.hashSync(Password, salt);
      
      const payload={
         ...req.body,
         Role:'GENERAL',
         Password:hashPassword   
      }

      const user=new User(payload)
      const result=await user.save()
      res.json( new ApiResponse(result,'user registered successfull',true))
    }
    catch(err){
       res.json({message:err.message || err ,success:false,error:true})
    }
}

exports.module=RegisterUser