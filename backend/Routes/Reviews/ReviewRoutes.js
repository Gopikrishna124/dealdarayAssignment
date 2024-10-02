const express=require('express')
const router=express.Router()
const addReviewController=require('../../Controllers/Reviews/addReview').module
const getReviewController=require('../../Controllers/Reviews/getReview').module

router.post('/',addReviewController)

router.get('/:id',getReviewController)

exports.module=router