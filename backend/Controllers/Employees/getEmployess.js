const Employee=require('../../Models/EmployeeModel').module


const getEmployee=async(req,res)=>{
    try {
       
        const result=await Employee.find({}).sort({
            Name:1,
            Email:1,
            _id:1,
            createdAt:-1
        })
        res.json({
            data:result,
            message:'employee details fetched successfully',
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

exports.module=getEmployee