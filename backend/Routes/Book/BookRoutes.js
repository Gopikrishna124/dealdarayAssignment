const express=require('express')
const router=express.Router()
const addBookController=require('../../Controllers/Book/addBook').module
const getAllBooksController=require('../../Controllers/Book/getAllBooks').module
const getSingleBookController=require('../../Controllers/Book/getSingleBook').module
const searchBookController=require('../../Controllers/Book/searchBook').module

router.get('/search',searchBookController)

router.post('/',addBookController)

router.get('/',getAllBooksController)

router.get('/:id',getSingleBookController)



exports.module=router