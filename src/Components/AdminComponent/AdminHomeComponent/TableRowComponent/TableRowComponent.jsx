import React, { useEffect, useRef, useState } from 'react'
import '../AdminHomeComponent.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { EllipsisVertical } from 'lucide-react';

const TableRowComponent = ({EmployeeData,actionType,onAction,isLoading}) => 
{
  const navigate = useNavigate();
  const [kebabMenuVisible,setKebabMenuVisible] = useState(null)
  const kebabMenuRef = useRef(null);
  const location = useLocation();

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
  
  const renderPlaceholders = () => {
    return Array(5).fill().map((_, index) => (
      <div className="row" key={index}>
        {Array(7).fill().map((_, i) => (
          <div className="row-item-placeholder" key={i}></div>
        ))}
        <div className='kebab-menu-container'>
          <div className='icon-placeholder'></div>
        </div>
      </div>
    ));
  };

  return (
    <React.Fragment>
      { isLoading ? (
        renderPlaceholders()
      ) : (
            EmployeeData && EmployeeData.map((iterator) => (
              <div  className="row" key={iterator._id}>
                <div className="row-item">{iterator.employeeID.employeeID}</div>
                <div className="row-item">{iterator.employeeID.employeeName}</div>
                <div className="row-item">{iterator.employeeID.role}</div>
                <div className="row-item">{iterator.basicPay}</div>
                {!location.pathname.includes('/accounts') ? (
                  <div className="row-item">{iterator.gradeNo.gradeNo}</div>
                  ) : (
                  <div className="row-item">{iterator.salaryStatus}</div>
                )}
                <div className="row-item">{iterator.totalWorkingHours}</div>

                {! location.pathname.includes('/accounts') &&
                  <div className="row-item">{iterator.employeeID.status}</div>
                }
                { location.pathname.includes('/accounts') && 
                    <div className="row-item">{iterator.salary.toFixed(2)}</div>
                }
                <div className='kebab-menu-container' onClick={() => kebabMenuHandler(iterator)}>
                <EllipsisVertical className='icon' />
                  {kebabMenuVisible === iterator._id && (
                    <div className="menu-items"  ref={kebabMenuRef}>
                      {actionType === 'edit' && (
                        <p className="menu-item" onClick={() => onAction(iterator)}>Edit</p>
                      )}
                      {actionType === 'payment' &&  iterator.salaryStatus !== "paid" && (
                        <p className="menu-item" onClick={() => onAction(iterator)}>Payment</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
        )}
    </React.Fragment>
  )
}

export default TableRowComponent