import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Signup from './pages/signup'
import Login from './pages/login'
import Home from './pages/Home'
import { dataContext } from '../context/UserContext'

const App = () => {
  let {userData,setuserData} = useContext(dataContext)
  return (
    <>
      <Routes>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/' element={userData?<Home />:<Login />}/>
        {/* <Route path='*' element={<Login />}/> */}
      </Routes>
    </>
  )
}

export default App
