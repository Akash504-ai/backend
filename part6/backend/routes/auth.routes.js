import express, { Router } from "express"
import { getUserData, login, logout, signup } from "../controllers/auth.js";
import { uplode } from "../middlewares/multer.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const authrouter = express.Router()

authrouter.post("/signup",uplode.single("profileImage"),signup)
authrouter.post("/login",login)
authrouter.post("/logout",logout)
authrouter.get("/getuserdata",checkAuth,getUserData)

export default authrouter;