import React from 'react';
import '../styles/FarmerSpotlightSection.css';
import farmerImage from '../assets/farmer-home-page.png';

const farmerHighlights = [
  { value: '2,400+', label: 'Orders fulfilled' },
  { value: '4.9/5', label: 'Customer rating' },
  { value: '15+', label: 'Crop varieties' },
];

const farmerPromises = [
  'Freshly harvested each morning',
  'Chemical-free growing practices',
  'Direct pricing without middlemen',
];

const FarmerSpotlightSection = () => {
  return (
    <section className="spotlight" aria-labelledby="farmer-spotlight-title">
      <div className="spotlight-shell">
        <div className="spotlight-inner">
          <div className="spotlight-image-column">
            <div className="spotlight-image-card">
              <div className="spotlight-image-glow"></div>
              <img
                src={farmerImage}
                alt="Ramesh Patel standing in his organic farm"
                className="spotlight-image"
              />

              <div className="spotlight-exp-badge">
                <span className="exp-number">10+</span>
                <span className="exp-text">Years of trusted farming</span>
              </div>

              <div className="spotlight-harvest-card">
                <span className="spotlight-harvest-label">This week</span>
                <strong className="spotlight-harvest-value">120 baskets harvested</strong>
              </div>
            </div>
          </div>

          <div className="spotlight-content">
            <span className="spotlight-badge">Farmer Spotlight</span>

            <h2 id="farmer-spotlight-title" className="spotlight-title">
              Meet the farmer bringing fresh produce from field to family.
            </h2>

            <p className="spotlight-intro">
              Kishansetu helps local growers earn fairly while giving households access
              to fresher food, better traceability, and a real connection to the people
              behind each harvest.
            </p>

            <div className="spotlight-identity">
              <div className="spotlight-avatar" aria-hidden="true">RP</div>
              <div className="spotlight-identity-copy">
                <h3 className="spotlight-name">Ramesh Patel</h3>
                <p className="spotlight-role">Organic vegetable grower</p>
                <span className="spotlight-location">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Vadodara, Gujarat
                </span>
              </div>
            </div>

            <blockquote className="spotlight-quote">
              <p>
                "Before selling directly, most of the value of my crop went to middlemen.
                Now families know where their food comes from, and I finally earn what my
                work is worth."
              </p>
            </blockquote>

            <div className="spotlight-stats" role="list" aria-label="Farmer performance highlights">
              {farmerHighlights.map((item) => (
                <div key={item.label} className="spotlight-stat" role="listitem">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>

            <div className="spotlight-promises">
              {farmerPromises.map((promise) => (
                <div key={promise} className="spotlight-promise">
                  <span className="spotlight-promise-icon" aria-hidden="true">
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
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                  <span>{promise}</span>
                </div>
              ))}
            </div>

            <div className="spotlight-actions">
              {/* <button className="spotlight-cta" type="button">
                <span>Shop from Ramesh</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </button> */}

              <p className="spotlight-supporting-text">
                Direct orders, same-day dispatch, and transparent farm pricing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FarmerSpotlightSection;
