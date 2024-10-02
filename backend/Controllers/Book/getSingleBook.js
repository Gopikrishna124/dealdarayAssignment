const Book=require('../../Models/bookModel').module

const ApiResponse=require('../../Reusers/ApiResponse').module

const getSingleBook=async(req,res)=>{
     const id=req.params.id
    try {
        const book=await Book.findOne({_id:id}).exec()
        res.json(new ApiResponse(book,'book details fetched successfully',true))
    } catch (err) {
        res.json({message:err.message || err ,success:false,error:true})      
    }
}

exports.module=getSingleBook