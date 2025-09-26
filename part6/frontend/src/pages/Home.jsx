import React, { useContext } from 'react'
import { dataContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
  let {serverUrl,userData,setUserData,getUserdata} = useContext(dataContext)
  let navigate = useNavigate()
  if(!userData){
    navigate("/login")
  }

  const handelLogOut = async() => {
    try {
      let data = await axios.post(serverUrl + "/api/logout",{},{
        withCredentials:true
      })
      setUserData(null)
    } catch (error) {
      console.log(error);
    }
  }

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center">
      
      {/* Profile Image */}
      <div className="flex justify-center mb-4">
        <img
          src={userData.profileimage || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-indigo-500 shadow-md object-cover"
        />
      </div>

      {/* Greeting */}
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Hey, <span className="text-indigo-600">{userData.firstName}</span> 👋
      </h2>
      <p className="text-gray-600 mb-6">
        Welcome to the <span className="font-semibold text-purple-600">Ultimate Backend Course</span>
      </p>

      {/* Logout Button */}
      <button
        onClick={handelLogOut}
        className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all duration-300 shadow-md"
      >
        Log Out
      </button>
    </div>
  </div>
);

}

export default Home
