const Book=require('../../Models/bookModel').module

const ApiResponse=require('../../Reusers/ApiResponse').module

const getAllBooks=async(req,res)=>{
      console.log('books')
    try {
        const books=await Book.find({}).exec()
        res.json(new ApiResponse(books,'All books fetched successfully',true))
    } catch (err) {
        res.json({message:err.message || err ,success:false,error:true})        
    }
}

exports.module=getAllBooks