const User = require("../../Models/userModel").module
const bcrypt=require('bcryptjs')
const ApiResponse = require("../../Reusers/ApiResponse").module;
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const LoginUser = async (req, res) => {
  const { Email, Password } = req.body;
  try {
    const ExistingEmail = await User.findOne({ Email: Email });
   
    if (!ExistingEmail) {
      throw new Error("no such account exists!");
    }
   let Matchingpassword =bcrypt.compareSync(Password,ExistingEmail.Password)
   
    if(Matchingpassword===true){

      const tokenData = {
        _id: ExistingEmail._id,
        Email: ExistingEmail.Email,
      };

      const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
        expiresIn: "1hr",
      });
      const tokenOption = {
        httpOnly: true,
        secure: true,
      };
      res
        .cookie("AssignCookie", token, tokenOption)
        .json( new ApiResponse(token, "user login successfull", true));
    }
     else {
      throw new Error("invalid credentials");
    }
  } catch (err) {
    res.json({ message: err.message || err, success: false, error: true });
  }
};

exports.module = LoginUser;
