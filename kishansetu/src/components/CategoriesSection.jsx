import React, { useState } from 'react';
import '../styles/CategoriesSection.css';

const categories = [
  {
    id: 'vegetables',
    name: 'Vegetables',
    emoji: '🥕',
    count: 124,
    color: '#16a34a',
    bg: 'rgba(22, 163, 74, 0.08)',
    border: 'rgba(22, 163, 74, 0.15)',
  },
  {
    id: 'fruits',
    name: 'Fruits',
    emoji: '🍎',
    count: 89,
    color: '#dc2626',
    bg: 'rgba(220, 38, 38, 0.08)',
    border: 'rgba(220, 38, 38, 0.15)',
  },
  {
    id: 'grains',
    name: 'Grains',
    emoji: '🌾',
    count: 56,
    color: '#d97706',
    bg: 'rgba(217, 119, 6, 0.08)',
    border: 'rgba(217, 119, 6, 0.15)',
  },
  {
    id: 'dairy',
    name: 'Dairy',
    emoji: '🥛',
    count: 34,
    color: '#2563eb',
    bg: 'rgba(37, 99, 235, 0.08)',
    border: 'rgba(37, 99, 235, 0.15)',
  },
  {
    id: 'organic',
    name: 'Organic',
    emoji: '🌿',
    count: 67,
    color: '#059669',
    bg: 'rgba(5, 150, 105, 0.08)',
    border: 'rgba(5, 150, 105, 0.15)',
  },
  {
    id: 'spices',
    name: 'Spices',
    emoji: '🌶️',
    count: 43,
    color: '#ea580c',
    bg: 'rgba(234, 88, 12, 0.08)',
    border: 'rgba(234, 88, 12, 0.15)',
  },
];

const CategoriesSection = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  const handleClick = (id) => {
    setActiveCategory(id === activeCategory ? null : id);
    console.log('Browse category:', id);
    // Replace with: navigate(`/category/${id}`)
  };

  return (
    <section id="categories" className="categories">
      <div className="categories-inner">
        {/* Section Header */}
        <div className="categories-header">
          <div>
            <span className="categories-badge">Browse</span>
            <h2 className="categories-title">Shop by Category</h2>
            <p className="categories-subtitle">
              Fresh produce sorted the way you want it
            </p>
          </div>
          <button className="categories-view-all">
            View All
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Category Cards */}
        <div className="categories-grid">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`category-card ${activeCategory === cat.id ? 'active' : ''}`}
              style={{
                '--cat-color': cat.color,
                '--cat-bg': cat.bg,
                '--cat-border': cat.border,
              }}
              onClick={() => handleClick(cat.id)}
            >
              <div className="category-emoji">{cat.emoji}</div>
              <div className="category-info">
                <span className="category-name">{cat.name}</span>
                <span className="category-count">{cat.count} products</span>
              </div>
              <div className="category-arrow">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
