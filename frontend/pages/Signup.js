import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify';
import { useState} from 'react';
import { handleError, handleSuccess } from '../util';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
function Signup() {
  
  const[signupInfo,setSignupInfo]=useState({
    name:"",
 email:"",
    password:"",
    phone:"",
    gender:"",
   
  })
  const naviagte= useNavigate();


  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;

        if (user) {
            const url = 'firebase-login-signup-plum.vercel.app/auth/signup';
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(signupInfo)
            });

            const result = await response.json();
            const { message, success, error, user: userData } = result;

            if (success) {
                handleSuccess("Registration successful");

                // Redirect to Home page with the QR code
                setTimeout(() => {
                    naviagte('/home', { state: { qrCode: userData.qrCode } });
                }, 1000);
            } else if (error) {
                const details = error?.details[0]?.message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
        }
    } catch (error) {
        console.error(error.message);
    }
};
 



  //Input field managing
  const handleChange=(e)=>{
    const{name,value,files}=e.target;
    console.log(name,value)
    const copySignupInfo={...signupInfo};
   
    //if(files){
//copySignupInfo[name]=files[0];
//setSignupInfo(copySignupInfo)
    //}
    //else{
      copySignupInfo[name]=value;
      setSignupInfo(copySignupInfo);
    //}
   
    

  }



  return (
    <div class="container">
  <h1>Signup</h1>
  <form onSubmit={handleRegister}>
    <div class="form-section">
      
      <div class="primary">
        <div>
          <label>Name</label>
          <input type="text" placeholder="Enter your name" name="name" autoFocus onChange={handleChange} />
        </div>
        <div>
          <label>Email</label>
          <input type="email" placeholder="Enter your email" name="email" onChange={handleChange} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" placeholder="Enter your password" name="password" onChange={handleChange} required />
        </div>
      </div>

      
      <div class="secondary">
       
        <div>
          <label>Phone Number</label>
          <input type="tel" placeholder="123-456-7890" name="phone" onChange={handleChange} required />
        </div>
        <div>
          <label>Gender</label>
          <input type="radio" name="gender" value="male" onChange={handleChange} required /> Male
          <input type="radio" name="gender" value="female" onChange={handleChange} required /> Female
          <input type="radio" name="gender" value="other" onChange={handleChange} required /> Other
        </div>
      </div>
    </div>

    
    <div class="btn">
      <button type="submit">SignUp</button>
      <h5>Already have an Account?<Link to="/login">Login</Link></h5>
    </div>
  </form>
  <ToastContainer/>
</div>
  )
}

export default Signup
