import React, { useEffect, useRef, useState } from 'react'
import '../AdminHomeComponent.css'
import { useNavigate } from 'react-router-dom';
import { EllipsisVertical } from 'lucide-react';

const TableRowComponent = ({EmployeeData,actionType,onAction}) => 
{
  const navigate = useNavigate();
  const [kebabMenuVisible,setKebabMenuVisible] = useState(null)
  const kebabMenuRef = useRef(null);

  const kebabMenuHandler = (iterator) =>
  {
    setKebabMenuVisible(kebabMenuVisible === iterator._id ? null : iterator._id);
  };

  useEffect(() =>
    {
      const handleClickOutside = (event) => {
        if (kebabMenuRef.current && !kebabMenuRef.current.contains(event.target)) {
          setKebabMenuVisible(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
  }, [navigate]);
    
  return (
    <React.Fragment>
          {EmployeeData && EmployeeData.map((iterator) => (
            <div className="row" key={iterator._id}>
              <div className="row-item">{iterator.employeeID.employeeID}</div>
              <div className="row-item">{iterator.employeeID.employeeName}</div>
              <div className="row-item">{iterator.employeeID.role}</div>
              <div className="row-item">{iterator.basicPay}</div>
              <div className="row-item">{iterator.gradeNo.gradeNo}</div>
              <div className="row-item">{iterator.totalWorkingHours}</div>
              <div className="row-item">{iterator.salary.toFixed(2)}</div>
              <div className='kebab-menu-container' onClick={() => kebabMenuHandler(iterator)}>
              <EllipsisVertical className='icon' />
                {kebabMenuVisible === iterator._id && (
                  <div className="menu-items"  ref={kebabMenuRef}>
                    {actionType === 'edit' && (
                      <p className="menu-item" onClick={() => onAction(iterator)}>Edit</p>
                    )}
                    {actionType === 'payment' && (
                      <p className="menu-item" onClick={() => onAction(iterator)}>Payment</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
    </React.Fragment>
  )
}

export default TableRowComponent