import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  // 1. Check if token exists in localStorage
  const token = localStorage.getItem('farmdirect_token');
  
  // 2. Get user details to check their role
  const user = JSON.parse(localStorage.getItem('farmdirect_user') || '{}');

  // If NO token found -> Kick to Login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If token found, but route has role restrictions (e.g., only 'seller' allowed)
  if (allowedRoles && allowedRoles.length > 0) {
    if (!allowedRoles.includes(user.role)) {
      // If a Buyer tries to access Seller route -> Send them to Buyer shop
      if (user.role === 'buyer') return <Navigate to="/buyer/shop" replace />;
      // If a Seller tries to access Buyer route -> Send them to Seller dashboard
      if (user.role === 'seller') return <Navigate to="/seller/dashboard" replace />;
    }
  }

  // If everything is good -> Show the page
  return children;
};

export default ProtectedRoute;