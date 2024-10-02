const express=require('express')
const dotenv=require('dotenv').config()
const cors=require('cors')
const Connection=require('./db/Connection').module
const cookieParser=require('cookie-parser')

const port=process.env.PORT
const app=express()
app.use(express.json())
app.use(cors({
    origin:'http://localhost:3001' ,   
    
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


//routes
const BookRouter=require('./Routes/Book/BookRoutes').module
const ReviewRouter=require('./Routes/Reviews/ReviewRoutes').module
const userRouter=require('./Routes/User/UserRoutes').module

app.use('/api/v1/books',BookRouter)
app.use('/api/v1/reviews',ReviewRouter)
app.use('/api/v1/users',userRouter)