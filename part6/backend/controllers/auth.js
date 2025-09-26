import uplodeIMGonCloudinary from "../config/cloudinary.js";
import generateToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs"

export const signup = async(req,res) => {
  try {
    const {firstName,lastName,email,password,userName} = req.body;

    if(!firstName || !lastName || !email || !password || !userName){
      return res.status(400).json({message:"Send all details"})
    }

    let profileImage;
    if(req.file){
      profileImage = await uplodeIMGonCloudinary(req.file.path)
    }

    let existUser = await User.findOne({email:email})
    if(existUser){
      return res.status(400).json({message:"User already exist"})
    }

    const hashedPassword = await bcrypt.hash(password,10)

    const user = await User.create({
      firstName:firstName,
      lastName:lastName,
      email:email,
      password:hashedPassword,
      userName:userName,
      profileimage:profileImage
    })
    
    let token;
    try {
      token = generateToken(user._id)
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Token generation failed" });
    }

    res.cookie("token",token,{
      httpOnly:true,
      secure:process.env.NODE_ENVIRONMENT == "production",
      sameSite:"strict",
      maxAge:7*24*60*60*1000
    })
    
    return res.status(201).json({message:"User created",user:{
      firstName:firstName,
      lastName:lastName,
      email:email, 
      userName:userName,
      profileImage:profileImage
    }})

  } catch (error) {
    return res.status(500).json({message:"internal server error"})
  }
}

export const login = async(req,res) => {
  try {
    const {email,password} = req.body;

    let existUser = await User.findOne({email})
    if(!existUser){
      return res.status(400).json({message:"User does not exist"})
    }

    let match = await bcrypt.compare(password,existUser.password)
    if(!match){
      return res.status(400).json({message:"Incorrect Password"})
    }

    let token;
    try {
      token = generateToken(existUser._id)
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Token generation failed" });
    }

    res.cookie("token",token,{
      httpOnly:true,
      secure:process.env.NODE_ENVIRONMENT == "production",
      sameSite:"strict",
      maxAge:7*24*60*60*1000
    })

    res.status(200).json({user:{
      firstName:existUser.firstName,
      lastName:existUser.lastName,
      email:existUser.email, 
      userName:existUser.userName,
      profileImage:existUser.profileimage
    }})

  } catch (error) {
    return res.status(500).json(error)
  }
}

export const logout = async(req,res) => {
  try {
    res.clearCookie("token")
    return res.status(200).json({message:"logout successfully"})
  } catch (error) {
    return res.status(500).json(error)
  }
}

export const getUserData = async(req,res) => {
  try {
    let userID = req.userID
    if(!userID){
      return res.status(400).json({message:"User not found"})
    }
    let user = await User.findById(userID)
    if(!user){
      return res.status(400).json({message:"User not found"})
    }
    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json({message:error})
  }
}