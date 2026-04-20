import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const LocationSettings = () => {
  const [form, setForm] = useState({
    village: '',
    city: '',
    state: 'Gujarat'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  // 1. Fetch location on load
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const token = localStorage.getItem('farmdirect_token');
        const response = await fetch('http://localhost:5000/api/seller/location', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        setForm({
          village: data.village || '',
          city: data.city || '',
          state: data.state || 'Gujarat'
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchLocation();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 2. Save location via API
  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('farmdirect_token');
      const response = await fetch('http://localhost:5000/api/seller/location', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setMessage('Location saved successfully! 📍');
    } catch (err) {
      setMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>📍 Location Settings</h1>
      </div>

      <div className="location-card">
        <p className="location-note">
          Setting your exact location helps buyers find you when they search for "Farmers near me".
        </p>

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

        <form className="dashboard-form location-form" onSubmit={handleSave}>
          <div className="form-grid">
            <div className="form-group">
              <label>Village / Area</label>
              <input type="text" name="village" value={form.village} onChange={handleChange} placeholder="e.g. Bakrol" disabled={isLoading} />
            </div>
            <div className="form-group">
              <label>City / Taluka</label>
              <input type="text" name="city" value={form.city} onChange={handleChange} placeholder="e.g. Anand" required disabled={isLoading} />
            </div>
            <div className="form-group full-width">
              <label>State</label>
              <select name="state" value={form.state} onChange={handleChange} disabled={isLoading}>
                <option value="Gujarat">Gujarat</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Rajasthan">Rajasthan</option>
              </select>
            </div>
          </div>
          
          <button type="submit" className="btn-primary submit-btn" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Location'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LocationSettings;