import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify';
import { useState} from 'react';
import { handleError, handleSuccess } from '../util';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
function Login() {
  
  const[loginInfo,setLoginInfo]=useState({
    
    email:"",
    password:""
  })
  const naviagte= useNavigate()
  const handleChange=(e)=>{
    const{name,value}=e.target;
    console.log(name,value)
    const copyLoginInfo={...loginInfo};
    copyLoginInfo[name]=value;
    setLoginInfo(copyLoginInfo);

  }


  //Login logic
  const handleSubmit=async(e)=>{
e.preventDefault();
try {
  await signInWithEmailAndPassword(auth,loginInfo.email,loginInfo.password);
  const user=auth.currentUser;
  


  const url='http://localhost:3000/auth/login';
  const response=await fetch(url,{ //two parameters in fetch keyword
    method:"POST",
    headers:{
      'Content-Type':"Application/json",
    
    },
    body:JSON.stringify({email:loginInfo.email,password:loginInfo.password})
  });
  
const result=await response.json();
console.log(result);
const {message,success,error}=result;
if(success){
handleSuccess("Login successful");

setTimeout(()=>{
naviagte('/home')
},1000)
}
else if(error){
const details=error?.details[0].message; //server side error has displayed
handleError(details);
}
else if(!success){
handleError(message);
}
  //console.log("user Login successful")
} catch (error) {

  if (error.code === "auth/user-not-found") {
    handleError("No account found with this email.");
  } else if (error.code === "auth/wrong-password") {
    handleError("Incorrect password. Please try again.");
  } else {
    handleError(error.message || "Login failed. Please try again.");
  }
  
}
  }
 
  return (
    <div className='container'>
      <h1>login</h1>
      <form onSubmit={handleSubmit}>
       

        <div> 
          <label>Email</label>
          <input type='email' 
          placeholder='Enter your email' value={loginInfo.email}
          name='email'   onChange={handleChange}/>
        </div>

        <div>
          <label>Password</label>
          <input type='password'  value={loginInfo.password}
          placeholder='Enter your passwprd' name='password'   onChange={handleChange}/>
        </div>
        <button type='submit' style={{margin:"2rem auto"}}>Login</button>
        <span>Don't have an account?<Link to='/signup'>SignUp</Link></span>
      </form>
      <ToastContainer/>
    </div>
  )
}

export default Login