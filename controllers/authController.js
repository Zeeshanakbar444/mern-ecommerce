import { User } from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import jwt from "jsonwebtoken";
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    if (!name || !email || !password || !phone || !address) {
      res.status(400).json({
        message: "all fields are required",
        success: false,
      });
    }
    // check for existing user is in databse or not
    const exisitingUser = await User.findOne({ email });
    if (exisitingUser) {
      res.status(200).json({
        success: false,
        message: "user with this email already exists",
      });
    }

    // in this stage new user registerin database
    let hashedPassword = await hashPassword(password);
    const user = await new User({
      email,
      phone,
      name,
      address,
      password: hashedPassword,
      answer,
    });
    user.save();
    res.status(200).json({
      success: true,
      message: "user register Scuuessfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "error occur in registration ",
      success: false,
    });
  }
};

// login controller

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};


export const forgotPasswordController = async(req,res)=>{
try {
  const {email,answer, newPassword} = req.body
  if(!email||!answer||!newPassword){
    res.status(400).json({
  success:false,
  message:"all fields are required",
  })
  }


// check email
const user = await User.findOne({email})

if(!user){
    res.status(400).json({
  success:false,
  message:"User not found",
  })
}

const hash = await hashPassword(newPassword)
await User.findByIdAndUpdate(user._id , {password:hash})
res.status(200).json({
  success:true,
  message:"password forget successfully"
})

} catch (error) {
  console.log(error)
  res.status(500).json({
  success:false,
  message:"somethinmg went wrong",
  error
  })
}
}

//update prfole
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await User.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
};