// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTeV2WMqfnPI6reB1E1TU1Ipji_cklUsQ",
  authDomain: "login-auth-91e84.firebaseapp.com",
  projectId: "login-auth-91e84",
  storageBucket: "login-auth-91e84.firebasestorage.app",
  messagingSenderId: "685061550618",
  appId: "1:685061550618:web:928ed0235daa9076a017a3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export  default app;