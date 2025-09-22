import http from "http"
const PORT = 8000

const server = http.createServer((req,res)=>{
  // res.end("hello this is my first server...")

  if(req.url == "/"){
    res.end("Welcome to home page...")
  } else if(req.url == "/about"){
    res.end("welcome to about page...")
  } else if(req.url == "/contact"){
    res.end("welcome to contact page...")
  } else {
    res.end("404 NOT FOUND...ERROR")
  }
})

server.listen(PORT,()=>{
  console.log("Server start...");
})