import React from 'react';
import { useNavigate } from 'react-router-dom';

const Topbar = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('farmdirect_user')) || {};

  const handleLogout = () => {
    localStorage.removeItem('farmdirect_token');
    localStorage.removeItem('farmdirect_user');
    window.location.href = '/';
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <h2 className="topbar-title">Kishansetu Panell</h2>
      </div>

      <div className="topbar-right">
        <div className="topbar-user">
          <div className="topbar-avatar">
            {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'F'}
          </div>
          <div className="topbar-user-info">
            <span className="topbar-name">{user.fullName || 'Farmer'}</span>
            <span className="topbar-role">Seller</span>
          </div>
        </div>

        <button className="topbar-logout" onClick={handleLogout}>
          Logout
        </button>

        <button className="topbar-home-btn" onClick={() => navigate('/')}>
          <h2>Home</h2>
        </button>
      </div>
    </header>
  );
};

export default Topbar;