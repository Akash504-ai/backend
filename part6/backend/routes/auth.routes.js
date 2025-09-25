import express, { Router } from "express"
import { login, logout, signup } from "../controllers/auth.js";

const authrouter = express(Router())

authrouter.post("/signup",signup)
authrouter.post("/login",login)
authrouter.post("/logout",logout)

export default authrouter;