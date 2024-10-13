const backend = "http://localhost:4001";

const summaryApi = {
  register: {
    url: `${backend}/api/v1/auth/register`,
    method: "post",
  },
  login: {
    url: `${backend}/api/v1/auth/login`,
    method: "post",
  },
  userDetails:{
    url:`${backend}/api/v1/auth/userDetails`,
    method:'get'
  },
  createEmployee:{
    url:`${backend}/api/v1/employees`,
    method:'post'
  },
  getEmployeeDetails:{
    url:`${backend}/api/v1/employees`,
    method:'get'
  },
  searchEmployee:{
    url:`${backend}/api/v1/employees/find/searchEmployee`,
    method:'get'
  },
  deleteEmployee:{
  url:`${backend}/api/v1/employees/delete`,
  method:'post'
  },
  EditEmployee:{
    url:`${backend}/api/v1/employees/edit`,
    method:'post'
  },
  LogOut:{
    url:`${backend}/api/v1/auth/logout`,
    method:'post'
  }
};

export default summaryApi;
