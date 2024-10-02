import {createBrowserRouter} from 'react-router-dom'
import App from '../App'
import Home from '../Pages/Home/Home'
import Login from '../Pages/Login/Login'
import Register from '../Pages/Register/Register'
import ForgotPassword from '../Pages/ForgotPassword/ForgotPassword'
import UserProfile from '../Pages/Profile/UserProfile'
import AdminPage from '../Pages/Admin/AdminPage'
import BooksDetailsPage from '../Pages/bookDetails/BooksDetailsPage'
import SearchProduct from '../Pages/SearchProduct/SearchProduct'


const router=createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            {
                path:'',
                element:<Home/>
            },
            {
                path:'/login',
                element:<Login/>
            },
            {
                path:'/register',
                element:<Register/>
            },
            {
                path:'forgot-password',
                element:<ForgotPassword/>
            },
            {
                path:'/userInfo',
                element:<UserProfile/>
            },
            {
              path:'/book-details/:id',
              element:<BooksDetailsPage/>
            },
            {
                path:'/admin',
                element:<AdminPage/>
            },
            {
                path:'/search',
                element:<SearchProduct/>
            }
        ]
    }
])

export default router