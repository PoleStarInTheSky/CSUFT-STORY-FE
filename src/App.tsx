import { Routes, Route } from 'react-router-dom'
import React from 'react'
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
import Write from './pages/Write'
import Login from './pages/Login'
import Register from './pages/Register'
function App() {
  return (
    <div>
      <div className="dark:bg-gray-900 dark:text-white h-screen w-screen overflow-auto flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/write" element={<Write />}></Route>
        </Routes>
      </div>
    </div>
  )
}
export default App
