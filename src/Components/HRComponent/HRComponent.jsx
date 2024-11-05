import React, { useEffect, useRef, useState } from 'react'
import { Link, Route, Router, Routes, useLocation } from 'react-router-dom';
import AccountComponent from '../AdminComponent/AccountComponent/AccountComponent';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import PeopleComponent from '../AdminComponent/PeopleComponent/PeopleComponent';
import '../AdminComponent/PeopleComponent/AddEmployeeDataComponent/AddEmployeeDataComponent.css'
import HRHomeComponent from './HRHomeComponent/HRHomeComponent';
import { House,Users,CreditCard,LogOut,Star} from 'lucide-react';
import tempImage from '../../assets/image.png';
import GradeComponent from '../AdminComponent/GradeComponent/GradeComponent';
import logoImage from '../../../logo-image.png';

const HRComponent = () => {
  const navigate = useNavigate();
  const [isHR,setIsHR] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const [userDetails,setUserDetails] = useState([])

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
        navigate('/');
        toast.success(`SuccessFully Sign-out`, {
          position: "bottom-right",
          autoClose: 3000,
        });
      })
      .catch((error)=>
      {
        toast.error(error.message, {
          position: "bottom-right",
          autoClose: 3000,
        });
      })
  }
  const isActive = (path) => location.pathname === path;

  useEffect(()=>
  {
    const getData = () => {
        axios
          .get(`https://employee-payroll-backend.vercel.app/api/v1/hr/authenticate`,{withCredentials: true})
          .then((response)=>
            {
                setUserDetails(response.data)
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
              console.log(error)
              setIsHR(false) 
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
                <img src={logoImage} className='app-logo' alt="logo" />
                <Link to="/hr" className='app-name'>Payroll Management</Link>
              </div>
               <div className='navbar'>
                <Link to="/hr" className={`navbar-list-name ${isActive('/hr') ? 'active' : ''}`}>
                  <House />
                  Home
                </Link>
                <Link to="/hr/people" className={`navbar-list-name ${isActive('/hr/people') ? 'active' : ''}`}>
                  <Users />
                  People
                </Link>
                <Link to="/hr/grade" className={`navbar-list-name ${isActive('/hr/grade') ? 'active' : ''}`}>
                  <Star />
                  Grade
                </Link>
                <Link to="/hr/accounts" className={`navbar-list-name ${isActive('/hr/accounts') ? 'active' : ''}`}>
                  <CreditCard />
                  Account
                </Link>
              </div>
              <div className='user-profile-container'>
                <div className='user-profile'>
                  <img src={tempImage} className='user-image' alt="user" />
                  <div className='user-name'>
                    <p>{userDetails.name}</p>
                    <p style={{opacity:0.6}}>{userDetails.emailID}</p>
                  </div>
                </div>
                <div onClick={handleSignout} className="dropdown-icon">
                  <LogOut className='icon'/>
                </div>
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
    </React.Fragment>
  )
}

export default HRComponent