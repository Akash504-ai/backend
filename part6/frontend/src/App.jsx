import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/signup'
import Login from './pages/login'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/login' element={<Login />}/>
        {/* <Route path='*' element={<Login />}/> */}
      </Routes>
    </>
  )
}

export default App
