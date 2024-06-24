import axios from 'axios'
import React, { useState } from 'react'


const AddWorkingDaysComponent = () => {
  const [employeeData,setEmployeeData] = useState({
    employeeID : '',
    month : '',
    workingDays : ''
  })

  const handleEmployeeID = (event)=>
  {
    setEmployeeData({
      ...employeeData,
      employeeID: event.target.value,
    })
  }

  const handleMonth = (event)=>
  {
    setEmployeeData({
      ...employeeData,
      month: event.target.value,
    })
  }

  const handleWorkingDays = (event)=>
  {
    setEmployeeData({
      ...employeeData,
      workingDays: event.target.value,
    })
  }

  const formSubmitHandler = (event) => {
    event.preventDefault()
    axios.post(`http://localhost:3500/api/v1/hr/updateAttendence`,employeeData,{ withCredentials: true })
    .then((response)=>
      {
        alert(`${employeeData.employeeID} is added successfully`)
        window.location.href = '/hr'
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
  
    const {employeeID,month,workingDays} = employeeData;
  return (
    <form className="form-container" onSubmit={formSubmitHandler}>
      <h2>New / Update WorkingDays</h2>

      <div className='form-group'>
        <label>Employee ID : </label>
        <input
          type='text'
          placeholder='Enter the Employee ID'
          value={employeeID}
          onChange={handleEmployeeID}
          required
        />
      </div>

      <div className='form-group'>
        <label>Month : </label>
        <input
          type='text'
          placeholder='Enter the Month'
          value={month}
          onChange={handleMonth}
          required
        />
      </div>

      <div className='form-group'>
        <label>Workingdays : </label>
        <input
          type='text'
          className='form-control'
          placeholder='Enter the workingDays'
          value={workingDays}
          onChange={handleWorkingDays}
          required
        />
      </div>

      <div>
        <button type='submit'>Add</button>
      </div>
    </form>
  )
}

export default AddWorkingDaysComponent