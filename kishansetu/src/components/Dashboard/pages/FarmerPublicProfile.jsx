import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Buyer.css';
import { apiUrl } from '../../../config/api';

const FarmerPublicProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [seller, setSeller] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchSeller = async () => {
    const token = localStorage.getItem('farmdirect_token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(apiUrl(`/api/buyer/sellers/${id}`), {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to load seller profile');
      }

      setSeller(data.seller);
      setProducts(data.products || []);
      setError('');
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeller();
  }, [id]);

  if (loading) {
    return (
      <div className="profile-page-container">
        <div className="no-results">
          <span>⌛</span>
          <h3>Loading seller profile...</h3>
        </div>
      </div>
    );
  }

  if (error || !seller) {
    return (
      <div className="profile-page-container">
        <div className="no-results">
          <span>⚠️</span>
          <h3>{error || 'Seller not found'}</h3>
          <button className="btn-back" onClick={() => navigate('/buyer/shop')}>Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page-container">
      <button className="btn-back" onClick={() => navigate('/buyer/shop')}>
        ← Back to Farmers
      </button>

      <div className="public-profile-header">
        <div className="public-avatar">{seller.fullName?.charAt(0).toUpperCase() || '🌾'}</div>
        <div className="public-info">
          <h1>{seller.fullName}</h1>
          <p className="public-location">📍 {seller.village && seller.city ? `${seller.village}, ${seller.city}, ${seller.state}` : `${seller.city || seller.state || 'Location not set'}`}</p>
          <span className="public-category-badge">{seller.description ? 'Local Farmer' : 'Seller'}</span>
        </div>
      </div>

      <div className="public-description-box">
        <p>{seller.description || 'No description available.'}</p>
      </div>

      <a href={`tel:${seller.phone}`} className="btn-massive-call">
        <span>📞</span> Call Farmer: {seller.phone || 'Not available'}
      </a>

      <div className="public-products-section">
        <h2>🥕 Available Products</h2>
        {products.length > 0 ? (
          <div className="public-products-grid">
            {products.map((item, index) => (
              <div key={index} className="public-product-item">
                <div className="public-product-img">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="product-image"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <span
                    className="product-emoji-fallback"
                    style={{ display: item.image ? 'none' : 'flex' }}
                  >
                    {item.name?.charAt(0).toUpperCase() || '🌾'}
                  </span>
                </div>
                <div className="public-product-details">
                  <span className="public-product-name">{item.name}</span>
                  <span className="public-product-price">₹{item.price}{item.quantity ? ` • ${item.quantity}` : ''}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <span>📦</span>
            <h3>No products listed yet</h3>
            <p>This farmer does not have public product listings yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerPublicProfile;
