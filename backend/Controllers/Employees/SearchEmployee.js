const Employee=require('../../Models/EmployeeModel').module

const SearchEmployee=async(req,res)=>{
     const query=req.query.q
    console.log('query',query)
     const regex= new RegExp(query,'i') 
     //to get search value even if first letter typed is capital or smaller in products

     if(req.query.q){
    try{    
      const result=await Employee.find({
        "$or":[
        
            {
               Name:regex
            },
            {
              Email:regex
            },
             {
               Gender:regex
             },
             {
                Course:regex
             },
             {
                Designation:regex
             }

        ]
      })
      res.json({
        data:result,
        success:true,
        error:false,
        message:'Employee fetched successfully'
      })
    
    }
    catch(err){
       res.json({
        data:err.message || err,
        success:false,
        error:true
       })
    }

  }
}

exports.module=SearchEmployee