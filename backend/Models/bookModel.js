const mongoose=require('mongoose')
const {Schema}=mongoose

const bookSchema=new Schema({
     title:{type:String},
     author:{type:String},
     imageURL:{type:String},
     category:{type:String},
     description:{type:String,required:true}
},{timestamps:true})

const Book=mongoose.model('Book',bookSchema)
exports.module=Book