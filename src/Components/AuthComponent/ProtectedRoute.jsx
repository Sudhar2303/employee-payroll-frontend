import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = () => {
    const token = window.localStorage.getItem('token')
    console.log(token)
  return token ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
