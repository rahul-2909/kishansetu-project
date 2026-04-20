import React, { useState } from 'react';

const AddProduct = ({ onNavigate }) => {
  const [form, setForm] = useState({ name: '', category: '', price: '', quantity: '' });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    if (error) setError('');
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('farmdirect_token');

      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('category', form.category);
      formData.append('price', Number(form.price));
      formData.append('quantity', form.quantity);
      if (imageFile) formData.append('image', imageFile);

      const response = await fetch('http://localhost:5000/api/seller/products', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      
      alert(data.message);
      onNavigate('products');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header"><h1>Add New Product</h1></div>

      {error && (
        <div style={{ padding: '12px 16px', backgroundColor: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', borderRadius: 10, marginBottom: 20, fontSize: '14px' }}>
          ❌ {error}
        </div>
      )}

      <form className="dashboard-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Product Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="e.g. Fresh Tomatoes" required disabled={isLoading} />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select name="category" value={form.category} onChange={handleChange} required disabled={isLoading}>
              <option value="">Select Category</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Fruits">Fruits</option>
              <option value="Grains">Grains</option>
              <option value="Dairy">Dairy</option>
              <option value="Spices">Spices</option>
              <option value="Organic">Organic</option>
            </select>
          </div>
          <div className="form-group">
            <label>Price (₹ per kg)</label>
            <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="40" required disabled={isLoading} />
          </div>
          <div className="form-group">
            <label>Approx. Quantity (optional)</label>
            <input type="text" name="quantity" value={form.quantity} onChange={handleChange} placeholder="e.g. 50 kg available" disabled={isLoading} />
          </div>
        </div>
        
        <div className="form-group full-width">
          <label>Upload Image</label>
          <div className="image-upload-box" style={imagePreview ? { borderColor: '#16a34a', backgroundColor: '#f0fdf4' } : {}}>
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />
            ) : (
              <span style={{ fontSize: '40px' }}>📁</span>
            )}
            <p>{imagePreview ? imageFile.name : 'Click to upload product photo'}</p>
            <input type="file" accept="image/png, image/jpeg, image/jpg" className="file-input" onChange={handleImageChange} disabled={isLoading} />
          </div>
        </div>

        <button type="submit" className="btn-primary submit-btn" disabled={isLoading}>
          {isLoading ? 'Uploading to Cloud...' : 'Save Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;