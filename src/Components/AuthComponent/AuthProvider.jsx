// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Check for the presence of the cookie (token)
    const token =  window.localStorage.getItem('token') // Make sure 'token' matches the name of your cookie

    if (token) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
      navigate('/'); // Redirect to login if the cookie is not present
    }
  }, [navigate]);

  const login = (token) => {
    Cookies.set('token', token, { expires: 1 }); 
    setAuthenticated(true);
    navigate('/admin'); // Redirect to admin after successful login
  };

  const logout = () => {
    // Remove the cookie and update state upon logout
    Cookies.remove('token'); // Make sure 'token' matches the name of your cookie
    setAuthenticated(false);
    navigate('/'); // Redirect to login after logout
  };

  return (
    <AuthContext.Provider value={{ authenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
