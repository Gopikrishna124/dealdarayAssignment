const mongoose=require('mongoose')
const {Schema}=mongoose

const userSchema=new Schema({
   FullName:{type:String},
   Email:{type:String,required:true},
   Password:{type:String},
   Role:{type:String}
},{timestamps:true})

const User=mongoose.model('User',userSchema)
exports.module=User