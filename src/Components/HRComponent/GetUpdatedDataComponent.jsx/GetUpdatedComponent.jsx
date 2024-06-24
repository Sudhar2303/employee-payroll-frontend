import React, { useEffect, useState } from 'react'
import axios from 'axios'

const GetUpdatedComponent = () => {
  const [EmployeeData,setEmployeeData] = useState([])
 
  useEffect(()=>
    {
      axios.get('https://employee-payroll-backend.vercel.app/api/v1/hr/getAllEmployee',{ withCredentials: true })
      .then((response)=>{
        setEmployeeData(response.data)
      })
      .catch((error)=>
        {
          console.log(error.message)
          if (error.response.status === 401) {
            alert('Unauthorized access: Please log in.');
            window.location.href='/'
          }
        })
    },[])
    
  return (
    <div className="user-list">
      {EmployeeData && EmployeeData.map((iterator)=>(
        <div className="user-card" key={iterator._id}>
            <h3>Employee Name: {iterator.employeeName}</h3>
            <p className="status">perDaySalary : {iterator.perDaySalary}</p>
            <p className="status">month : {iterator.month}</p>
            <p className="status">workingDays : {iterator.workingDays}</p>
            <p className="status">salary : {iterator.salary}</p>
        </div>
      ))}

    </div>
  )
}

export default GetUpdatedComponent