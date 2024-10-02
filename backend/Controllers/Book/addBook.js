const Book=require('../../Models/bookModel').module

const ApiResponse=require('../../Reusers/ApiResponse').module

const addBook=async(req,res)=>{
   
    try {
        const book=new Book(req.body)
        const result=await book.save()
        res.json(new ApiResponse(result,'book added successfully',true))
    } catch (err) {
        res.json({message:err.message || err ,success:false,error:true})     
    }
}

exports.module=addBook