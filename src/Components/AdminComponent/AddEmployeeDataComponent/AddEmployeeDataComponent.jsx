import axios from 'axios'
import React, { useState } from 'react'
import './AddEmployeeDataComponent.css'

const AddEmployeeDataComponent = () => {
  const [employeeData,setEmployeeData] = useState({
    employeeID : '',
    employeeName : '',
    role : '',
    grade : '',
    basicPay : ''
  })

  const handleEmployeeID = (event)=>
  {
    setEmployeeData({
      ...employeeData,
      employeeID: event.target.value,
    })
  }

  const handleEmployeeName = (event)=>
  {
    setEmployeeData({
      ...employeeData,
      employeeName: event.target.value,
    })
  }

  const handleRole = (event)=>
  {
    setEmployeeData({
      ...employeeData,
      role: event.target.value,
    })
  }
  const handleGrade = (event)=>
  {
    setEmployeeData({
      ...employeeData,
      grade: event.target.value,
    })
  }

  const handleBasicPay = (event)=>
  {
    setEmployeeData({
      ...employeeData,
      basicPay: event.target.value,
    })
  }

  const formSubmitHandler = (event) => {
    event.preventDefault()
    axios.post(`http://localhost:3500/api/v1/admin/addEmployee`,employeeData,{ withCredentials: true })
    .then((response)=>
      {
        alert(`${employeeData.employeeName} is added successfully`)
        window.location.href = '/admin'
        console.log(response)
      })
      .catch((error)=>
      {
        if (error.response.status === 401) {
          alert('Unauthorized access: Please log in.');
          window.location.href='/'
        }
        if(error.response)
        {
          alert(`Status ${error.response.status} - ${error.response.message}`)
        }
        console.log(error)
      })
    };
  
    const { employeeID,employeeName,role,grade,basicPay} = employeeData;
  return (
    <form className="form-container" onSubmit={formSubmitHandler}>
      <h2>Add New Employee</h2>

      <div className='form-group'>
        <label>Employee ID</label>
        <input
          type='text'
          placeholder='Enter the Employee ID'
          value={employeeID}
          onChange={handleEmployeeID}
          required
        />
      </div>

      <div className='form-group'>
        <label>Employee Name</label>
        <input
          type='text'
          placeholder='Enter the Employee name'
          value={employeeName}
          onChange={handleEmployeeName}
          required
        />
      </div>

      <div className='form-group'>
        <label>role </label>
        <input
          type='text'
          className='form-control'
          placeholder='Enter the role'
          value={role}
          onChange={handleRole}
          required
        />
      </div>

      <div className='form-group'>
        <label>Grade</label>
        <input
          type='Number'
          placeholder='Enter the grade'
          value={grade}
          onChange={handleGrade}
          required
        />
      </div>

      <div className='form-group'>
        <label>Basic Pay</label>
        <input
          type='Number'
          className='form-control'
          placeholder='Enter the basic pay'
          value={basicPay}
          onChange={handleBasicPay}
          required
        />
      </div>

      <div>
        <button type='submit'>Add</button>
      </div>
    </form>
  )
}

export default AddEmployeeDataComponent