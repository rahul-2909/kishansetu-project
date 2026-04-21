import React from 'react';
import '../styles/CtaSection.css';
import { useNavigate } from "react-router-dom";

const CtaSection = () => {
  const navigate = useNavigate();
  return (
    <section className="cta">
      <div className="cta-inner">

        {/* Background Decorations */}
        <div className="cta-bg-circle cta-circle-1"></div>
        <div className="cta-bg-circle cta-circle-2"></div>
        <div className="cta-bg-circle cta-circle-3"></div>

        <div className="cta-content">
          <span className="cta-badge">🌱 Join the Movement</span>
          <h2 className="cta-title">
            Start Buying Fresh Today 🌱
          </h2>
          <p className="cta-subtitle">
            Thousands of families already buy directly from local farmers.
            <br />
            Better food, better prices, better livelihoods.
          </p>

          <div className="cta-buttons">
            <button className="cta-btn cta-btn-white" onClick={() => navigate("/buyer/shop")}>
              <span className="cta-btn-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
              </span>
              <span>Start Shopping</span>
              <span className="cta-btn-arrow">
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
              </span>
            </button>

            <button className="cta-btn cta-btn-outline" onClick={() => navigate("/seller/dashboard")}>
              <span className="cta-btn-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </span>
              <span>Join as Farmer</span>
              <span className="cta-btn-arrow">
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
              </span>
            </button>
          </div>

          {/* Trust Line */}
          <div className="cta-trust">
            <div className="cta-trust-avatars">
              <span className="cta-avatar" style={{ background: '#15803d' }}>R</span>
              <span className="cta-avatar" style={{ background: '#d97706' }}>A</span>
              <span className="cta-avatar" style={{ background: '#2563eb' }}>M</span>
              <span className="cta-avatar" style={{ background: '#dc2626' }}>P</span>
              <span className="cta-avatar cta-avatar-more">+5k</span>
            </div>
            <span className="cta-trust-text">
              Joined by <strong>5,000+</strong> happy families
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;