const Book=require('../../Models/bookModel').module

const ApiResponse=require('../../Reusers/ApiResponse').module

const SearchBook=async(req,res)=>{
    console.log('params',req.query.q)
    const query=req.query.q
     const regex= new RegExp(query,'i')
 
     if(req.query.q){
    try {

        const result=await Book.find({
            "$or":[
                {
                  category:regex
                },
                {
                    bookTitle:regex
                }
            ]
        })
       
        res.json(new ApiResponse(result,'book added successfully',true))
    } catch (err) {
        res.json({message:err.message || err ,success:false,error:true})     
    }
}
}

exports.module=SearchBook