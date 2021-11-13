import { Routes, Route } from 'react-router-dom'
import React from 'react'
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
      </Routes>
    </div>
  )
}
export default App
