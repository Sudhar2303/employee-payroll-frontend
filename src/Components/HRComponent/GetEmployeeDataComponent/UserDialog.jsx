import React, { useState } from 'react';
import axios from 'axios';
import './UserDialog.css'
const UserDialog = ({ user, onClose }) => {
  const [month, setMonth] = useState('');
  const [workingDays, setWorkingDays] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      employeeID: user._id,
      month,
      workingDays,
    };

    try {
      const response = await axios.post('https://employee-payroll-backend.vercel.app/api/v1/hr/updateAttendence', data,{ withCredentials: true }); // Replace with your actual API endpoint
      console.log(response.data)
      onClose();
      window.location.href='/hr'
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return  (
    <div className="dialog">
      <div className="dialog-content">
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2>Add Attended Days for {user.name}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Month:</label>
            <select value={month} onChange={(e) => setMonth(e.target.value)} required>
              <option value="">Select Month</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
          </div>
          <div className="form-group">
            <label>Working Days:</label>
            <input
              type="number"
              value={workingDays}
              onChange={(e) => setWorkingDays(e.target.value)}
              required
            />
          </div>
          <div className="form-buttons">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserDialog;
