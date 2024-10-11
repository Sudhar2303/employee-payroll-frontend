import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie,Bar} from 'react-chartjs-2';
import {Chart as ChartJS,ArcElement,Tooltip,Legend,CategoryScale, LinearScale,BarElement,} from 'chart.js';
import '../HRComponent.css'
import DepartmentEmployeeBarChart from '../../AdminComponent/AdminHomeComponent/BarChartComponent/BarChartComponent';
import TableRowComponent from '../../AdminComponent/AdminHomeComponent/TableRowComponent/TableRowComponent';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const HRHomeComponent = () =>
{
    const departmentCounts = 
    {    
        "Developer": 100,
        "HR": 500,
        "Manager": 300,
        "Accountant": 700
    };
    const sampleDepartmentData = 
    [
        { department: 'HR', online: 10, offline: 5 },
        { department: 'IT', online: 15, offline: 3 },
        { department: 'Sales', online: 8, offline: 7 },
        { department: 'Marketing', online: 12, offline: 4 },
        { department: 'Finance', online: 6, offline: 6 },
    ];

    const [onlineCount, setOnlineCount] = useState(3);
    const [offlineCount, setOfflineCount] = useState(1);
    const [EmployeeData,setEmployeeData] = useState([]);
    const data = {
        labels: ['Online', 'Offline'],
        datasets: [
          {
            data: [onlineCount, offlineCount],
            backgroundColor: ['#2196F3', '#FF6384'],
            hoverBackgroundColor: ['#2196F3', '#FF6384'],
            borderWidth:1,
          },
        ],
    };

    const departmentLabels = sampleDepartmentData.map(item => item.department);
    const onlineCounts = sampleDepartmentData.map(item => item.online);
    const offlineCounts = sampleDepartmentData.map(item => item.offline);
  
    const departmentChartData = {
        labels: departmentLabels,
        datasets: [
            {
            label: 'Online',
            data: onlineCounts,
            backgroundColor: '#2196F3',
            },
            {
            label: 'Offline',
            data: offlineCounts,
            backgroundColor: '#FF6384',
            },
        ],
        };
  
    const options = {
        responsive: true,
        tooltips: {
            enabled: true,  
          },
        plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            enabled: true,
        },
        },
    };
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
            <div className='hr-home-component'>
                <div className='first-row'>
                    <div className='bar-graph'>
                        <DepartmentEmployeeBarChart data ={departmentCounts} charTitle="Department-wise Employee count"/>
                    </div>
                    <div className='comparison-chart'>
                        <h3>Department-wise Comparison</h3>
                        <Bar data={departmentChartData} options={options} />
                    </div>
                </div>
                <div className='pie-chart'>
                    <p>Employee Availability</p>
                    <Pie data={data} options={options} />
                </div>
                <div className='hr-table'>
                    <div className="employee-data-grid">
                        <div className="header">
                            <div className="header-item">Employee ID</div>
                            <div className="header-item">Employee Name</div>
                            <div className="header-item">Role</div>
                            <div className="header-item">Basic Pay</div>
                            <div className="header-item">Grade</div>
                        </div>
                        <TableRowComponent EmployeeData={EmployeeData}/>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default HRHomeComponent