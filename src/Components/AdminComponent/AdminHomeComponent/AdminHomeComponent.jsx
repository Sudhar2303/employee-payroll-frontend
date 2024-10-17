import React, { useEffect, useRef, useState } from 'react'
import DepartmentEmployeeBarChart from './BarChartComponent/BarChartComponent'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import {toast } from 'react-toastify';
import TableRowComponent from './TableRowComponent/TableRowComponent';
import CardContainerComponent from './CardContainerComponent/CardContainerComponent';
const AdminHomeComponent = () => 
{
    const [departmentCounts,setDepartmentCounts] = useState([])
    const [employeeData,setEmployeeData] = useState([])
    const paymentData = [
        {
            _id: 1,                         
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
    const navigate = useNavigate();

    useEffect(() => {
    
        const getCount = () =>
        {
            axios.get('https://employee-payroll-backend.vercel.app/api/v1/admin/getDepartmentViceCount', { withCredentials: true })
            .then((response) => {
                setDepartmentCounts(response.data)
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
            });
        }
        getCount();

        const getData = () =>
        {
            axios.get('https://employee-payroll-backend.vercel.app/api/v1/admin/getEmployee', { withCredentials: true })
            .then((response) => {
                setEmployeeData(response.data)
            })
            .catch((error) => {
                if(error.response.status == 401)
                {
                    navigate('/');
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
            });
        }
        getData();
      }, []);

    return (
        <React.Fragment>
            <div className='home-container'>
                <div className='bar-graph'>
                    <DepartmentEmployeeBarChart data ={departmentCounts} charTitle="Department-wise Employee count"/>
                </div>
                <div className="home-account-details">
                    <CardContainerComponent data = {paymentData}/>
                </div>
                <div className="employee-data-grid">
                    <div className="header">
                        <div className="header-item">Employee ID</div>
                        <div className="header-item">Employee Name</div>
                        <div className="header-item">Role</div>
                        <div className="header-item">Basic Pay</div>
                        <div className="header-item">Grade</div>
                        <div className="header-item">TotalWorkingHours</div>
                        <div className="header-item">salary</div>
                        
                    </div>
                    <TableRowComponent EmployeeData={employeeData}/>
                </div>
            </div>
        </React.Fragment>
    )
}

export default AdminHomeComponent