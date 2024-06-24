import React from 'react'
import { Link, Route, Router, Routes } from 'react-router-dom';
import GetEmployeeData from './GetEmployeeDataComponent/GetEmployeeData'
import GetTotalSalaryComponent from '../AdminComponent/GetTotalSalaryComponent/GetTotalSalaryComponent'
import AddWorkingDaysComponent from './AddWorkingDaysComponent.jsx/AddWorkingDaysComponent'
import '../AdminComponent/AdminComponent.css'

const HRComponent = () => {
  return (
        <div className="main-content">
            <div className="admin-panel">
              <h3 className="admin-title">HR Panel</h3>
              
              <nav className="admin-nav">
                <Link to="/hr/getAllEmployee" >EmployeeDetails</Link>
                <Link to="/hr" >Add Attended Days</Link>
                <Link to="/hr/getTotalSalary" >Total Salary</Link>   
              </nav>
           <Routes >
                 c<Route path='/' element={<AddWorkingDaysComponent/>}></Route>
                 <Route path='/getAllEmployee' element={<GetEmployeeData/>}></Route>
                 <Route path='/getTotalSalary' element={<GetTotalSalaryComponent/>}></Route>
          </Routes>
          </div>
        </div>
  )
}

export default HRComponent