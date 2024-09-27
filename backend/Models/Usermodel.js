const mongoose=require('mongoose')
const {Schema}=mongoose

const userModel=new Schema({
   name:{type:String,required:true},
   
}) 

const User=mongoose.model('User',userModel)

exports.module=User