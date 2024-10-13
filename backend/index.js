const express=require('express')
const dotenv=require('dotenv').config()
const cors=require('cors')
const Connection=require('./db/Connection').module
const cookieParser=require('cookie-parser')

const port=process.env.PORT
const app=express()
app.use(express.json())
app.use(cors({
    origin:'http://localhost:3000' ,   
    
    credentials:true,
     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204

}))

app.use(cookieParser())

//connection to mongodb

Connection().then(()=>{
    app.listen(port,()=>{
        console.log('connection successfull')
        console.log(`app listening on port ${port}`)
    })
})


const userRouter=require('./Routes/User/UserRoutes').module
const EmployeeRouter=require('./Routes/EmployeeRoutes/EmployeeRoutes').module

app.use('/api/v1/auth',userRouter)
app.use('/api/v1/employees',EmployeeRouter)



