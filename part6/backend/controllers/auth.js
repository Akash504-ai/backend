import User from "../models/user.model.js";
import bcrypt from "bcryptjs"

export const signup = async(req,res) => {
  try {
    const {firstName,lastName,email,password,userName} = req.body;

    if(!firstName || !lastName || !email || !password || !userName){
      return res.status(400).json({message:"Send all details"})
    }

    let existUser = await User.findOne({email:email})
    if(existUser){
      return res.status(400).json({message:"User already exist"})
    }

    const hasedPassword = await bcrypt.hash(password,10)

    const user = await User.create({
      firstName:firstName,
      lastName:lastName,
      email:email,
      password:hasedPassword,
      userName:userName
    })
    return res.status(201).json({message:"User created",user:{
      firstName:firstName,
      lastName:lastName,
      email:email, 
      userName:userName
    }})

  } catch (error) {
    return res.status(500).json({message:"internal server error"})
  }
}