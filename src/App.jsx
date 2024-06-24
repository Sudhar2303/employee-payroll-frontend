import React from 'react'
import LoginComponent from './Components/LoginComponent/LoginComponent'
import AdminComponent from './Components/AdminComponent/AdminComponent.jsx'
import HRComponent from './Components/HRComponent/HRComponent.jsx'
import { AuthProvider, useAuth } from './Components/AuthComponent/AuthProvider.jsx';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import './App.css'
<style>
@import url('https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap');
</style>


const App = () => {
  return (
      <BrowserRouter>
      <div className="app-container">
        <header className="header">
          <h3>Employee Payroll</h3>
        </header>
        <AuthProvider>
          <Routes>
            <Route exact path='/' element={<LoginComponent/>}></Route>
            <Route exact path='/admin/*' element={<AdminComponent/>}></Route>
            <Route exact path='/hr/*' element={<HRComponent/>}></Route>
          </Routes>
      </AuthProvider>
      </div>
      </BrowserRouter>
    
  )
}

export default App