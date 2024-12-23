

const jwt=require('jsonwebtoken')
const ensureAuthenticated=(req,res,next)=>{
const auth=req.headers['authorization']; //token from cliet
if(!auth){
    return res.status(403).json({
        message:"UnAuthorized, jwt token is required"
    })
}
try {
    const decoded=jwt.verify(auth,process.env.JWT_SECRET);
    req.user=decoded;
    next();
} catch (error) {
    return res.status(403).json({
        message:"UnAuthorized, jwt token is wrong"
    })
    
}
}
module.exports=ensureAuthenticated