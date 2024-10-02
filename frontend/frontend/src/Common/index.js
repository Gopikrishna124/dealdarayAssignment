const backend = "http://localhost:4001";

const summaryApi = {
  register: {
    url: `${backend}/api/v1/users/register`,
    method: "post",
  },
  login: {
    url: `${backend}/api/v1/users/login`,
    method: "post",
  },
  userDetails:{
    url:`${backend}/api/v1/users/userDetails`,
    method:"get"
  },
  bookDetails:{
    url:`${backend}/api/v1/books`,
    method:'get'
  },
  paramsBookDetails:{
    url:`${backend}/api/v1/books`,
    method:'get'
  },
  addreview:{
    url:`${backend}/api/v1/reviews`,
    method:'post'
  },
  getreviews:{
    url:`${backend}/api/v1/reviews`,
    method:'get'
  },
  updateUser:{
    url:`${backend}/api/v1/users`,
    method:'post'
  },
  searchBook:{
    url:`${backend}/api/v1/books/search`,
    method:'get'
  },
  logout:{
     url:`${backend}/api/v1/users/logout`,
    method:'post'
  }
};

export default summaryApi;
