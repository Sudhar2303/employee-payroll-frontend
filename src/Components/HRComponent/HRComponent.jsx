import React from 'react'
import { Link, Route, Router, Routes } from 'react-router-dom';
import GetTotalSalaryComponent from '../AdminComponent/GetTotalSalaryComponent/GetTotalSalaryComponent'
import '../AdminComponent/AdminComponent.css'
import GetEmployeeDataComponent from './GetEmployeeDataComponent/GetEmployeeDataComponent';
import GetUpdatedComponent from './GetUpdatedDataComponent.jsx/GetUpdatedComponent';

const HRComponent = () => {
  return (
        <div className="main-content">
            <div className="admin-panel">
              <h3 className="admin-title">HR Panel</h3>
              
              <nav className="admin-nav">
                <Link to="/hr/getAllEmployee" >EmployeeDetails</Link>
                <Link to="/hr" >Updated Attended Days</Link>
                <Link to="/hr/getTotalSalary" >Total Salary</Link>   
              </nav>
           <Routes >
                 c<Route path='/' element={<GetUpdatedComponent/>}></Route>
                 <Route path='/getAllEmployee' element={<GetEmployeeDataComponent/>}></Route>
                 <Route path='/getTotalSalary' element={<GetTotalSalaryComponent/>}></Route>
          </Routes>
          </div>
        </div>
  )
}

export default HRComponent