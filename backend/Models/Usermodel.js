const mongoose=require('mongoose')
const {Schema}=mongoose

const userSchema=new Schema({
   UserName:{type:String},
   Password:{type:String},
  
},{timestamps:true})

const User=mongoose.model('User',userSchema)
exports.module=User