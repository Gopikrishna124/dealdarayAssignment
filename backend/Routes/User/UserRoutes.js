const express=require('express')
const router=express.Router()
const RegisterUserController=require('../../Controllers/User/RegisterUser').module
const LoginUserController=require('../../Controllers/User/LoginUser').module
const fetchUserDetailsController=require('../../Controllers/User/FetchUserDetails').module
const authToken=require('../../Middleware/auth').module
const logoutController=require('../../Controllers/User/Logout').module


router.post('/logout',logoutController)

router.post('/register',RegisterUserController)

router.post('/login',LoginUserController)


router.get('/userDetails',authToken,fetchUserDetailsController)




exports.module=router