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
    const [isLoadingEmployee, setIsLoadingEmployee] = useState(true);
    const [isLoadingCard, setIsLoadingCard] = useState(true)
    const [paymentData,setPaymentData] = useState([])
    const navigate = useNavigate();
    const gettotalSalary = () =>
    {
        axios.get(`https://employee-payroll-backend.vercel.app/api/v1/admin/totalSalary`,{withCredentials : true})
        .then((response)=>{
            const formatted = [
                {_id: "01", heading: "Salary Disbursed", value: response.data.totalSalary.find(i => i.salaryStatus == "paid").totalSalary.toFixed(2) , isCurrency : true},
                {_id: "02",heading: "Outstanding Amount",value: response.data.totalSalary.find(i => i.salaryStatus == "pending").totalSalary.toFixed(2), isCurrency : true}
              ];
            setPaymentData(formatted)
            setIsLoadingCard(false)
        })
    }

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
                setIsLoadingEmployee(false);
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
                setIsLoadingEmployee(false);
            });
        }
        getData();
        gettotalSalary();
      }, []);

    return (
        <React.Fragment>
            <div className='home-container'>
                <div className='first-row'>
                    <div className='bar-graph'>
                        <DepartmentEmployeeBarChart data ={departmentCounts} charTitle="Department-wise Employee count"/>
                    </div>
                    <div className="home-account-details">
                        <CardContainerComponent data = {paymentData} isLoading={isLoadingCard}/>
                    </div>
                </div>
                <div className='scrollable-container'>
                    <div className="employee-data-grid">
                        <div className="header">
                            <div className="header-item">Employee ID</div>
                            <div className="header-item">Employee Name</div>
                            <div className="header-item">Role</div>
                            <div className="header-item">Basic Pay</div>
                            <div className="header-item">Grade</div>
                            <div className="header-item">TotalWorkingHours</div>
                            <div className="header-item">Status</div>
                        </div>
                        <TableRowComponent EmployeeData={employeeData} isLoading ={isLoadingEmployee}/>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default AdminHomeComponent