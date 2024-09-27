const mongoose=require('mongoose')
const {Schema}=mongoose

const addressModel=new Schema({
   userId:{type:Schema.Types.ObjectId,ref:'User',required:true},
   address:{type:String,required:true}
}) 

const Address=mongoose.model('Address',addressModel)

exports.module=Address