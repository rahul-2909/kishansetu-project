import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { useToast } from '../Toast';
import { apiUrl } from '../../config/api';

const Products = ({ onEditProduct }) => {
  const { showError, showSuccess, showInfo } = useToast();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('farmdirect_token');
        const response = await fetch(apiUrl('/api/seller/products'), {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to load products');
        }

        setProducts(data);
      } catch (err) {
        setError(err.message || 'Failed to load products');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('farmdirect_token');
      const response = await fetch(apiUrl(`/api/seller/products/${id}`), {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete product');
      }

      setProducts((currentProducts) => currentProducts.filter((product) => product._id !== id));
      setDeleteConfirm(null);
      showSuccess('Product deleted successfully!');
    } catch (err) {
      showError(err.message || 'Failed to delete product');
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>My Products</h1>
      </div>

      {error ? (
        <div style={{ padding: '16px', backgroundColor: '#fef2f2', color: '#dc2626', borderRadius: 12, marginBottom: 20 }}>
          {error}
        </div>
      ) : isLoading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <div className="placeholder-page" style={{ height: 'auto', padding: '60px 20px' }}>
          No products yet. Click "Add Product" to get started!
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
                  'P'
                )}
              </div>

              <div className="product-details">
                <span className="product-category">{product.category}</span>
                <h3 className="product-name">{product.name}</h3>
                <div className="product-meta">
                  <span className="product-price">Rs. {product.price}/kg</span>
                  <span className="product-qty">{product.quantity || 'In Stock'}</span>
                </div>
              </div>

              <div className="product-actions">
                <button className="btn-edit" onClick={() => onEditProduct(product)}>Edit</button>
                <button className="btn-delete" onClick={() => setDeleteConfirm(product._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {deleteConfirm && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '16px',
            padding: '28px',
            maxWidth: '400px',
            boxShadow: '0 20px 25px rgba(0,0,0,0.15)',
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 8px 0', color: '#0f172a' }}>Delete Product?</h2>
            <p style={{ color: '#64748b', margin: '0 0 24px 0', fontSize: '14px' }}>
              This action cannot be undone. The product will be permanently deleted.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button onClick={() => setDeleteConfirm(null)} style={{
                padding: '10px 18px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                background: '#f8fafc',
                color: '#334155',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '14px',
              }}>
                Cancel
              </button>
              <button onClick={() => {
                handleDelete(deleteConfirm);
              }} style={{
                padding: '10px 18px',
                borderRadius: '8px',
                border: 'none',
                background: '#dc2626',
                color: '#fff',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '14px',
              }}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
