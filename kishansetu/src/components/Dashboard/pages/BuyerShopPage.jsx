import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Buyer.css';

const categories = ['All', 'Vegetables', 'Fruits', 'Dairy', 'Grains', 'Spices', 'Organic', 'Local Produce'];

const BuyerShopPage = () => {
  const navigate = useNavigate();
  const [farmers, setFarmers] = useState([]);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const user = JSON.parse(localStorage.getItem('farmdirect_user')) || {};

  const handleLogout = () => {
    localStorage.removeItem('farmdirect_token');
    localStorage.removeItem('farmdirect_user');
    navigate('/');
  };

  const fetchFarmers = async () => {
    const token = localStorage.getItem('farmdirect_token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/buyer/sellers', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to load farmers');
      }
      setFarmers(data);
      setError('');
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFarmers();
  }, []);

  const filteredFarmers = farmers.filter((farmer) => {
    const matchesSearch = farmer.fullName.toLowerCase().includes(search.toLowerCase()) ||
      farmer.location.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || farmer.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="buyer-page-wrapper">
      <div className="buyer-topbar">
        <Link to="/buyer/shop" className="buyer-topbar-logo">
          <span>🌱</span> Kishansetu
        </Link>

        <div className="buyer-topbar-right">
          <Link to="/" className="buyer-home-btn">
            Home
          </Link>

          <Link to="/buyer/profile" className="buyer-profile-btn">
            <div className="buyer-topbar-avatar">
              {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'B'}
            </div>
            <span>{user.fullName || 'Profile'}</span>
          </Link>

          <button className="buyer-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="buyer-shop-page">
        <div className="buyer-header">
          <h1>📍 Nearby Farmers</h1>
          <p>Find fresh produce directly from local farms</p>
        </div>

        <div className="buyer-search-bar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search by farmer name or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="buyer-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
              type="button"
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="no-results">
            <span>⌛</span>
            <h3>Loading farmers...</h3>
            <p>Please wait while we fetch nearby sellers.</p>
          </div>
        ) : error ? (
          <div className="no-results">
            <span>⚠️</span>
            <h3>Unable to load farmers</h3>
            <p>{error}</p>
          </div>
        ) : (
          <div className="farmers-grid">
            {filteredFarmers.length > 0 ? (
              filteredFarmers.map((farmer) => (
                <div
                  key={farmer._id}
                  className="farmer-card"
                  onClick={() => navigate(`/buyer/farmer/${farmer._id}`)}
                >
                  <div className="farmer-avatar-large">{farmer.fullName?.charAt(0)?.toUpperCase() || '👨‍🌾'}</div>
                  <h3 className="farmer-card-name">{farmer.fullName}</h3>

                  <div className="farmer-card-meta">
                    <span>📍 {farmer.location}</span>
                    <span className="distance-badge">{farmer.category}</span>
                  </div>

                  <div className="farmer-card-tags">
                    {farmer.products.slice(0, 3).map((p, i) => (
                      <span key={i} className="product-tag">{p}</span>
                    ))}
                    {farmer.productCount > 3 && <span className="product-tag more">+{farmer.productCount - 3}</span>}
                  </div>

                  <a
                    href={`tel:${farmer.phone}`}
                    className="btn-call"
                    onClick={(e) => e.stopPropagation()}
                  >
                    📞 Call Now
                  </a>
                </div>
              ))
            ) : (
              <div className="no-results">
                <span>🔍</span>
                <h3>No farmers found</h3>
                <p>Try changing your search or filters.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerShopPage;
