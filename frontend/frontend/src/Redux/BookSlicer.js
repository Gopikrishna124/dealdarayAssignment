

import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import summaryApi from '../Common/index.js'

const initialState={
    status:'idle',
    booksData:[]
}
///////////////////////////////////////////

export const fetchBookDetails=createAsyncThunk(
    'book/bookDetails',async()=>{
        const response=await fetch(summaryApi.bookDetails.url,{
            method:summaryApi.bookDetails.method,
            credentials:'include'
        })

        const data=await response.json()
    
        return data.data
    }
)


/////////////////////////////////////////////////

export const bookDetailsSlice=createSlice({
    name:'bookDetails',
    initialState,
    reducers:{
        //demo reducer
        increment:(state,action)=>{
                     state+=1
                   }
    },

    extraReducers:(builder)=>{
        builder
        .addCase(fetchBookDetails.pending,(state,action)=>{
            state.status='loading'
        })
        .addCase(fetchBookDetails.fulfilled,(state,action)=>{
            state.booksData=action.payload
        })
    }

})

export const { increment }=bookDetailsSlice.actions


export const selectBookDetails = (state) => state.book.booksData


export default bookDetailsSlice.reducer

