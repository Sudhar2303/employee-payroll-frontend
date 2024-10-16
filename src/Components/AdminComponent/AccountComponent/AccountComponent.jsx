import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import './AccountComponent.css';
import TableRowComponent from '../AdminHomeComponent/TableRowComponent/TableRowComponent';
import CardContainerComponent from '../AdminHomeComponent/CardContainerComponent/CardContainerComponent';

const AccountComponent = () => {
  const navigate = useNavigate();
  const paymentData = [
    {
      _id: 1,                          // Unique ID for each object
      heading: "Total Balance",
      value: 9876,
      isCurrency: true
    },
    {
      _id: 2,
      heading: "Salary Disbursed",
      value: 9876,
      isCurrency: true
    },
    {
      _id: 3,
      heading: "Outstanding Amount",
      value: 9876,
      isCurrency: true
    },
    {
      _id: 4,
      heading: "Amount to be Credited",
      value: 5000,
      isCurrency: true
    }
  ];

  const [EmployeeData,setEmployeeData] = useState([])
  const handlePayment = () =>
  {
    
  }
  useEffect(() => {
      
      axios.get('https://employee-payroll-backend.vercel.app/api/v1/admin/getEmployee', { withCredentials: true })
      .then((response) => {
          setEmployeeData(response.data);
      })
      .catch((error) => {
          console.log(error.message);
          navigate('/');
          toast.error('Authentication failed: Login again', {
          position: "bottom-right",
          autoClose: 3000,
          });
      });
    }, []);

  return (
    <React.Fragment>
      <div className='account-component'>
        <div className="account-details">
            <CardContainerComponent data = {paymentData}/>
        </div>
      <div className="employee-data-grid">
          <div className="header">
              <div className="header-item">Employee ID</div>
              <div className="header-item">Employee Name</div>
              <div className="header-item">Role</div>
              <div className="header-item">Basic Pay</div>
              <div className="header-item">Grade</div>
              <div className="header-item">salary</div>
              <div className="header-item">TotalWorkingHours</div>
          </div>
          <TableRowComponent EmployeeData={EmployeeData} actionType="payment" onAction={handlePayment}/>
        </div>
      </div>
    </React.Fragment>
  )
}

export default AccountComponent