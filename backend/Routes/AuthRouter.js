const { signupValidation,loginValidation } = require('../Middlewares/AuthValidation');
const {signup, login,getUserDetails,getUserProfile, logout}=require('../Controller/AuthController')

const router=require('express').Router();
//router.post('/login',(req,res)=>{
//res.send("Login success");
//});
router.post('/login',loginValidation,login);
router.post('/signup',signupValidation,signup);
router.post('/user',getUserDetails);
router.get('/profile/:userId', getUserProfile);
router.post('/logout',logout)
// Add this to handle fetching the profile

    module.exports=router;
