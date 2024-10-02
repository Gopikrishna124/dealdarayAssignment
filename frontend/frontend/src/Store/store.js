import {configureStore} from '@reduxjs/toolkit'
import userDetailsReducer from '../Redux/UserDetailsSlice'
import bookDetailsSlice from '../Redux/BookSlicer'

export const store=configureStore({
    reducer:{
         user:userDetailsReducer,
         book:bookDetailsSlice
    }
})