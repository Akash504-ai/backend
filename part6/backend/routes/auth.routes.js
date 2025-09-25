import express, { Router } from "express"
import { signup } from "../controllers/auth.js";

const authrouter = express(Router())

authrouter.post("/signup",signup)

export default authrouter;