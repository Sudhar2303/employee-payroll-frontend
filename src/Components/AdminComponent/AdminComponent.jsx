import React, { useEffect, useState } from 'react'
import './AdminComponent.css'
import { Link, Route, Router, Routes } from 'react-router-dom';
import GetEmployeeDataComponent from './GetEmployeeDataComponent/GetEmployeeDataComponent';
import AddEmployeeDataComponent from './AddEmployeeDataComponent/AddEmployeeDataComponent';
import GetTotalSalaryComponent from './GetTotalSalaryComponent/GetTotalSalaryComponent';
import { useNavigate } from 'react-router-dom';

const AdminComponent = () => {
  return (
        <div className="main-content">
            <div className="admin-panel">
              <h3 className="admin-title" >Admin Panel</h3>
              
              <nav className="admin-nav">
                <Link to="/admin" >EmployeeDetails</Link>
                <Link to="/admin/addEmployee" >ADD New Employee</Link>
                <Link to="/admin/getTotalSalary" >Total Salary</Link>
              </nav>
           <Routes >
                 <Route path='/' element={<GetEmployeeDataComponent/>}></Route>
                 <Route path='/addEmployee' element={<AddEmployeeDataComponent/>}></Route>
                 <Route path='/getTotalSalary' element={<GetTotalSalaryComponent/>}></Route>
          </Routes>
          </div>
        </div>
  )
}

export default AdminComponent