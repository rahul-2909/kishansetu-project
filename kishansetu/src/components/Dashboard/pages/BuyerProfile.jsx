import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Buyer.css';
import { useToast } from '../../Toast';

const BuyerProfile = () => {
  const navigate = useNavigate();
  const { showError, showSuccess } = useToast();
  const initialUser = JSON.parse(localStorage.getItem('farmdirect_user')) || {};
  const [user, setUser] = useState(initialUser);
  const [form, setForm] = useState({ fullName: initialUser.fullName || '', phone: initialUser.phone || '' });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [validationErrors, setValidationErrors] = useState({});

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
    } catch (err) {
      console.error(err);
      showError(err.message);
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
    setValidationErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const errors = {};
    if (!form.fullName || form.fullName.trim().length === 0) errors.fullName = 'Full name is required';
    if (!form.phone || form.phone.trim().length === 0) errors.phone = 'Phone number is required';
    if (form.phone && !/^[6-9]\d{9}$/.test(form.phone.trim())) errors.phone = 'Enter a valid 10-digit phone number';
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      showError('Please fix the errors below');
      return;
    }

    const token = localStorage.getItem('farmdirect_token');
    if (!token) return;

    try {
      const response = await fetch('http://localhost:5000/api/buyer/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ fullName: form.fullName.trim(), phone: form.phone.trim() }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Unable to save profile');
      }

      setUser(data.user);
      setForm({ fullName: data.user.fullName || '', phone: data.user.phone || '' });
      localStorage.setItem('farmdirect_user', JSON.stringify(data.user));
      showSuccess(data.message || 'Profile updated successfully');
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      showError(err.message);
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
                <div>
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
                  {validationErrors.fullName && <span style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px', display: 'block' }}>{validationErrors.fullName}</span>}
                </div>

                <div>
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
                  {validationErrors.phone && <span style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px', display: 'block' }}>{validationErrors.phone}</span>}
                </div>
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
