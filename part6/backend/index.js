import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import authrouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"

dotenv.config()
const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))
app.use(cookieParser())
app.use("/api",authrouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  connectDB()
  console.log(`Example app listening on port ${PORT}`)
})
