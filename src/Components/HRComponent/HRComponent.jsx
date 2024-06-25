import React, { useState } from 'react'
import { Link, Route, Router, Routes } from 'react-router-dom';
import GetTotalSalaryComponent from '../AdminComponent/GetTotalSalaryComponent/GetTotalSalaryComponent'
import '../AdminComponent/AdminComponent.css'
import GetEmployeeDataComponent from './GetEmployeeDataComponent/GetEmployeeDataComponent';
import GetUpdatedComponent from './GetUpdatedDataComponent.jsx/GetUpdatedComponent';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HRComponent = () => {
  const navigate = useNavigate();
  const [isHR,setIsHR] = useState(false);
  axios
      .get(`https://employee-payroll-backend.vercel.app/api/v1/admin/authenticate`,{withCredentials: true})
      .then((response)=>{
        if(response.status==201)
          {
              // alert('Authorized user')
              setIsHR(true);
          }
      })
      .catch((error)=>{
          // alert(`Status : ${error.message}`)
          // window.location.href='/'
          navigate('/');
          setIsHR(false)       
      })
  return (
    <React.Fragment>
      {isHR &&
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
      }
      </React.Fragment>
  )
}

export default HRComponent