import React, { useState } from 'react';
import './EditEmployeeDetails.css';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {toast } from 'react-toastify';

const EditEmployeeDetailsComponent = ({ employee, setShowUpdateComponent, isAdmin }) => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    employeeID: employee.employeeID.employeeID,
    employeeName: employee.employeeID.employeeName,
    role: employee.employeeID.role,
    gradeNo: employee.gradeNo.gradeNo,
    basicPay: employee.basicPay,
  });
  
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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

  const handleBackClick = () => {
    setShowUpdateComponent(false);
  };
  const role = (isAdmin) ? 'admin' : 'hr'

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const isUnchanged =
    formData.employeeID === employee.employeeID.employeeID &&
    formData.employeeName === employee.employeeID.employeeName &&
    formData.role === employee.employeeID.role &&
    formData.gradeNo === employee.gradeNo.gradeNo &&
    formData.basicPay === employee.basicPay;

  if (isUnchanged) {
    toast.error("No changes made to update", {
      position: "bottom-right",
      autoClose: 3000,
    });
    return;
  }
    const validationErrors = {};
    
    if (Object.keys(validationErrors).length === 0) {
      const updatedData = {
        _id : employee._id,
        employeeID: {
          _id : employee.employeeID._id,
          employeeID: formData.employeeID,
          employeeName: formData.employeeName,
          role: formData.role,
          gender : employee.employeeID.gender,
          emailID : employee.employeeID.emailID
        },
        gradeNo: {
          _id:employee.gradeNo._id,
          gradeNo: formData.gradeNo,
        },
        basicPay: formData.basicPay,
        totalWorkingHours : employee.totalWorkingHours,
        salary: employee.salary
      };
      axios.post(`https://employee-payroll-backend.vercel.app/api/v1/${role}/updateEmployeeData`, updatedData, { withCredentials: true })
      .then((response) => {
        console.log(response)
        setShowUpdateComponent(false);
        toast.success(`Employee details updated successfully`, {
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
    else {
      setErrors(validationErrors); 
    }
  };

  const deleteEmployee = () => {
    axios.delete(`https://employee-payroll-backend.vercel.app/api/v1/admin/deleteEmployeeData`, {
      data: {_id : employee._id,employeeID : employee.employeeID._id},
      withCredentials: true,
    })
      .then((response) => {
        setShowUpdateComponent(false);
        toast.success(`Employee data deleted successfully`, {
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
  };

  return (
    <div className="edit-details-container">
      <div className='back-arrow' onClick={handleBackClick}>
        <AiOutlineArrowLeft />
      </div>
      <form className="form-container" onSubmit={formSubmitHandler}>
        <div className='form-group'>
          <div className='form-title'>
            <p>Employee ID</p>
          </div>
          <input
            className='form-field'
            type="text"
            name="employeeID"
            value={formData.employeeID}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.employeeID && <p className="form-error-message">{errors.employeeID}</p>}
        </div>

        <div className='form-group'>
          <div className='form-title'>
            <p>Employee Name</p>
          </div>
          <input
            className='form-field'
            type="text"
            name="employeeName"
            value={formData.employeeName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.employeeName && <p className="form-error-message">{errors.employeeName}</p>}
        </div>

        <div className='form-group'>
          <div className='form-title'>
            <p>Role</p>
          </div>
          <input
            className='form-field'
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.role && <p className="form-error-message">{errors.role}</p>}
        </div>

        <div className='form-group'>
          <div className='form-title'>
            <p>Grade No</p>
          </div>
          <input
            className='form-field'
            type="number"
            name="gradeNo"
            value={formData.gradeNo}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.gradeNo && <p className="form-error-message">{errors.gradeNo}</p>}
        </div>

        <div className='form-group'>
          <div className='form-title'>
            <p>Basic Pay</p>
          </div>
          <input
            className='form-field'
            type="number"
            name="basicPay"
            value={formData.basicPay}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.basicPay && <p className="form-error-message">{errors.basicPay}</p>}
        </div>

        <div className="button-container">
          <button className="submit-button" type="submit">Update</button>
        </div>
      </form>

      {isAdmin && (
        <div className="delete-section">
          <p className="disclaimer">
            <strong>Disclaimer:</strong> Deleting this account is irreversible. Please proceed with caution.
          </p>
          <button className="submit-button" onClick={deleteEmployee}>Delete Account</button>
        </div>
      )}
    </div>
  );
};

export default EditEmployeeDetailsComponent;
