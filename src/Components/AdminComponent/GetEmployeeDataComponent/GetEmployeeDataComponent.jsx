import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../AdminComponent.css'

const GetEmployeeDataComponent = () => {
  const [EmployeeData,setEmployeeData] = useState([])

  useEffect(()=>
    {
      axios.get('https://employee-payroll-backend.vercel.app/api/v1/admin/getEmployee',{ withCredentials: true })
      .then((response)=>{
        setEmployeeData(response.data)
      })
      .catch((error)=>
        {
          console.log(error.message)
          if (error.response.status === 401) {
            window.location.href='/'
            alert('Unauthorized access: Please log in.');
          }
        })
    },[])
    
  return (
    <div className="user-list">
      {EmployeeData && EmployeeData.map((iterator)=>(
        <div className="user-card" key={iterator._id}>
            <h3>EmployeeID: {iterator.employeeID}</h3>
            <p className="status">Employee Name : {iterator.employeeName}</p>
            <p className="status">Role : {iterator.role}</p>
            <p className="status">BasicPay : {iterator.basicPay}</p>
            <p className="status">Grade : {iterator.grade}</p>
        </div>
      ))}
    </div>
  )
}

export default GetEmployeeDataComponent