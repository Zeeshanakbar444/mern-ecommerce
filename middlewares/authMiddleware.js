import jwt, { decode } from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const requireSignIn = (req, res, next) => {
  try {
    const decode = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};


// admin access

export const isAdmin = async(req,res,next)=>{
try {
  const user =await User.findById(req.user._id)
  
  
  if(user.role!==1){
    return res.status(404).json({
      success:false,
      message:"usAuthorized access"
    })
  }else{
    next()
  }
} catch (error) {
console.log(error);
    res.status(401).json({
      success: false,
      error,
      message: "Error in admin middelware",
    });
}
}