
import './App.css';
import {Routes,Route, Navigate} from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import { useState,useEffect } from 'react';
import RefreshHandler from './RefreshHandler';
import Profile from './pages/Profile';
//import {Html5QrcodeScanner} from "html5-qrcode"
function App() {
  const[isAuthenticated,setIsAuthenticated]=useState(false);
  const PrivateRoute=({element})=>{
    return isAuthenticated?element:<Navigate to= '/login' /> //traeting as componet
  }
  
  return (
    <div className="App">
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
       <Routes>
       <Route path='/' element={<Navigate to='/login' />}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/auth/profile/:userId' element={<Profile/>}/>
        
       </Routes>
    </div>
  );
}

export default App;
