const express=require('express')
const router=express.Router()
const RegisterUserController=require('../../Controllers/User/RegisterUser').module
const updateUserController=require('../../Controllers/User/updateUser').module
const LoginUserController=require('../../Controllers/User/LoginUser').module
const fetchUserDetailsController=require('../../Controllers/User/FetchUserDetails').module
const authToken=require('../../Middleware/auth').module

router.post('/register',RegisterUserController)

router.post('/login',LoginUserController)

router.post('/:id',updateUserController)

router.get('/userDetails',authToken,fetchUserDetailsController)

exports.module=router