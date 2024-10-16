import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './GradeComponent.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EllipsisVertical } from 'lucide-react';
const GradeComponent = ({isAdmin}) => {
  const [grades, setGrades] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false); 
  const [currentGrade, setCurrentGrade] = useState({ gradeNo: '', basicPay: '', hra: '', da: '' }); 
  const modalRef = useRef();
  const [kebabMenuVisible, setKebabMenuVisible] = useState(null); 
  const kebabMenuRef = useRef(null); 
  
  const kebabMenuHandler = (id) => {
    setKebabMenuVisible((prev) => (prev === id ? null : id)); // Toggle visibility
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
    console.log(grade)
    setCurrentGrade({ gradeNo: grade.gradeNo, basicPay: grade.basicPay, hra: grade.hra, da: grade.da }); 
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


  const handleSaveGrade = () => {
    if (isEditing) 
    {
      axios.post(API, currentGrade, { withCredentials: true })
        .then(() => {
          toast.success('Grade updated successfully', {
            position: 'bottom-right',
            autoClose: 3000,
          });
          setIsModalOpen(false);
          fetchGrades(); 
        })
        .catch((error) => {
            console.log(error)
          toast.error(error.message, {
            position: 'bottom-right',
            autoClose: 3000,
          });
        });
    } else 
    {
      axios.post(API, currentGrade, { withCredentials: true })
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
    axios.get('https://employee-payroll-backend.vercel.app/api/v1/admin/getGrade', { withCredentials: true })
      .then((response) => {
        setGrades(response.data);
      })
      .catch((error) => {
        toast.error(error.message, {
          position: 'bottom-right',
          autoClose: 3000,
        });
      });
  };

  
  useEffect(() => {
    fetchGrades();

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="grade-component">
      {isAdmin && <button className="add-grade-button" onClick={handleAddNewGrade}>Add Grade</button>}

      <div className="grade-card-container">
        {grades.map((grade, index) => (
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
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-backdrop">
          <div className="modal" ref={modalRef}>
            <button className="close-modal-button" onClick={handleToggleModal}>X</button>
            <h2>{isEditing ? 'Edit Grade' : 'Add New Grade'}</h2>
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
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default GradeComponent;
