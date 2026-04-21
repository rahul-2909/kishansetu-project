import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../Toast';

const emptyForm = {
  name: '',
  category: '',
  price: '',
  quantity: ''
};

const AddProduct = ({ onNavigate, productToEdit }) => {
  const navigate = useNavigate();
  const { showError, showSuccess } = useToast();
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const isEditMode = Boolean(productToEdit?._id);

  const handleDone = () => {
    if (onNavigate) {
      onNavigate('products');
      return;
    }

    navigate('/seller/dashboard');
  };

  useEffect(() => {
    if (productToEdit) {
      setForm({
        name: productToEdit.name || '',
        category: productToEdit.category || '',
        price: productToEdit.price?.toString() || '',
        quantity: productToEdit.quantity || ''
      });
      setImageFile(null);
      setImagePreview(productToEdit.image || '');
      setError('');
      return;
    }

    setForm(emptyForm);
    setImageFile(null);
    setImagePreview('');
    setError('');
  }, [productToEdit]);

  const handleChange = (e) => {
    setError('');
    setValidationErrors((prev) => ({ ...prev, [e.target.name]: '' }));

    setForm((currentForm) => ({
      ...currentForm,
      [e.target.name]: e.target.value
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!form.name || form.name.trim().length === 0) errors.name = 'Product name is required';
    if (!form.category) errors.category = 'Category is required';
    if (!form.price || Number(form.price) <= 0) errors.price = 'Price must be greater than 0';
    if (!isEditMode && !imageFile && !imagePreview) errors.image = 'Product image is required';
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showError('Image size must be less than 5MB');
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setValidationErrors((prev) => ({ ...prev, image: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showError('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('farmdirect_token');
      const formData = new FormData();
      formData.append('name', form.name.trim());
      formData.append('category', form.category);
      formData.append('price', Number(form.price));
      formData.append('quantity', form.quantity.trim());

      if (imageFile) {
        formData.append('image', imageFile);
      }

      const endpoint = isEditMode
        ? `http://localhost:5000/api/seller/products/${productToEdit._id}`
        : 'http://localhost:5000/api/seller/products';

      const response = await fetch(endpoint, {
        method: isEditMode ? 'PUT' : 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to save product');
      }

      showSuccess(data.message || 'Product saved successfully!');
      handleDone();
    } catch (err) {
      setError(err.message || 'Failed to save product');
      showError(err.message || 'Failed to save product');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>{isEditMode ? 'Edit Product' : 'Add New Product'}</h1>
      </div>

      {error && (
        <div style={{ padding: '12px 16px', backgroundColor: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', borderRadius: 10, marginBottom: 20, fontSize: '14px' }}>
          {error}
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
            <label>Price (Rs. per kg)</label>
            <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="40" required disabled={isLoading} />
          </div>

          <div className="form-group">
            <label>Approx. Quantity (optional)</label>
            <input type="text" name="quantity" value={form.quantity} onChange={handleChange} placeholder="e.g. 50 kg available" disabled={isLoading} />
          </div>
        </div>

        <div className="form-group full-width">
          <label>{isEditMode ? 'Update Image (optional)' : 'Upload Image'}</label>
          <div className="image-upload-box" style={imagePreview ? { borderColor: '#16a34a', backgroundColor: '#f0fdf4' } : {}}>
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />
            ) : (
              <span style={{ fontSize: '40px' }}>Upload</span>
            )}
            <p>
              {imageFile
                ? imageFile.name
                : isEditMode && productToEdit?.image
                  ? 'Current image shown. Choose a file only if you want to replace it.'
                  : 'Click to upload product photo'}
            </p>
            <input type="file" accept="image/png, image/jpeg, image/jpg" className="file-input" onChange={handleImageChange} disabled={isLoading} />
          </div>
        </div>

        <button type="submit" className="btn-primary submit-btn" disabled={isLoading}>
          {isLoading ? (isEditMode ? 'Updating...' : 'Uploading...') : (isEditMode ? 'Update Product' : 'Save Product')}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
