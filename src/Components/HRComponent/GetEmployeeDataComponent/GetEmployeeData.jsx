import React, { useEffect, useState } from 'react'
import axios from 'axios'


const GetEmployeeData = () => {
  const [EmployeeData,setEmployeeData] = useState([])

  useEffect(()=>
    {
      axios.get('http://localhost:3500/api/v1/hr/getAllEmployee',{ withCredentials: true })
      .then((response)=>{
        setEmployeeData(response.data)
        console.log(response.data)
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
      {EmployeeData && EmployeeData.map((iterator)=>
        <div className="user-card" key={iterator._id}>
          <h3>EmployeeID : {iterator.employeeID}</h3>
          <p className="status">Month : {iterator.month}</p>
          <p className="status">PerDay Salary : {iterator.perDaySalary}</p>
          <p className="status">Working Days : {iterator.workingDays}</p>
          <p className="status">Monthly Salary : {iterator.salary}</p>
        </div>
      )}
    </div>
  )
}

export default GetEmployeeData