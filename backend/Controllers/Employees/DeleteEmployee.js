const Employee=require('../../Models/EmployeeModel').module


const deleteEmployee=async(req,res)=>{
  console.log()
    try {
           
       const result=await Employee.findByIdAndDelete({_id:req.body.id},{new:true})
       
     const remainingData=await Employee.find({}).exec()
        res.json({
          data:remainingData,
           message:'employee deleted successfully',
            success:true,
            error:false
        })
    } catch (err) {
         res.json({
            message:err.message,
            success:false,
            error:true
         })
    }
}

exports.module=deleteEmployee