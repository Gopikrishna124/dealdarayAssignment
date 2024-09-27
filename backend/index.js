const express=require('express')
const mongoose=require('mongoose')
const dotenv=require('dotenv').config()
const app=express()
const port=process.env.PORT
const cors=require('cors')
app.use(express.json())
app.use(cors({
    origin:'http://localhost:3001' ,   
    
    credentials:true,
     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204

}))

const Userrouter=require('./Routes/routes').module


const Connection=async(req,res)=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('database conncected')
    } catch (err) {
        console.log(err)
    }
}

Connection().then(()=>{
    app.listen(port,()=>{
        console.log('connection successfull')
        console.log(`app listening on port ${port}`)
    })
})

app.use('/api/v1',Userrouter)
