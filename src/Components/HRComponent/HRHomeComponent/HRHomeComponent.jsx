import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie,Bar} from 'react-chartjs-2';
import {Chart as ChartJS,ArcElement,Tooltip,Legend,CategoryScale, LinearScale,BarElement,} from 'chart.js';
import '../HRComponent.css'
import {toast } from 'react-toastify';
import DepartmentEmployeeBarChart from '../../AdminComponent/AdminHomeComponent/BarChartComponent/BarChartComponent';
import TableRowComponent from '../../AdminComponent/AdminHomeComponent/TableRowComponent/TableRowComponent';
import CardContainerComponent from '../../AdminComponent/AdminHomeComponent/CardContainerComponent/CardContainerComponent';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const HRHomeComponent = () =>
{
    const [departmentCounts,setDepartmentCounts] = useState([])
    const [employeeData,setEmployeeData] = useState([])
    const [departmentData,setDepatmentData] = useState([])
    const [employeeCount ,setEmployeeCount] = useState([]);
    const [onlineCount, setOnlineCount] = useState();
    const [offlineCount, setOfflineCount] = useState();

    const data = {
        labels: ['Online', 'Offline'],
        datasets: [
          {
            data: [onlineCount, offlineCount],
            backgroundColor: ['#2196F3', '#FF6384'],
            hoverBackgroundColor: ['#2196F3', '#FF6384'],
            borderWidth :2,
            borderColor: ['black']
          },
        ],
    };

    const departmentLabels = departmentData.map(item => item.role);
    const onlineCounts = departmentData.map(item => item.onlineCount);
    const offlineCounts = departmentData.map(item => item.offlineCount);
  
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
        }
        },
    };
    useEffect(() => {
        const getCount = () =>
        {
            axios.get('https://employee-payroll-backend.vercel.app/api/v1/hr/getDepartmentViceCount', { withCredentials: true })
            .then((response) => 
            {
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
            axios.get('https://employee-payroll-backend.vercel.app/api/v1/hr/getEmployee', { withCredentials: true })
            .then((response) => {
                setEmployeeData(response.data)
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
        getData();

        const getAttendenceStatus =()=>
        {
            axios.get('https://employee-payroll-backend.vercel.app/api/v1/hr/getAttendenceStatus', { withCredentials: true })
            .then((response)=>
            {
                setDepatmentData(response.data.departmentCount)
                setOfflineCount(response.data.totalCount[0].count)
                setOnlineCount(response.data.totalCount[1].count)
            })
        }
        getAttendenceStatus();

        const getEmployeeCount = () =>
            {
              axios.get('https://employee-payroll-backend.vercel.app/api/v1/hr/employeeCount', { withCredentials: true })
              .then((response) => 
              {
                const formatted = [
                  {_id: "01", heading: "Total Employees", value: response.data.totalEmployees },
                  {_id: "02",heading: "Male Employees", value: response.data.genderCount.find(g => g._id === "male").count },
                  {_id: "03",heading: "Female Employees", value: response.data.genderCount.find(g => g._id === "female").count },
                  {_id: "04", heading: "Trainee Employees", value: response.data.traineeCount }
                ];
                  setEmployeeCount(formatted);
              })
              .catch((error)=>
              {
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
              })
            }
            getEmployeeCount();
        }, []);
    return (
        <React.Fragment>
            <div className='hr-home-component'>
                <div className='first-row'>
                    <div className='bar-graph'>
                        <DepartmentEmployeeBarChart data ={departmentCounts} charTitle="Department-wise Employee count"/>
                    </div>
                    <div className='comparison-chart'>
                        <p>Department-wise Comparison</p>
                        <Bar data={departmentChartData} options={options} />
                    </div>
                </div>
                <div className='pie-chart'>
                    <p>Employee Availability</p>
                    <Pie data={data} options={options} />
                </div>
                <div className="home-account-details">
                    <CardContainerComponent data = {employeeCount}/>
                </div>
                <div className='hr-table'>
                    <div className="employee-data-grid">
                        <div className="header">
                            <div className="header-item">Employee ID</div>
                            <div className="header-item">Employee Name</div>
                            <div className="header-item">Role</div>
                            <div className="header-item">Basic Pay</div>
                            <div className="header-item">Grade</div>
                            <div className="header-item">salary</div>
                            <div className="header-item">salary</div>
                        </div>
                        <TableRowComponent EmployeeData={employeeData}/>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default HRHomeComponent