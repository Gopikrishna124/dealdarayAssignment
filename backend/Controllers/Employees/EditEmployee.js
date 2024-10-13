const Employee=require('../../Models/EmployeeModel').module


const EditEmployee=async(req,res)=>{
    console.log('editId',req.body)
    try {
        
        const result=await Employee.findByIdAndUpdate(req.body.id,req.body,{new:true})
        res.json({
            data:result,
            message:'employee updated successfully',
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

exports.module=EditEmployee