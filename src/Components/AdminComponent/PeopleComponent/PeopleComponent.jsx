import  React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import TableRowComponent from '../AdminHomeComponent/TableRowComponent/TableRowComponent';
import CardContainerComponent from '../AdminHomeComponent/CardContainerComponent/CardContainerComponent';
import './PeopleComponent.css'
import AddEmployeeDataComponent from './AddEmployeeDataComponent/AddEmployeeDataComponent';
import EditEmployeeDetailsComponent from './EditEmployeeDetailsComponent/EditEmployeeDetailsComponent';

const PeopleComponent = () => 
{
    const navigate = useNavigate();
    const [EmployeeData,setEmployeeData] = useState([]);
    const [showAddEmployeeForm, setShowAddEmployeeForm] = useState(false);
    const [showUpdateComponent,setShowUpdateComponent] = useState(false);
    const [selectedEmployeeData,setSelectedEmployeeData] = useState([]);
    const employeeStatistics = [
      {
        _id: 1,                           // Unique ID for each object
        heading: "Total Employees",
        value: 1500
      },
      {
        _id: 2,
        heading: "Trainee Employees",
        value: 450
      },
      {
        _id: 3,
        heading: "Male Employees",
        value: 900
      },
      {
        _id: 4,
        heading: "Female Employees",
        value: 600
      }
    ];
    const handleAddEmployeeClick = () => {
        setShowAddEmployeeForm(true);
      };
      const handleEditEmployee = (employeeID) =>
      {
        setShowUpdateComponent(true);
        setSelectedEmployeeData(employeeID);
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
        <React.Fragment >
              {showAddEmployeeForm ? (
                  <AddEmployeeDataComponent setShowAddEmployeeForm={setShowAddEmployeeForm}/>
               ) : ( showUpdateComponent ? ( 
                  <EditEmployeeDetailsComponent employee={selectedEmployeeData} setShowUpdateComponent={setShowUpdateComponent}/> 
                ) : (
            <div className="people-container">
                <div className='add-employee-container' onClick={handleAddEmployeeClick}>
                    <button className='submit-button'>Add New Employee</button>
                </div>
                <div className="people-details">
                    <CardContainerComponent data = {employeeStatistics}/>
                </div>
                <div className="employee-data-grid">
                    <div className="header">
                        <div className="header-item">Employee ID</div>
                        <div className="header-item">Employee Name</div>
                        <div className="header-item">Role</div>
                        <div className="header-item">Basic Pay</div>
                        <div className="header-item">Grade</div>
                    </div>
                    <TableRowComponent EmployeeData={EmployeeData} actionType="edit" onAction={handleEditEmployee}/>
                </div>
            </div>
           
          ))}
        </React.Fragment>
    )
}

export default PeopleComponent