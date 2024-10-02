const mongoose=require('mongoose')
const {Schema}=mongoose

const reviewSchema=new Schema({
     bookId:{type:Schema.Types.ObjectId,ref:'Book',required:true},
      Name:{type:String,required:true},
      description:{type:String,required:true}

},{timestamps:true})

const Review=mongoose.model('Review',reviewSchema)
exports.module=Review