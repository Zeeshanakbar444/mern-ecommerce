import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        rerquired:true
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    }, answer: {
      type: String,
      required: true,
    },
  
    role: {
      type: Number,
      default: 0,
    },
},{timestamps:true});

export const User = mongoose.model("User", userSchema);
