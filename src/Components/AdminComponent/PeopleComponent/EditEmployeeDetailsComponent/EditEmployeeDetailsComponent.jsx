import React, { useState } from 'react';
import './EditEmployeeDetails.css';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

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
    if (!value) {
      newErrors[fieldName] = `Please enter ${fieldName.replace(/([A-Z])/g, ' $1').toLowerCase()}`;
    } else {
      delete newErrors[fieldName];
    }
    setErrors(newErrors);
  };

  const handleBlur = (event) => {
    validateField(event.target.name, event.target.value);
  };

  const handleBackClick = () => {
    setShowUpdateComponent(false);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

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
      if(isAdmin)
      {
        console.log(updatedData)
          axios.post(`https://employee-payroll-backend.vercel.app/api/v1/admin/updateEmployeeData`, updatedData, { withCredentials: true })
          .then((response) => {
            setShowUpdateComponent(false);
            toast.success(`Employee details updated successfully`, {
              position: "bottom-right",
              autoClose: 3000,
            });
          })
          .catch((error) => {
            toast.error(error.message, {
              position: "bottom-right",
              autoClose: 3000,
            });
          });
      }
      else
      {
        axios.post(`https://employee-payroll-backend.vercel.app/api/v1/hr/updateEmployeeData`, updatedData, { withCredentials: true })
          .then((response) => {
            setShowUpdateComponent(false);
            toast.success(`Employee details updated successfully`, {
              position: "bottom-right",
              autoClose: 3000,
            });
          })
          .catch((error) => {
            toast.error(error.message, {
              position: "bottom-right",
              autoClose: 3000,
            });
          });
      }
    } 
    else {
      setErrors(validationErrors); 
    }
  };

  const deleteEmployee = () => {
    console.log(employee._id, employee.employeeID._id)
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
        toast.error(error.message, {
          position: "bottom-right",
          autoClose: 3000,
        });
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
