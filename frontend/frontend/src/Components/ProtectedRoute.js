import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import { fetchUserDetails, selectIsAuthenticated, selectToken, selectUserDetails } from '../Redux/userDetailsSlice';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie'

const ProtectedRoute=({children})=>{
   
    const storedToken=localStorage.getItem('LoginToken')
   
    
    const accessToken=JSON.parse(storedToken)
    console.log('accessToken',accessToken)

    if(!accessToken){
       return <Navigate to='/login'/>
     }
    
    return children;
}

export default ProtectedRoute