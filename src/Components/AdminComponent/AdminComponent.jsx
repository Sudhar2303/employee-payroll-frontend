import React, { useEffect, useRef, useState } from 'react';
import './AdminComponent.css';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast } from 'react-toastify';
import tempImage from '../../assets/image.png';
import { House,Users,CreditCard,EllipsisVertical,Star,ClockAlert } from 'lucide-react';
import AdminHomeComponent from './AdminHomeComponent/AdminHomeComponent';
import PeopleComponent from './PeopleComponent/PeopleComponent';
import AccountComponent from './AccountComponent/AccountComponent';
import GradeComponent from './GradeComponent/GradeComponent';
import PendingRequestComponent from './PendingRequestComponent/PendingRequestComponent';

const AdminComponent = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);


  const handleIconClick = () => {
    setShowDropdown((prevState) => !prevState);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };
  const handleSignout = () =>
  {
      axios.post(`https://employee-payroll-backend.vercel.app/api/v1/logout`,null, { withCredentials: true })
      .then((response)=>
      {
        setTimeout(() => {
          navigate('/');
        }, 2000);
        toast.success(`SuccessFully Sign-out`, {
          position: "bottom-right",
          autoClose: 3000,
        });
      })
      .catch((error)=>
      {
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
      })
  }

  useEffect(() => {
    const getAuthenticate = () => {
      axios
        .get(`https://employee-payroll-backend.vercel.app/api/v1/admin/authenticate`, { withCredentials: true })
        .then((response) => {
          if (response.status === 201) {
            setIsAdmin(true);
            toast.success(`Welcome admin`, {
              position: "bottom-right",
              autoClose: 3000,
            });
          }
        })
        .catch((error) => {
          if(error.response.status == 401)
          {
            navigate('/');
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

    getAuthenticate();

    const updateTime = () => {
      const now = new Date();
      const options = {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      };
      const formattedDate = now.toLocaleDateString('en-US', options); // e.g. "Oct 11, 2024"
      const formattedDay = now.toLocaleDateString('en-US', { weekday: 'long' }); // Full weekday
      const formattedTime = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }).toLowerCase();
      const finalTime = `${formattedDate} | ${formattedDay} ${formattedTime}`;
      setCurrentTime(finalTime);
    };

    updateTime();
    const timerId = setInterval(updateTime, 1000);

    document.addEventListener('click', handleClickOutside, true);
    return () => {
      clearInterval(timerId);
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return (
    <div>
      {isAdmin && (
        <div className='admin-component'>
          <div className='sidebar'>
            <div className='company-name-logo'>
              <img src='logo-image.png' className='app-logo' alt="logo" />
              <p className='app-name'>Employee Payroll</p>
            </div>
            <div className='navbar'>
              <Link to="/admin" className='navbar-list-name'>
                <House className='icon'/>
                Home
              </Link>
              <Link to="/admin/people" className='navbar-list-name'>
                <Users className='icon'/>
                People
              </Link>
              <Link to="/admin/grade" className='navbar-list-name'>
                <Star className='icon'/>
                  Grade
              </Link>
              <Link to="/admin/request" className='navbar-list-name'>
                <ClockAlert  className='icon'/>
                  Request
              </Link>
              <Link to="/admin/accounts" className='navbar-list-name'>
              <CreditCard className='icon'/>
                Account
              </Link>
            </div>
            <div className='user-profile-container'>
              <div className='user-profile'>
                <img src={tempImage} className='user-image' alt="user" />
                <div className='user-name'>
                  <p>UserName</p>
                  <p style={{opacity : 0.6}}>email-id</p>
                </div>
              </div>
              <div onClick={handleIconClick} className="dropdown-icon">
                <EllipsisVertical className='icon'/>
              </div>
              {showDropdown && (
                <div className="dropdown-menu" ref={dropdownRef}>
                  <button className="sign-out-button" onClick={handleSignout}>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className='welcome-tag'>
            <h5>Welcome, Admin</h5>
            <p>{currentTime}</p>
          </div>
          <Routes>
            <Route path='/' element={<AdminHomeComponent />} />
            <Route path='/people' element={<PeopleComponent isAdmin = {isAdmin} />} />
            <Route path='/accounts' element={<AccountComponent isAdmin = {isAdmin}/>} />
            <Route path='/grade' element={<GradeComponent isAdmin={isAdmin}/>} />
            <Route path='/request' element={<PendingRequestComponent/>} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default AdminComponent;
