import React, { useEffect, useRef, useState } from 'react'
import { Link, Route, Router, Routes } from 'react-router-dom';
import AccountComponent from '../AdminComponent/AccountComponent/AccountComponent';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import PeopleComponent from '../AdminComponent/PeopleComponent/PeopleComponent';
import '../AdminComponent/PeopleComponent/AddEmployeeDataComponent/AddEmployeeDataComponent.css'
import HRHomeComponent from './HRHomeComponent/HRHomeComponent';
import { House,Users,CreditCard,EllipsisVertical,Star} from 'lucide-react';
import tempImage from '../../assets/image.png';
import GradeComponent from '../AdminComponent/GradeComponent/GradeComponent';

const HRComponent = () => {
  const navigate = useNavigate();
  const [isHR,setIsHR] = useState(false);
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
  useEffect(()=>
  {
    const getData = () => {
        axios
          .get(`https://employee-payroll-backend.vercel.app/api/v1/admin/authenticate`,{withCredentials: true})
          .then((response)=>{
            if(response.status==201)
              {
                  setIsHR(true);
                  toast.success(`Welcome HR`, 
                  {
                      position: "bottom-right",
                      autoClose: 3000,
                  })
              }
          })
          .catch((error)=>
            {
              navigate('/');
              setIsHR(false) 
              navigate('/');
              toast.error('Authentication failed : Login again', {
                  position: "bottom-right",
                  autoClose: 3000,
              });      
          })
        }
        getData();
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
      },[])
  return (
    <React.Fragment>
      {isHR &&
        <div className="hr-component">
            <div className='sidebar'>
              <div className='company-name-logo'>
                <img src='logo-image.png' className='app-logo' alt="logo" />
                <p className='app-name'>Employee Payroll</p>
              </div>
              <div className='navbar'>
                <Link to="/hr" className='navbar-list-name'>
                  <House/>
                  Home
                </Link>
                <Link to="/hr/people" className='navbar-list-name'>
                  <Users/>
                  People
                </Link>
                <Link to="/hr/grade" className='navbar-list-name'>
                  <Star className='icon'/>
                    Grade
                </Link>
                <Link to="/hr/accounts" className='navbar-list-name'>
                  <CreditCard/>
                  Account
                </Link>
              </div>
              <div className='user-profile-container'>
                <div className='user-profile'>
                  <img src={tempImage} className='user-image' alt="user" />
                  <div className='user-name'>
                    <p>UserName</p>
                    <p style={{opacity:0.6}}>email-id</p>
                  </div>
                </div>
                <div onClick={handleIconClick} className="dropdown-icon">
                  <EllipsisVertical/>
                </div>
                {showDropdown && (
                  <div className="dropdown-menu" ref={dropdownRef}>
                    <button className="sign-out-button" onClick={() => alert('Signed out!')}>
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className='welcome-tag'>
              <h5>Welcome, HR</h5>
              <p>{currentTime}</p>
            </div>
            <Routes>
              <Route path='/' element={<HRHomeComponent/>} />
              <Route path='/people' element={<PeopleComponent />} />
              <Route path='/grade' element={<GradeComponent />} />
              <Route path='/accounts' element={<AccountComponent />} />
            </Routes>
        </div>
      }
      <ToastContainer />
    </React.Fragment>
  )
}

export default HRComponent