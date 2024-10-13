const Employee=require('../../Models/EmployeeModel').module


const createEmployee=async(req,res)=>{
    try {
        const existingEmail=await Employee.findOne({Email:req.body.Email})
        if(existingEmail){
            throw new Error('Email already exists')
         }
        const employee=new Employee(req.body)
       
        const result=await employee.save()
        res.json({
            data:result,
            message:'employee created successfully',
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

exports.module=createEmployee