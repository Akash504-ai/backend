import mongoose from "mongoose";

const connectDB = async(req,res) => {
  try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log("Database connected");
  } catch (error) {
    console.log("Database error",error);
  }
}

export default connectDB;