import React, { useEffect, useState } from 'react';
import './EditEmployeeDetails.css';
import { AiOutlineArrowLeft } from 'react-icons/ai';

const EditEmployeeDetailsComponent = ({ employee, setShowUpdateComponent, onDelete, onUpdate }) => {
  const [formData, setFormData] = useState({ ...employee });
  const [errors, setErrors] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = {};
    Object.keys(formData).forEach((key) => {
      validateField(key, formData[key]);
      if (errors[key]) {
        validationErrors[key] = errors[key];
      }
    });

    if (Object.keys(validationErrors).length === 0) {
      onUpdate(formData);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="edit-details-container">
      <div className='back-arrow' onClick={handleBackClick}>
        <AiOutlineArrowLeft />
      </div>
        <form className="form-container" onSubmit={handleSubmit}>
          <div className='form-header'>
            <h2>Edit Employee Details</h2>
          </div>
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
              <p>Grade</p>
            </div>
            <input
              className='form-field'
              type="text"
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.grade && <p className="form-error-message">{errors.grade}</p>}
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
            { isAdmin && (
            <div className="delete-section">
              <p className="disclaimer">
                <strong>Disclaimer:</strong> Deleting this account is irreversible. Please proceed with caution.
              </p>
              <button className="submit-button" onClick={onDelete}>Delete Account</button>
            </div>
            )
        }
    </div>
  );
};

export default EditEmployeeDetailsComponent;
