import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './AddEmployeeDataComponent.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
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
    emailID: ''  // Added emailID field
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

    if (fieldName === 'gender' && !value) {
      newErrors.gender = 'Please enter the Gender';
    } else if (fieldName === 'gender') {
      delete newErrors.gender;
    }

    if (fieldName === 'emailID' && !value) {
      newErrors.emailID = 'Please enter the Email ID';
    } else if (fieldName === 'emailID') {
      delete newErrors.emailID;
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

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const validationErrors = {};

    if (Object.keys(validationErrors).length === 0) {
      const formattedData = {
        employeeID: {
          employeeID: employeeData.employeeID,
          employeeName: employeeData.employeeName,
          role: employeeData.role,
          emailID: employeeData.emailID
        },
        gradeNo: {
          gradeNo: parseInt(employeeData.grade)
        },
        basicPay: parseFloat(employeeData.basicPay),
        salary: 0,  
        totalWorkingHours: 0  
      };
      if(isAdmin)
      {
          axios.post(`https://employee-payroll-backend.vercel.app/api/v1/admin/addEmployee`, formattedData, { withCredentials: true })
          .then((response) => {
            setShowAddEmployeeForm(false);
            toast.success(`New Employee Added Successfully`, {
              position: "bottom-right",
              autoClose: 3000,
            });
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
      }
      else
      {
        console.log(formattedData)
        axios.post(`https://employee-payroll-backend.vercel.app/api/v1/hr/addEmployee`, formattedData, { withCredentials: true })
        .then((response) => {
          setShowAddEmployeeForm(false);
          toast.success(`New Employee Added Successfully`, {
            position: "bottom-right",
            autoClose: 3000,
          });
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
      }
      
    } else {
      setErrors(validationErrors); // Ensure the errors state is updated if there are errors.
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
                <option value='Designer'>Designer</option>
                <option value='Developer'>Developer</option>
                <option value='Manager'>Manager</option>
                <option value='Tester'>Tester</option>
              </select>
            </div>
            
            <div className='form-group'>
              <div className='form-title'>
                <p>Email ID</p>  {/* Added Email ID field */}
              </div>
              {errors.emailID && <div className='form-error-message'>
                <p>{errors.emailID}</p>
              </div>}
              <input
                className='form-field'
                type='email'
                placeholder='Enter Email ID'
                name='emailID'
                value={emailID}
                onChange={handleChange}
                onBlur={handleBlur}
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
                placeholder='Enter the Basic Pay'
                name='basicPay'
                value={basicPay}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>

            <div className='form-button'>
              <button type='submit' className='submit-button'>
                Submit
              </button>
            </div>
          </form>
          <ToastContainer />
        </div>
    </React.Fragment>
  );
};

export default AddEmployeeDataComponent;
