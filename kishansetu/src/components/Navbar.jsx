import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem('farmdirect_user') || '{}');
  const token = localStorage.getItem('farmdirect_token');
  const isLoggedIn = !!token;

  const closeMenu = () => setIsMenuOpen(false);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    closeMenu();
  };

  const handleLogout = () => {
    localStorage.removeItem('farmdirect_token');
    localStorage.removeItem('farmdirect_user');
    navigate('/');
    closeMenu();
  };

  const handleDashboardClick = () => {
    if (user.role === 'seller') {
      navigate('/seller/dashboard');
    } else if (user.role === 'buyer') {
      navigate('/buyer/shop');
    }
    closeMenu();
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <span className="navbar-logo-icon">🌱</span>
          <span className="navbar-logo-text">Kishansetu</span>
        </Link>

        <ul className="navbar-links">
          <li><a href="#hero" onClick={(e) => scrollToSection(e, 'hero')}>Home</a></li>
          <li><a href="#categories" onClick={(e) => scrollToSection(e, 'categories')}>Categories</a></li>
          <li><a href="#how-it-works" onClick={(e) => scrollToSection(e, 'how-it-works')}>How it Works</a></li>
          <li><a href="#why-us" onClick={(e) => scrollToSection(e, 'why-us')}>Why Us</a></li>
          <li><a href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>Contact</a></li>
        </ul>

        <div className="navbar-actions">
          {isLoggedIn ? (
            <>
              {/* <span className="navbar-user-info">
                {user.name} ({user.role === 'seller' ? 'Seller' : 'Buyer'})
              </span> */}
              <button className="btn-nav btn-primary" onClick={handleDashboardClick}>
                {user.role === 'seller' ? 'My Dashboard' : 'Shop'}
              </button>
              <button className="btn-nav btn-ghost" onClick={handleLogout}>
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-nav btn-ghost">Log in</Link>
              <Link to="/signup" className="btn-nav btn-solid">Sign up</Link>
            </>
          )}
        </div>

        <button className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          {isMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div className="mobile-menu">
          <a href="#hero" onClick={(e) => scrollToSection(e, 'hero')}>Home</a>
          <a href="#categories" onClick={(e) => scrollToSection(e, 'categories')}>Categories</a>
          <a href="#how-it-works" onClick={(e) => scrollToSection(e, 'how-it-works')}>How it Works</a>
          <a href="#why-us" onClick={(e) => scrollToSection(e, 'why-us')}>Why Us</a>
          <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>Contact</a>
          <div className="mobile-buttons">
            {isLoggedIn ? (
              <>
                {/* <span className="navbar-user-info-mobile">
                  {user.name} ({user.role === 'seller' ? 'Seller' : 'Buyer'})
                </span> */}
                <button className="btn-nav btn-primary" onClick={handleDashboardClick}>
                  {user.role === 'seller' ? 'My Dashboard' : 'Shop'}
                </button>
                <button className="btn-nav btn-ghost" onClick={handleLogout}>
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-nav btn-ghost" onClick={closeMenu}>Log in</Link>
                <Link to="/signup" className="btn-nav btn-solid" onClick={closeMenu}>Sign up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;