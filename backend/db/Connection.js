const mongoose=require('mongoose')

const dotenv=require('dotenv').config()

const Connection=async(req,res)=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('database conncected')
    } catch (err) {
        console.log(err)
    }
}

exports.module=Connection