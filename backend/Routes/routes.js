const express=require('express')
const router=express.Router()
const StoringDataController=require('../Controllers/StoringController').module
router.post('/register',StoringDataController)

exports.module=router