import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './AddEmployeeDataComponent.css'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { AiOutlineArrowLeft } from 'react-icons/ai';

const AddEmployeeDataComponent = ({setShowAddEmployeeForm}) => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [employeeData, setEmployeeData] = useState({
    employeeID: '',
    employeeName: '',
    role: '',
    grade: '',
    basicPay: ''
  });
  const [errors, setErrors] = useState({});

  const validateField = (fieldName, value) => {
    let newErrors = { ...errors };

    if (fieldName === 'employeeID' && !value) {
      newErrors.employeeID = 'Please enter the Employee ID';
    } else if (fieldName === 'employeeID') {
      delete newErrors.employeeID;
    }

    if (fieldName === 'employeeName' && !value) {
      newErrors.employeeName = 'Please enter the Employee Name';
    } else if (fieldName === 'employeeName') {
      delete newErrors.employeeName;
    }

    if (fieldName === 'role' && !value) {
      newErrors.role = 'Please enter the Role';
    } else if (fieldName === 'role') {
      delete newErrors.role;
    }

    if (fieldName === 'grade' && !value) {
      newErrors.grade = 'Please enter the Grade';
    } else if (fieldName === 'grade') {
      delete newErrors.grade;
    }

    if (fieldName === 'basicPay' && !value) {
      newErrors.basicPay = 'Please enter the Basic Pay';
    } else if (fieldName === 'basicPay') {
      delete newErrors.basicPay;
    }

    setErrors(newErrors);
  };

  const handleBlur = (event) => {
    validateField(event.target.name, event.target.value);
  };

  const handleChange = (event) => {
    console.log([event.target.name])
    setEmployeeData({
      ...employeeData,
      [event.target.name]: event.target.value,
    });
  };
  const handleBackClick = () =>
  {
    setShowAddEmployeeForm(false);
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const validationErrors = {};

    console.log(employeeData)
    if (Object.keys(validationErrors).length === 0) {
      axios.post(`https://employee-payroll-backend.vercel.app/api/v1/admin/addEmployee`, employeeData, { withCredentials: true })
        .then((response) => {
          alert(`${employeeData.employeeName} is added successfully`);
          window.location.href = '/admin';
          console.log(response);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            alert('Unauthorized access: Please log in.');
            window.location.href = '/';
          }
          if (error.response) {
            alert(`Status ${error.response.status} - ${error.response.message}`);
          }
          console.log(error);
        });
    } else {
      setErrors(validationErrors); // Ensure the errors state is updated if there are errors.
    }
  };

  useEffect(() => {
    axios
      .get(`https://employee-payroll-backend.vercel.app/api/v1/admin/authenticate`, { withCredentials: true })
      .then((response) => {
        if (response.status === 201) {
          setIsAdmin(true);
        }
      })
      .catch((error) => {
        console.log(error);
        navigate('/');
        toast.error('Authentication failed', {
          position: "bottom-right",
          autoClose: 3000,
        });
      });
  }, []);

  const { employeeID, employeeName, role, grade, basicPay } = employeeData;

  return (
    <React.Fragment>
      {isAdmin && (
        <div className='AddEmployee-component'>
          <div className='back-arrow' onClick={handleBackClick}>
            <AiOutlineArrowLeft/>
          </div>
          <form className='form-container' onSubmit={formSubmitHandler}>
            <div className='form-header'>
                <h2>Add New Employee</h2>
            </div>
            <div className='form-group'>
              <div className='form-title'>
                <p>Employee ID</p>
              </div>
              {errors.employeeID && 
                <div className='form-error-message'>
                  <p>{errors.employeeID}</p>
                </div>
              }
              <input
                className='form-field'
                type='text'
                placeholder='Enter the Employee ID'
                name='employeeID'
                value={employeeID}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              

            </div>

            <div className='form-group'>
              <div className='form-title'>
                <p>Employee Name</p>
              </div>
              {errors.employeeName && <div className='form-error-message'> 
                <p>{errors.employeeName}</p>
              </div>}
              <input
                className='form-field'
                type='text'
                placeholder='Enter the Employee name'
                name='employeeName'
                value={employeeName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              
            </div>

            <div className='form-group'>
              <div className='form-title'>
                <p>Role</p>
              </div>
              {errors.role && <div className='form-error-message'>
                <p>{errors.role}</p>
                </div>}
              <select
                  className='form-field'
                  name='role'
                  value={role}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value=''>Select Role</option>
                  <option value='hr'>HR</option>
                  <option value='designer'>Designer</option>
                  <option value='developer'>Developer</option>
                  <option value='employee'>Tester</option>

                </select>
              
            </div>

            <div className='form-group'>
              <div className='form-title'>
                <p>Grade</p>
              </div>
              {errors.grade && <div className='form-error-message'>
                <p>{errors.grade}</p>
                </div>}
              <select
                className='form-field'
                name='grade'
                value={grade}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value=''>Select Grade</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
              </select>
              
            </div>

            <div className='form-group'>
              <div className='form-title'>
                <p>Basic Pay</p>
              </div>
              {errors.basicPay && <div className='form-error-message'>
                <p>{errors.basicPay}</p>
                </div>}
              <input
                className='form-field'
                type='number'
                placeholder='Enter the basic pay'
                name='basicPay'
                value={basicPay}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              
            </div>

            <div className='form-button'>
              <button className='submit-button' type='submit'>Add Employee</button>
            </div>
          </form>
        </div>
      )}
    </React.Fragment>
  );
}

export default AddEmployeeDataComponent;