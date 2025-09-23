import express from "express"
import cors from "cors"
const app = express()
const port = 8000

// let password = "akash999"

app.use(express.json()) //without this everytime middlewire will show undefined...

//ex of custom middlewire...
// app.use((req,res,next)=>{
//   if(req.body.password != password){
//     res.send("Password does not match")
//   }
//   next()
// })

app.get("/", (req, res) => {
  console.log(req.headers);
  res.json({name:"Akash",age:20})
})

app.post("/",(req,res)=>{
  console.log(req.body);
  res.send({success:true})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
