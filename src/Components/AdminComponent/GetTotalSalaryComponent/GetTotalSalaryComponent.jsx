import React, { useEffect, useState } from 'react'
import axios from 'axios'

const GetTotalSalaryComponent = () => {
  const [totalSalary,setTotalSalary] = useState([])

  useEffect(()=>
    {
      axios.get('http://localhost:3500/api/v1/admin/getTotalSalary',{ withCredentials: true })
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
      <h3>Total Salary is {totalSalary}</h3>
    </div>
  )
}

export default GetTotalSalaryComponent