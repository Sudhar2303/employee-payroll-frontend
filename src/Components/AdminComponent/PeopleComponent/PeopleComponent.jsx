import  React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import TableRowComponent from '../AdminHomeComponent/TableRowComponent/TableRowComponent';
import CardContainerComponent from '../AdminHomeComponent/CardContainerComponent/CardContainerComponent';
import './PeopleComponent.css'
import {toast } from 'react-toastify';
import AddEmployeeDataComponent from './AddEmployeeDataComponent/AddEmployeeDataComponent';
import EditEmployeeDetailsComponent from './EditEmployeeDetailsComponent/EditEmployeeDetailsComponent';

const PeopleComponent = ({isAdmin}) => 
{
    const navigate = useNavigate();
    const [EmployeeData,setEmployeeData] = useState([]);
    const [showAddEmployeeForm, setShowAddEmployeeForm] = useState(false);
    const [showUpdateComponent,setShowUpdateComponent] = useState(false);
    const [selectedEmployeeData,setSelectedEmployeeData] = useState([]);
    const [employeeCount ,setEmployeeCount] = useState([]);
    const handleAddEmployeeClick = () =>
    {
      setShowAddEmployeeForm(true);
    };
    const handleEditEmployee = (employeeID) =>
    {
      console.log(employeeID)
      setShowUpdateComponent(true);
      setSelectedEmployeeData(employeeID);
    }
    const role = (isAdmin) ? 'admin' : 'hr'
    useEffect(() => {
       const getData = () =>{  
        axios.get(`https://employee-payroll-backend.vercel.app/api/v1/${role}/getEmployee`, { withCredentials: true })
        .then((response) => {
            setEmployeeData(response.data);
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

      const getEmployeeCount = () =>
      {
        axios.get(`https://employee-payroll-backend.vercel.app/api/v1/${role}/employeeCount`, { withCredentials: true })
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
            toast.error(error.message, {
            position: "bottom-right",
            autoClose: 3000,
            });
        })
      }
      getEmployeeCount();
      }, [showAddEmployeeForm, showUpdateComponent]);

    return (
        <React.Fragment >
              {showAddEmployeeForm ? (
                  <AddEmployeeDataComponent setShowAddEmployeeForm={setShowAddEmployeeForm} isAdmin={isAdmin} />
               ) : ( showUpdateComponent ? ( 
                  <EditEmployeeDetailsComponent employee={selectedEmployeeData} setShowUpdateComponent={setShowUpdateComponent} isAdmin={isAdmin}/> 
                ) : (
            <div className="people-container">
                <div className='add-employee-container' onClick={handleAddEmployeeClick}>
                    <button className='submit-button'>Add New Employee</button>
                </div>
                <div className="people-details">
                    <CardContainerComponent data = {employeeCount}/>
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
                    <TableRowComponent EmployeeData={EmployeeData} actionType="edit" onAction={handleEditEmployee}/>
                </div>
            </div>
           
          ))}
        </React.Fragment>
    )
}

export default PeopleComponent