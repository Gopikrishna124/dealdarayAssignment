const express=require('express')
const router=express.Router()

const createEmployeeController=require('../../Controllers/Employees/CreateEmployees').module
const getEmployeeDetailsController=require('../../Controllers/Employees/getEmployess').module
const searchEmployeeController=require('../../Controllers/Employees/SearchEmployee').module
const deleteEmployeeController=require('../../Controllers/Employees/DeleteEmployee').module
const EditEmployeeController=require('../../Controllers/Employees/EditEmployee').module

router.post('/',createEmployeeController)

router.get('/',getEmployeeDetailsController)


router.get('/find/searchEmployee',searchEmployeeController)

router.post('/delete',deleteEmployeeController)

router.post('/edit',EditEmployeeController)

exports.module=router