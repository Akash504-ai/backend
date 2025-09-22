import express from "express";
const app = express();
const port = 3000;

app.use(express.json());

let users = [
  {
    id: 1,
    name: "Amit Sharma",
    age: 28,
    department: "Engineering",
    salary: 60000,
  },
  {
    id: 2,
    name: "Priya Verma",
    age: 25,
    department: "Human Resources",
    salary: 45000,
  },
  {
    id: 3,
    name: "Rahul Das",
    age: 32,
    department: "Finance",
    salary: 70000,
  },
  {
    id: 4,
    name: "Sneha Kapoor",
    age: 27,
    department: "Marketing",
    salary: 50000,
  },
  {
    id: 5,
    name: "Arjun Mehta",
    age: 30,
    department: "Sales",
    salary: 55000,
  },
];

app.get("/", (req, res) => {
  // res.send('Hello World!')
  res.json({ name: "Akash", class: "12" });
});

app.get("/users",(req,res) => {
  res.json(users)
})

//Paramms--->This is used for dynamic routing...
app.get("/users/:id",(req,res) => {
  let id = req.params.id
  let newUser = users.find((user) => (user.id == id))
  if(!newUser) {
    res.send("404 NOT FOUND")
  } else {
    res.json(newUser)
  }
})

app.post("/", (req, res) => {
  let body = req.body;
  console.log(body);
  res.send("Hello World!");
});

//ex of quary ---> http://localhost:3000/search?name=Akash & age=20
app.get("/search",(req,res)=>{
  let quary = req.query
  res.json(quary)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
