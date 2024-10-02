const Review=require('../../Models/reviewModel').module

const ApiResponse=require('../../Reusers/ApiResponse').module


const getReview=async(req,res)=>{
     const id=req.params.id
    try {
        
        const result=await Review.find({bookId:id}).exec()
        res.json( new ApiResponse(result,'reviews fetched successfully',true))
    } catch (err) {
        res.json({message:err.message || err ,success:false,error:true})
    }
}
exports.module=getReview