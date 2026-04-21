import React from 'react';

const Sidebar = ({ activeMenu, isOpen, setActiveMenu }) => {
  const menuItems = [
    { id: 'home', label: 'Dashboard', icon: '📊' },
    { id: 'products', label: 'My Products', icon: '🥕' },
    { id: 'add-product', label: 'Add Product', icon: '➕' },
    { id: 'location', label: 'Location Settings', icon: '📍' },
    { id: 'profile', label: 'My Profile', icon: '👤' },
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
      <div className="sidebar-logo">
        <span className="sidebar-logo-icon">🌱</span>
        <span className="sidebar-logo-text">Kishansetu</span>
      </div>
      
      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`sidebar-link ${activeMenu === item.id ? 'active' : ''}`}
            onClick={() => setActiveMenu(item.id)}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
