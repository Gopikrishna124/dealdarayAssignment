const Review=require('../../Models/reviewModel').module

const ApiResponse=require('../../Reusers/ApiResponse').module


const addReview=async(req,res)=>{
    
    try {
        const review=new Review(req.body)
        const result=await review.save()
        res.json(new ApiResponse(result,'review added successfully',true))
    } catch (err) {
        res.json({message:err.message || err ,success:false,error:true})
    }
}
exports.module=addReview