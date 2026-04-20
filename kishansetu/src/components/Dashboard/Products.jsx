import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Products = ({ onNavigate }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // 1. Fetch all products on page load
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('farmdirect_token');
        const response = await fetch('http://localhost:5000/api/seller/products', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError('Failed to load products');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // 2. Delete product via API
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product? This cannot be undone.')) return;

    try {
      const token = localStorage.getItem('farmdirect_token');
      const response = await fetch(`http://localhost:5000/api/seller/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      // Remove from UI instantly without reloading
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>My Products</h1>
        {/* <button className="btn-primary" onClick={() => navigate('/add-product')}>
          ➕ Add New Product
        </button> */}
      </div>

      {error ? (
        <div style={{ padding: "16px", backgroundColor: '#fef2f2', color: '#dc2626', borderRadius: 12, marginBottom: 20 }}>
          ❌ {error}
        </div>
      ) : isLoading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <div className="placeholder-page" style={{ height: 'auto', padding: '60px 20px' }}>
          No products yet. Click "Add New Product" to get started!
        </div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <div className="product-image">
                {product.image ? (
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  '🥬'
                )}
              </div>
              <div className="product-details">
                <span className="product-category">{product.category}</span>
                <h3 className="product-name">{product.name}</h3>
                <div className="product-meta">
                  <span className="product-price">₹{product.price}/kg</span>
                  <span className="product-qty">{product.quantity || 'In Stock'}</span>
                </div>
              </div>
              <div className="product-actions">
                <button className="btn-edit" onClick={() => navigate('add-product')}>✏️ Edit</button>
                <button className="btn-delete" onClick={() => handleDelete(product._id)}>🗑️ Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;