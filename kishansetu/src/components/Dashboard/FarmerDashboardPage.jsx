import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import DashboardHome from './DashboardHome';
import Products from './Products';
import AddProduct from './AddProduct';
import LocationSettings from './LocationSettings';
import Profile from './Profile';
import './Dashboard.css';

const FarmerDashboardPage = () => {
  const [activeMenu, setActiveMenu] = useState('home');

  const renderContent = () => {
    switch (activeMenu) {
      case 'home': return <DashboardHome />;
      case 'products': return <Products onNavigate={setActiveMenu} />;
      case 'add-product': return <AddProduct onNavigate={setActiveMenu} />;
      case 'location': return <LocationSettings />;
      case 'profile': return <Profile />;
      default: return <DashboardHome />;
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      <div className="dashboard-main">
        <Topbar />
        <div className="dashboard-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboardPage;