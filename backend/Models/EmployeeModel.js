const mongoose=require('mongoose')
const {Schema}=mongoose

const employeeSchema=new Schema({
    Name:{type:String},
    Email:{type:String},
    MobileNo:{type:Number},
    Designation:{type:String},
    Gender:{type:String},
    Course:{type:String},
    ImageUrl:{type:String,
    default:"https://www.istockphoto.com/photo/picturesque-morning-in-plitvice-national-park-colorful-spring-scene-of-green-forest-gm1093110112-293349147?utm_campaign=category_photos_bottom&utm_content=https%3A%2F%2Funsplash.com%2Fimages%2Fnature&utm_medium=affiliate&utm_source=unsplash&utm_term=Nature+Images%3A%3A%3A",
    }
  
},{timestamps:true})

const Employee=mongoose.model('Employee',employeeSchema)
exports.module=Employee