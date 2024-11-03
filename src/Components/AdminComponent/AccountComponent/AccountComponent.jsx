import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import {toast } from 'react-toastify';
import './AccountComponent.css';
import TableRowComponent from '../AdminHomeComponent/TableRowComponent/TableRowComponent';
import CardContainerComponent from '../AdminHomeComponent/CardContainerComponent/CardContainerComponent';
import DepartmentEmployeeBarChart from '../AdminHomeComponent/BarChartComponent/BarChartComponent'
const AccountComponent = ({isAdmin}) => {
  const navigate = useNavigate();
  const [isLoading,setIsLoading] = useState(true)
  const [paymentData,setPaymentData] = useState([])
  const [isLoadingCard, setIsLoadingCard] = useState(true)
  const [EmployeeData,setEmployeeData] = useState([])
  const [salaryStatusCount ,setSalaryStatusCount] = useState([])
  const[reload,setReload] = useState(false)

  const role = (isAdmin) ? 'admin' : 'hr' 

  const handlePayment = (employeeData) =>
  {
    console.log(employeeData)
      axios.post(`https://employee-payroll-backend.vercel.app/api/v1/${role}/updateSalaryStatus`,{employeeID : employeeData.employeeID._id},{ withCredentials : true })
      .then((response)=>
      {
        setReload(true)
        toast.success('Payment Successfull',{
          position: "bottom-right",
          autoClose: 3000
        })
      })
      .catch((error) =>
      {
        toast.success(error.response.data.message,{
          position: "bottom-right",
          autoClose: 3000
        })
      })
  }

  const getSalaryStatusCount = () =>
  {
    axios.get(`https://employee-payroll-backend.vercel.app/api/v1/${role}/countSalaryStatus`,{withCredentials : true})
    .then((response) =>
    {
      setSalaryStatusCount(response.data)
    })
    .catch((error)=>
    {
      toast.success(error.response.data.message,{
        position: "bottom-right",
        autoClose: 3000
      })
    })

  }

  const gettotalSalary = () =>
  {
      axios.get(`https://employee-payroll-backend.vercel.app/api/v1/${role}/totalSalary`,{withCredentials : true})
      .then((response)=>{
          const formatted = [
              {_id: "01", heading: "Salary Disbursed", value: response.data.totalSalary.find(i => i.salaryStatus == "paid").totalSalary.toFixed(2) , isCurrency : true},
              {_id: "02",heading: "Outstanding Amount",value: response.data.totalSalary.find(i => i.salaryStatus == "pending").totalSalary.toFixed(2), isCurrency : true}
            ];
          setPaymentData(formatted)
          setIsLoadingCard(false)
      })
  }

  useEffect(() => 
    {
      axios.get(`https://employee-payroll-backend.vercel.app/api/v1/${role}/getEmployee`, { withCredentials: true })
      .then((response) => {
          setEmployeeData(response.data);
          setIsLoading(false)
      })
      .catch((error) => {
        if(error.response.status == 401)
          {
            setTimeout(() => {
              navigate('/');
            }, 2000);
            toast.error('Authentication failed: Login again', {
              position: "bottom-right",
              autoClose: 3000,
            });
          }
          else
          {
            toast.error(error.response.data.message,
            {
              position: "bottom-right",
              autoClose: 3000,
            });
          }
          setIsLoading(false)
      });
      gettotalSalary()
      getSalaryStatusCount()
    }, [reload]);

  return (
    <React.Fragment>
      <div className='account-component'>
        <div className='first-row'>
            <div className='bar-graph'>
                <DepartmentEmployeeBarChart data ={salaryStatusCount} charTitle="Payment Status"/>
            </div>
            <div className="home-account-details">
                <CardContainerComponent data = {paymentData} isLoading={isLoadingCard} />
            </div>
        </div>
      <div className="employee-data-grid">
          <div className="header">
              <div className="header-item">Employee ID</div>
              <div className="header-item">Employee Name</div>
              <div className="header-item">Role</div>
              <div className="header-item">Basic Pay</div>
              <div className="header-item">Payment Status</div>
              <div className="header-item">TotalWorkingHours</div>
              <div className="header-item">salary</div>
          </div>
          <TableRowComponent EmployeeData={EmployeeData} actionType="payment" onAction={handlePayment} isLoading={isLoading}/>
        </div>
      </div>
    </React.Fragment>
  )
}

export default AccountComponent