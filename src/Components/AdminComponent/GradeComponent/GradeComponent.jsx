import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './GradeComponent.css';
import {toast } from 'react-toastify';
import { EllipsisVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GradeComponent = ({isAdmin}) => {
  const navigate = useNavigate();
  const [grades, setGrades] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false); 
  const [currentGrade, setCurrentGrade] = useState({ gradeNo: '', basicPay: '', hra: '', da: '' }); 
  const modalRef = useRef();
  const [kebabMenuVisible, setKebabMenuVisible] = useState(null); 
  const kebabMenuRef = useRef(null); 
  const [isLoading,setIsLoading] = useState(true)

  const kebabMenuHandler = (id) => {
    setKebabMenuVisible((prev) => (prev === id ? null : id)); 
  };


  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsModalOpen(false);
    }
    if (kebabMenuRef.current && !kebabMenuRef.current.contains(event.target)) {
        setKebabMenuVisible(null); 
      }
  };


  const handleAddNewGrade = () => {
    setCurrentGrade({ gradeNo: '', basicPay: '', hra: '', da: '' }); 
    setIsEditing(false); 
    setIsModalOpen(true);
  };


  const handleEditGrade = (grade) => {
    setCurrentGrade({ gradeNo: grade.gradeNo, basicPay: grade.basicPay, hra: grade.hra * 100, da: grade.da *100 }); 
    setIsEditing(true); 
    setIsModalOpen(true);
  };


  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setCurrentGrade((prevGrade) => ({
      ...prevGrade,
      [name]: value
    }));
  };

  const role = (isAdmin) ? 'admin' : 'hr'
  const handleSaveGrade = () => 
  {
    const gradeToSave = {
      ...currentGrade,
      hra: currentGrade.hra / 100, 
      da: currentGrade.da / 100     
    };
    if (isEditing) 
    {
      axios.post(`https://employee-payroll-backend.vercel.app/api/v1/admin/updateGrade`, gradeToSave, { withCredentials: true })
        .then(() => {
          toast.success('Grade updated successfully', {
            position: 'bottom-right',
            autoClose: 3000,
          });
          setIsModalOpen(false);
          fetchGrades(); 
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
    } else 
    {
      axios.post(`https://employee-payroll-backend.vercel.app/api/v1/admin/addGrade`, gradeToSave, { withCredentials: true })
        .then(() => {
          toast.success('Grade added successfully', {
            position: 'bottom-right',
            autoClose: 3000,
          });
          setIsModalOpen(false);
          fetchGrades(); 
        })
        .catch((error) => {
          toast.error(error.message, {
            position: 'bottom-right',
            autoClose: 3000,
          });
        });
    }
  };

  
  const fetchGrades = () => {
    axios.get(`https://employee-payroll-backend.vercel.app/api/v1/${role}/getGrade`, { withCredentials: true })
      .then((response) => {
        setGrades(response.data);
        setIsLoading(false)
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
          setIsLoading(false)
      });
  };

  
  useEffect(() => {
    fetchGrades();

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const renderPlaceholders = () => {
    return Array(5).fill().map((_, index) => (
      <div className="grade-card placeholder" key={index}>
      </div>
    ));
  };

  return (
    <div className="grade-component">
      {isAdmin && <button className="add-grade-button" onClick={handleAddNewGrade}>Add Grade</button>}

      <div className="grade-card-container">
        {
          isLoading ? (
            renderPlaceholders()
          ) : (
          grades.map((grade, index) => (
          <div className="grade-card" key={index}>
            <div className="grade-card-header">
              Grade No: {grade.gradeNo}
              {isAdmin && 
              <div className='kebab-menu-container' onClick={() => kebabMenuHandler(grade._id)}>
                <EllipsisVertical className='icon' />
                {kebabMenuVisible === grade._id && (
                <div className="menu-items" ref={kebabMenuRef}>
                    <p className="menu-item" onClick={() => handleEditGrade(grade)}>Edit</p>
                </div>
                )}
              </div> }
            </div>
            <hr/>
            <div className="grade-card-value">Basic Pay: ₹{grade.basicPay}</div>
            <div className="grade-card-value">HRA: {grade.hra * 100}%</div>
            <div className="grade-card-value">DA: {grade.da * 100}%</div>
          </div>
          )) )
        }
      </div>

      {isModalOpen && (
        <div className="modal-backdrop">
          <div className="modal" ref={modalRef}>
            <button className="close-modal-button" onClick={handleToggleModal}>X</button>
            <h2 className='toggle-heading'>{isEditing ? 'Edit Grade' : 'Add New Grade'}</h2>
            <form>
              <div className="form-group">
                <label>Grade No:</label>
                <input
                  type="number"
                  name="gradeNo"
                  value={currentGrade.gradeNo}
                  onChange={handleFormChange}
                />
              </div>
              <div className="form-group">
                <label>Basic Pay:</label>
                <input
                  type="number"
                  name="basicPay"
                  value={currentGrade.basicPay}
                  onChange={handleFormChange}
                />
              </div>
              <div className="form-group">
                <label>HRA:</label>
                <input
                  type="number"
                  name="hra"
                  value={currentGrade.hra}
                  onChange={handleFormChange}
                  step="0.01"
                />
              </div>
              <div className="form-group">
                <label>DA:</label>
                <input
                  type="number"
                  name="da"
                  value={currentGrade.da}
                  onChange={handleFormChange}
                  step="0.01"
                />
              </div>
              <button type="button" className="save-button" onClick={handleSaveGrade}>
                {isEditing ? 'Update' : 'Save'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GradeComponent;
