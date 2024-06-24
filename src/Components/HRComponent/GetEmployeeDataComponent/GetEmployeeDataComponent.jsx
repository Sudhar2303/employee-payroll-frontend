import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './GetEmployeeDataComponent.css'
import UserDialog from './UserDialog'

const GetEmployeeDataComponent = () => {
  const [EmployeeData,setEmployeeData] = useState([])
  const [selectedUser, setSelectedUser] = useState(null);

  const handleOpenDialog = (user) => {
    setSelectedUser(user)
    console.log(user);
  };

  const handleCloseDialog = () => {
    setSelectedUser(null);
  };
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
            alert('Unauthorized access: Please log in.');
            window.location.href='/'
          }
        })
    },[])
    
  return (
    <div className="user-list">
      {EmployeeData && EmployeeData.map((iterator)=>(
        <div className="user-card" key={iterator._id}>
            <h3 className="status">Employee Name : {iterator.employeeName}</h3>
            <p className="status">Role : {iterator.role}</p>
            <p className="status">BasicPay : {iterator.basicPay}</p>
            <p className="status">Grade : {iterator.grade}</p>
            <div className='button'>
              <button onClick={() => handleOpenDialog(iterator)}>Add Attended Days</button>
            </div>
        </div>
      ))}
      {selectedUser && (
        <UserDialog user={selectedUser} onClose={handleCloseDialog} />
      )}

    </div>
  )
}

export default GetEmployeeDataComponent