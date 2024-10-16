import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PendingRequestComponent.css'; // Import your CSS file
import { toast } from 'react-toastify';

const PendingRequestComponent = () => {
  const [requests, setRequests] = useState([]);
  
  const handleRequestAction = (requestId, action,request) => {
    const url = `https://employee-payroll-backend.vercel.app/api/v1/admin/updateStatus`;
    const updatedRequestData = { 
        ...request, 
        approvalStatus: action === 'approve' ? 'approved' : 'declined' 
    };

    axios.post(url, updatedRequestData, { withCredentials: true })
      .then((response) => {
        toast.success("The Pending Request is updated", {
            position: 'bottom-right',
            autoClose: 3000,
          });
        })
      .catch((error) => {
        toast.error(error.message, {
            position: 'bottom-right',
            autoClose: 3000,
          });
      });
  };
  // Fetch pending requests from the backend
  useEffect(() => {
    axios.get('https://employee-payroll-backend.vercel.app/api/v1/admin/pendingRequest', { withCredentials: true })
      .then(response => {
        console.log(response.data)
        setRequests(response.data);
      })
      .catch(error => {
        console.error('Error fetching pending requests:', error);
      });
  }, [handleRequestAction]);


  return (
    <div className="pending-requests-container">
      <h2>Pending Requests</h2>
      {requests.length === 0 ? (
        <p>No pending requests available.</p>
      ) : (
        requests.map(request => (
          <div className="request-card" key={request._id}>
            <div className="request-details">
              <p><strong>Employee ID:</strong> {request.employeeID.employeeID}</p>
              <p><strong>Request Type:</strong> {request.employeeID.employeeName}</p>
              <p><strong>Details:</strong> {request.employeeID.role}</p>
            </div>
            <div className="request-actions">
              <button 
                className="approve-button" 
                onClick={() => handleRequestAction(request._id, 'approve',request)}>
                Approve
              </button>
              <button 
                className="decline-button" 
                onClick={() => handleRequestAction(request._id, 'decline',request)}>
                Decline
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PendingRequestComponent;
