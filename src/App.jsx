import React from 'react'
import LoginComponent from './Components/LoginComponent/LoginComponent'
import AdminComponent from './Components/AdminComponent/AdminComponent.jsx'
import HRComponent from './Components/HRComponent/HRComponent.jsx'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import './App.css'
<style>

</style>


const App = () => {
  return (
      <BrowserRouter>
          <Routes>
                <Route path="/" element={<LoginComponent />} />
                <Route path="/admin/*" element={<AdminComponent />} />
                <Route path="/hr/*" element={<HRComponent />} />
          </Routes>
      </BrowserRouter>
  )
}

export default App