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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleMenuChange = (menu, options = {}) => {
    setActiveMenu(menu);
    setSelectedProduct(menu === 'add-product' ? options.product || null : null);
    setIsSidebarOpen(false);
  };

  const renderContent = () => {
    switch (activeMenu) {
      case 'home': return <DashboardHome />;
      case 'products':
        return <Products onNavigate={handleMenuChange} onEditProduct={(product) => handleMenuChange('add-product', { product })} />;
      case 'add-product':
        return <AddProduct onNavigate={handleMenuChange} productToEdit={selectedProduct} />;
      case 'location': return <LocationSettings />;
      case 'profile': return <Profile />;
      default: return <DashboardHome />;
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar
        activeMenu={activeMenu}
        isOpen={isSidebarOpen}
        setActiveMenu={handleMenuChange}
      />
      {isSidebarOpen && (
        <button
          type="button"
          className="sidebar-overlay"
          aria-label="Close sidebar"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <div className="dashboard-main">
        <Topbar
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        />
        <div className="dashboard-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboardPage;
