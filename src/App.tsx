import { Routes, Route } from 'react-router-dom'
import React from 'react'
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
import Write from './pages/Write'
import Login from './pages/Login'
import Register from './pages/Register'
import Detail from './pages/Detail'
import Settings from './pages/Settings'
function App() {
  return (
    <div>
      <div className="dark:bg-gray-900 dark:text-white h-screen w-screen overflow-y-auto overflow-x-hidden flex flex-col ">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/write/" element={<Write />}>
            <Route path=":postid" element={<Write />} />
            <Route path="" element={<Write />} />
          </Route>
          <Route path="/detail" element={<Detail />}></Route>
          <Route path="/settings" element={<Settings />}></Route>
        </Routes>
      </div>
    </div>
  )
}
export default App
