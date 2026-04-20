import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Buyer.css';

const BuyerProfile = () => {
  const navigate = useNavigate();
  const initialUser = JSON.parse(localStorage.getItem('farmdirect_user')) || {};
  const [user, setUser] = useState(initialUser);
  const [form, setForm] = useState({ fullName: initialUser.fullName || '', phone: initialUser.phone || '' });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const fetchProfile = async () => {
    const token = localStorage.getItem('farmdirect_token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/buyer/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Unable to load profile');
      }

      setUser(data);
      setForm({ fullName: data.fullName || '', phone: data.phone || '' });
      localStorage.setItem('farmdirect_user', JSON.stringify(data));
      setError('');
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('farmdirect_token');
    localStorage.removeItem('farmdirect_user');
    navigate('/');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem('farmdirect_token');
    if (!token) return;
    setMessage('');
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/buyer/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ fullName: form.fullName, phone: form.phone }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Unable to save profile');
      }

      setUser(data.user);
      setForm({ fullName: data.user.fullName || '', phone: data.user.phone || '' });
      localStorage.setItem('farmdirect_user', JSON.stringify(data.user));
      setMessage(data.message || 'Profile updated successfully');
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="buyer-page-wrapper">
        <div className="buyer-profile-container">
          <p>Loading profile…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="buyer-page-wrapper">
      <div className="buyer-topbar">
        <Link to="/buyer/shop" className="buyer-topbar-logo">
          <span>🌱</span> Kishansetu
        </Link>
        <div className="buyer-topbar-right">
          <Link to="/buyer/profile" className="buyer-profile-btn active">
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

      <div className="buyer-profile-container">
        <div className="buyer-profile-card">
          <div className="buyer-profile-header">
            <div className="buyer-profile-avatar">
              {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'B'}
            </div>
            <div>
              <h1>{user.fullName || 'Buyer Name'}</h1>
              <p className="buyer-role-badge">🛒 Buyer Account</p>
            </div>
          </div>

          {error && <p style={{ color: 'red', marginBottom: '16px' }}>{error}</p>}
          {message && <p style={{ color: '#16a34a', marginBottom: '16px' }}>{message}</p>}

          <div className="buyer-profile-details">
            <div className="buyer-detail-item">
              <span className="buyer-detail-label">Email Address</span>
              <span className="buyer-detail-value">{user.email || 'Not provided'}</span>
            </div>

            <div className="buyer-detail-item">
              <span className="buyer-detail-label">Account Status</span>
              <span className="buyer-status-active">Active</span>
            </div>

            {isEditing ? (
              <div className="buyer-profile-edit-grid">
                <label className="buyer-detail-label" htmlFor="fullName">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  className="buyer-input"
                />

                <label className="buyer-detail-label" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="buyer-input"
                />
              </div>
            ) : (
              <>
                <div className="buyer-detail-item">
                  <span className="buyer-detail-label">Name</span>
                  <span className="buyer-detail-value">{user.fullName || 'Not provided'}</span>
                </div>
                <div className="buyer-detail-item">
                  <span className="buyer-detail-label">Phone Number</span>
                  <span className="buyer-detail-value">{user.phone || 'Not provided'}</span>
                </div>
              </>
            )}
          </div>

          <div className="buyer-profile-actions">
            <button type="button" className="btn-back-to-shop" onClick={() => setIsEditing((prev) => !prev)}>
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', width: '100%', justifyContent: 'flex-end' }}>
              {isEditing && (
                <button className="btn-logout-big" type="button" onClick={handleSave}>
                  Save Changes
                </button>
              )}
              <button className="btn-logout-big" type="button" onClick={handleLogout}>
                Logout of Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerProfile;
