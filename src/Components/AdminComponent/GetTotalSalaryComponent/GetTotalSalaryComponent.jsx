import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
const GetTotalSalaryComponent = () => {
  const [totalSalary,setTotalSalary] = useState([])

  useEffect(()=>
    {
      axios.get('https://employee-payroll-backend.vercel.app/api/v1/admin/getTotalSalary',{ withCredentials: true })
      .then((response)=>{
        const { totalSalary } = response.data[0]
        setTotalSalary(totalSalary)
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
    <div>
      <h3>Total Salary is <FontAwesomeIcon icon= {faIndianRupeeSign} /> {parseFloat(totalSalary.toFixed(2))}</h3>
    </div>
    
  )
}

export default GetTotalSalaryComponent