const User = require("../../Models/userModel").module
const bcrypt=require('bcryptjs')

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const LoginUser = async (req, res) => {
  const { UserName, Password } = req.body;
  try {
    const ExistingName = await User.findOne({ UserName: UserName});
   
    if (!ExistingName) {
      throw new Error("no such userName exists!");
    }
   let Matchingpassword =bcrypt.compareSync(Password,ExistingName.Password)
   
    if(Matchingpassword===true){

      const tokenData = {
        _id: ExistingName._id,
        UserName: ExistingName.UserName,
      };

      const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
        expiresIn: "10days",
      });
      const tokenOption = {
        httpOnly: true,
        secure: true,
      };
     
      
        res.cookie("NaukariCookie",token, tokenOption)
        .json({
          data:token,
          message:'login successfull',
          success:true,
          error:false
        });
    }
     else {
      throw new Error("invalid credentials");
    }
  } catch (err) {
    res.json({ message: err.message || err, success: false, error: true });
  }
};

exports.module = LoginUser;
