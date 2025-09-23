import React from 'react'
import axios from "axios"
import { useState } from 'react'

const App = () => {

  let [userName,setuserName] = useState(null)
  let [age,setage] = useState(null)
  let [city,setcity] = useState(null)

async function getRes() {
  // axios.get("http://localhost:8000/")
  // .then((e)=>{
  //   console.log(e);
  //   console.log(e.data);
  // }).catch((e)=>{
  //   console.log(e);
  // })

  axios.post("http://localhost:8000/",{
    userName:userName,
    age:age,
    city:city
  })
  .then((e)=>{
    console.log(e);
    console.log(e.data);
  }).catch((e)=>{
    console.log(e);
  })
}

  return (
    <div>
      {/* <button onClick={()=>getRes()}>send</button> */}
      <br />
      <input type="text" placeholder='username' value={userName} onChange={(e)=>setuserName(e.target.value)}/><br />
      <input type="number" placeholder='age' value={age} onChange={(e)=>setage(e.target.value)}/><br />
      <input type="text" placeholder='city' value={city} onChange={(e)=>setcity(e.target.value)}/><br />
      <button onClick={()=>getRes()}>info-send</button>
    </div>
  )
}

export default App
