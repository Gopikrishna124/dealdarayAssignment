import {createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import summaryApi from '../Common/index'
import { toast } from 'react-toastify'

const initialState={
    status:'idle',
    userDetails:'',
    token:''
   
}


export const fetchUserDetails=createAsyncThunk(
    'user/userDetails',async()=>{
        const response=await fetch(summaryApi.userDetails.url,{
            method:summaryApi.userDetails.method,
            credentials:'include'
        })
        const resposneData=await response.json()
        return resposneData
    }
)






export const LoginUser=createAsyncThunk(
    'user/loginUser',async({UserName,Password})=>{
        console.log('thunk data',UserName,Password)
        const response=await fetch(summaryApi.login.url,{
            method:summaryApi.login.method,
            credentials:'include',
            headers:{
             'content-type':'application/json',
            },
            body:JSON.stringify({UserName:UserName,Password:Password})
         })
         
         const resposneData=await response.json()
         console.log('userDataToken',resposneData)

         return resposneData.data
          
                 
    }
)


const userDetailsSlice=createSlice({
    name:'User',
    initialState,
    reducers:{

        resetUserDetails:(state,action)=>{
            state.userDetails=''
        }
     },
    extraReducers:(builder)=>{
        builder
          
        .addCase(LoginUser.pending,(state,action)=>{
            state.status='pending'
        })
        .addCase(LoginUser.fulfilled,(state,action)=>{
          console.log('tokenAPi',action.payload)
          state.token=action.payload
          localStorage.setItem('LoginToken',JSON.stringify(action.payload))
          
        })

          .addCase(fetchUserDetails.pending,(state,action)=>{
            
              state.status='pending'
          })
          .addCase(fetchUserDetails.fulfilled,(state,action)=>{
            console.log('action payload',action.payload)
            state.userDetails=action.payload
           
            
          })
    }
})

export const { resetUserDetails}=userDetailsSlice.actions


export const selectUserDetails = (state) => state.user.userDetails

export const selectToken=(state)=>state.user.token

export default userDetailsSlice.reducer