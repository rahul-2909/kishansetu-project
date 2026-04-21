import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { apiUrl } from '../../config/api';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    description: ''
  });

  // 1. Fetch profile data when page opens
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('farmdirect_token');
        const response = await fetch(apiUrl('/api/seller/profile'), {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to fetch profile');
        setForm({
          fullName: data.fullName || '',
          phone: data.phone || '',
          description: data.description || ''
        });
      } catch (err) {
        console.error(err);
        setMessage(err.message || 'Failed to fetch profile');
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 2. Save profile via API
  const handleSave = async () => {
    setIsLoading(true);
    setMessage('');
    
    try {
      const token = localStorage.getItem('farmdirect_token');
      const response = await fetch(apiUrl('/api/seller/profile'), {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      
      setMessage('Profile saved successfully! ✅');
      setIsEditing(false);
    } catch (err) {
      setMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>My Profile</h1>
        <button 
          className={isEditing ? "btn-secondary" : "btn-primary"} 
          onClick={() => { setIsEditing(!isEditing); setMessage(''); }}
        >
          {isEditing ? 'Cancel' : '✏️ Edit Profile'}
        </button>
      </div>

      {message && (
        <div style={{ 
          padding: '12px 16px', 
          backgroundColor: message.includes('successfully') ? '#f0fdf4' : '#fef2f2', 
          color: message.includes('successfully') ? '#16a34a' : '#dc2626', 
          border: `1px solid ${message.includes('successfully') ? '#bbf7d0' : '#fecaca'}`, 
          borderRadius: 10, 
          marginBottom: 24 
        }}>
          {message}
        </div>
      )}

      <div className="profile-card">
        <div className="profile-avatar-section">
          <div className="profile-avatar">👨‍🌾</div>
          <div>
            <h2>{form.fullName || 'Farmer Name'}</h2>
            <p>Seller • Joined in 2024</p>
          </div>
        </div>

        <div className="profile-form">
          <div className="phone-group">
            <label>📞 Phone Number (Buyers will call this)</label>
            <input 
              type="tel" 
              name="phone" 
              value={form.phone} 
              onChange={handleChange} 
              disabled={!isEditing}
              className="phone-input"
            />
          </div>

          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="fullName" value={form.fullName} onChange={handleChange} disabled={!isEditing} />
          </div>

          <div className="form-group">
            <label>About Your Farm (Buyers will read this)</label>
            <textarea 
              name="description" 
              rows="4" 
              value={form.description} 
              onChange={handleChange} 
              disabled={!isEditing}
              placeholder="Tell buyers about your farming methods, what you grow, etc..."
            ></textarea>
          </div>

          {isEditing && (
            <button 
              className="btn-primary submit-btn" 
              onClick={handleSave}
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
