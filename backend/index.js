const express=require("express");
const app=express();
const cors=require('cors');
const bodyParser=require("body-parser");
const AuthRouter=require('./Routes/AuthRouter');


require("dotenv").config();
require('./Models/db');

const PORT=process.env.PORT || 3000;
app.get("/ping",(req,res)=>{
res.send("PONG")
});
app.use(bodyParser.json()); //Frontend se data lene k liye
app.use(cors({
    origin:"firebase-login-signup-2fm5-ha113me8a.vercel.app"
}));
app.use("/auth",AuthRouter);

app.listen(PORT,()=>{
    console.log("server running at port")
})
