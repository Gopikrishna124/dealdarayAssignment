import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import { useDispatch, useSelector } from "react-redux";
import './App.css'


import ProtectedRoute from "./Components/ProtectedRoute";
import Register from "./Pages/Register/Register.js";
import { fetchUserDetails, selectUserDetails } from "./Redux/userDetailsSlice";
import EmployeeList from "./Pages/EmployeeList/EmployeeList.js";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      ),
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path:'/employee-list',
      element:<EmployeeList/>
    },
  
  ]);

  return (
    <div>
      <ToastContainer position="top-center" />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
