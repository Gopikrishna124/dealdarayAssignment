import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../Redux/userDetailsSlice'

export const store=configureStore({
    reducer:{
        user:userReducer,  
    }
})