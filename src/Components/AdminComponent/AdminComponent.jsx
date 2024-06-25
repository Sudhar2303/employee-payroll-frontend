import React, { useEffect, useState } from 'react'
import './AdminComponent.css'
import { Link, Route, Router, Routes } from 'react-router-dom';
import GetEmployeeDataComponent from './GetEmployeeDataComponent/GetEmployeeDataComponent';
import AddEmployeeDataComponent from './AddEmployeeDataComponent/AddEmployeeDataComponent';
import GetTotalSalaryComponent from './GetTotalSalaryComponent/GetTotalSalaryComponent';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const AdminComponent = () => {
  const navigate = useNavigate();
  const [isAdmin,setIsAdmin] = useState(false);
  useEffect(()=>
  {
      axios
      .get(`https://employee-payroll-backend.vercel.app/api/v1/admin/authenticate`,{withCredentials: true})
      .then((response)=>{
        if(response.status==201)
          { // alert('Authorized user')
              setIsAdmin(true);
          }
      })
      .catch((error)=>{
        console.log(error)
          // window.location.href='/'
          navigate('/');  
      })
  },[])
  return (
        <div>
          {isAdmin && 
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
          </div>}
        </div>
  )
}

export default AdminComponent