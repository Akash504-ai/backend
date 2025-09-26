import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const dataContext = createContext()
function UserContext({ children }) {
  let navigate = useNavigate()
  let [userData,setUserData] = useState(null)
  const serverUrl = "http://localhost:8000";
  const getUserdata = async() => {
    try {
      let {data} = await axios.get(serverUrl + "/api/getUserData",{
        withCredentials:true
      })
      setUserData(data)
    } catch (error) {
      navigate("/login")
      console.log(error);
    }
  }
  const value = {
    serverUrl,userData,setUserData,getUserdata
  };

  useEffect(()=>{
    getUserdata()
  },[])

  return (
    <dataContext.Provider value={value}>
      {children}
    </dataContext.Provider>
  );
}

export default UserContext;
