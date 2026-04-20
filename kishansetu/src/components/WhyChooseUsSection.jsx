import React from 'react';
import '../styles/WhyChooseUsSection.css';

const reasons = [
  {
    emoji: '🌱',
    title: 'Fresh from Farm',
    description: 'Harvested today, delivered today — zero storage time',
    color: '#16a34a',
    bg: 'rgba(22, 163, 74, 0.06)',
    border: 'rgba(22, 163, 74, 0.12)',
  },
  {
    emoji: '💰',
    title: 'Better Prices',
    description: 'Cut out the markup — pay what the crop actually costs',
    color: '#d97706',
    bg: 'rgba(217, 119, 6, 0.06)',
    border: 'rgba(217, 119, 6, 0.12)',
  },
  {
    emoji: '🚫',
    title: 'No Middlemen',
    description: 'Direct farmer-to-buyer — no agents, no commissions',
    color: '#dc2626',
    bg: 'rgba(220, 38, 38, 0.06)',
    border: 'rgba(220, 38, 38, 0.12)',
  },
  {
    emoji: '📍',
    title: 'Local Farmers',
    description: 'Sourced from farms near you — support your community',
    color: '#2563eb',
    bg: 'rgba(37, 99, 235, 0.06)',
    border: 'rgba(37, 99, 235, 0.12)',
  },
];

const WhyChooseUsSection = () => {
  return (
    <section id="why-us" className="why-us">
      <div className="why-inner">

        {/* Header */}
        <div className="why-header">
          <span className="why-badge">Our Promise</span>
          <h2 className="why-title">Why Choose Us</h2>
          <p className="why-subtitle">
            We built this for farmers and buyers — not for profit in between
          </p>
        </div>

        {/* Cards */}
        <div className="why-grid">
          {reasons.map((item) => (
            <div
              className="why-card"
              key={item.title}
              style={{
                '--reason-color': item.color,
                '--reason-bg': item.bg,
                '--reason-border': item.border,
              }}
            >
              <div className="why-card-icon">{item.emoji}</div>
              <h3 className="why-card-title">{item.title}</h3>
              <p className="why-card-desc">{item.description}</p>
              <div className="why-card-accent"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
