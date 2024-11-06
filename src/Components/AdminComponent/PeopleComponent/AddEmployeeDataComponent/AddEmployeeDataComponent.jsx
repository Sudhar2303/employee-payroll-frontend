import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './AddEmployeeDataComponent.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AiOutlineArrowLeft } from 'react-icons/ai';

const AddEmployeeDataComponent = ({setShowAddEmployeeForm, isAdmin}) => {
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState({
    employeeID: '',
    employeeName: '',
    role: '',
    grade: '',
    basicPay: '',
    gender: '',
    emailID: ''  
  });
  const [errors, setErrors] = useState({});

  const validateField = (fieldName, value) => {
    let newErrors = { ...errors };
    
    const trimmedValue = value.trim();

    if (fieldName === 'employeeID') {
        if (!trimmedValue) {
            newErrors.employeeID = 'Please enter the Employee ID';
        } else if (/\s/.test(trimmedValue)) {
            newErrors.employeeID = 'Employee ID cannot contain spaces';
        } else if (/[^a-zA-Z0-9]/.test(trimmedValue)) {
            newErrors.employeeID = 'Employee ID cannot contain special characters';
        } else {
            delete newErrors.employeeID;
        }
    }
    
    if (fieldName === 'employeeName') {
        if (!trimmedValue) {
            newErrors.employeeName = 'Please enter the Employee Name';
        } else if (/\s/.test(trimmedValue)) {
            newErrors.employeeName = 'Employee Name cannot contain spaces';
        } else if (/[^a-zA-Z\s]/.test(trimmedValue)) {
            newErrors.employeeName = 'Employee Name cannot contain special characters';
        } else {
            delete newErrors.employeeName;
        }
    }
  
    if (fieldName === 'role' && !trimmedValue) {
        newErrors.role = 'Please enter the Role';
    } else if (fieldName === 'role') {
        delete newErrors.role;
    }
  
    if (fieldName === 'grade' && !trimmedValue) {
        newErrors.grade = 'Please enter the Grade';
    } else if (fieldName === 'grade') {
        delete newErrors.grade;
    }
  
    if (fieldName === 'basicPay') {
        if (!value) {
            newErrors.basicPay = 'Please enter the Basic Pay';
        } else if (value < 0) {
            newErrors.basicPay = 'Basic Pay cannot be a negative value';
        } else {
            delete newErrors.basicPay;
        }
    }
  
    if (fieldName === 'gender' && !trimmedValue) {
        newErrors.gender = 'Please enter the Gender';
    } else if (fieldName === 'gender') {
        delete newErrors.gender;
    }
  
    if (fieldName === 'emailID') {
        if (!trimmedValue) {
            newErrors.emailID = 'Please enter the Email ID';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) {
            newErrors.emailID = 'Please enter a valid Email ID';
        } else {
            delete newErrors.emailID;
        }
    }

    setErrors(newErrors);
};

  const handleBlur = (event) => {
    validateField(event.target.name, event.target.value);
  };

  const handleChange = (event) => {
    setEmployeeData({
      ...employeeData,
      [event.target.name]: event.target.value,
    });
  };

  const handleBackClick = () => {
    setShowAddEmployeeForm(false);
  };
  const ROLE = (isAdmin) ? 'admin' : 'hr'
  const formSubmitHandler = (event) => {
    event.preventDefault();
    
    const validationErrors = {};

    if (Object.keys(validationErrors).length === 0) {
      const formattedData = {
        employeeID: {
          employeeID: employeeData.employeeID,
          employeeName: employeeData.employeeName,
          role: employeeData.role,
          emailID: employeeData.emailID,
          gender : employeeData.gender
        },
        gradeNo: {
          gradeNo: parseInt(employeeData.grade)
        },
        basicPay: parseFloat(employeeData.basicPay),
        salary: 0,  
        totalWorkingHours: 0  
      };
    
      axios.post(`https://employee-payroll-backend.vercel.app/api/v1/${ROLE}/addEmployee`, formattedData, { withCredentials: true })
      .then((response) => {
        console.log(response)
        setShowAddEmployeeForm(false);
        toast.success(`New Employee Added Successfully`, {
          position: "bottom-right",
          autoClose: 3000,
        });
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
    else 
    {
      setErrors(validationErrors);
    }
  };
  
  const { employeeID, employeeName, role, grade, basicPay, gender, emailID } = employeeData;

  return (
    <React.Fragment>
        <div className='AddEmployee-component'>
          <div className='back-arrow' onClick={handleBackClick}>
            <AiOutlineArrowLeft />
          </div>
          <form className='form-container' onSubmit={formSubmitHandler}>
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
                name='employeeID'
                value={employeeID}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off" 
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
                name='employeeName'
                value={employeeName}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off" 
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
                <option value='' className='drop-drown'>Select Role</option>
                {isAdmin &&
                  <option value='hr'  className='drop-drown'>HR</option>
                }
                <option value='designer'>Designer</option>
                <option value='developer'>Developer</option>
                <option value='manager'>Manager</option>
                <option value='tester'>Tester</option>
              </select>
            </div>
            
            <div className='form-group'>
              <div className='form-title'>
                <p>Email ID</p>  
              </div>
              {errors.emailID && <div className='form-error-message'>
                <p>{errors.emailID}</p>
              </div>}
              <input
                className='form-field'
                type='email'
                name='emailID'
                value={emailID}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off" 
              />
            </div>

            <div className='form-group'>
              <div className='form-title'>
                <p>Gender</p>
              </div>
              {errors.gender && <div className='form-error-message'>
                <p>{errors.gender}</p>
              </div>}
              <select
                className='form-field'
                name='gender'
                value={gender}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value=''>Select Gender</option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
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
                name='basicPay'
                value={basicPay}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off" 
              />
            </div>

            <div className='form-button'>
              <button type='submit' className='submit-button'>
                Submit
              </button>
            </div>
          </form>
        </div>
    </React.Fragment>
  );
};

export default AddEmployeeDataComponent;
