import React, { useState } from 'react';
import '../styles/TestimonialsSection.css';

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Ahmedabad',
    tag: 'Regular Buyer',
    rating: 5,
    text: 'Very fresh vegetables! I can literally taste the difference. My family loves the tomatoes and spinach from here.',
    avatar: 'PS',
    avatarColor: '#16a34a',
  },
  {
    id: 2,
    name: 'Amit Desai',
    location: 'Surat',
    tag: 'Weekly Order',
    rating: 5,
    text: 'Affordable and direct from farmers! The prices are 30-40% less than what I used to pay at the mandi. No brainer.',
    avatar: 'AD',
    avatarColor: '#d97706',
  },
  {
    id: 3,
    name: 'Meera Joshi',
    location: 'Vadodara',
    tag: 'Organic Lover',
    rating: 4,
    text: 'Finally a platform where I can trust the organic label. Clean produce, honest farmers, and super fast delivery.',
    avatar: 'MJ',
    avatarColor: '#2563eb',
  },
];

const StarRating = ({ count }) => {
  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={`star ${star <= count ? 'filled' : ''}`}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={star <= count ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </span>
      ))}
    </div>
  );
};

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="testimonials">
      <div className="testimonials-inner">

        {/* Header */}
        <div className="testimonials-header">
          <span className="testimonials-badge">Social Proof</span>
          <h2 className="testimonials-title">What Our Buyers Say</h2>
          <p className="testimonials-subtitle">
            Real people, real reviews, real fresh food
          </p>
        </div>

        {/* Cards */}
        <div className="testimonials-grid">
          {testimonials.map((item, index) => (
            <div
              className={`testimonial-card ${activeIndex === index ? 'active' : ''}`}
              key={item.id}
              onClick={() => setActiveIndex(index)}
              style={{
                '--avatar-color': item.avatarColor,
              }}
            >
              {/* Quote Mark */}
              <div className="testimonial-quote-mark">"</div>

              {/* Stars */}
              <StarRating count={item.rating} />

              {/* Text */}
              <p className="testimonial-text">{item.text}</p>

              {/* Author */}
              <div className="testimonial-author">
                <div className="testimonial-avatar">{item.avatar}</div>
                <div className="testimonial-author-info">
                  <span className="testimonial-name">{item.name}</span>
                  <span className="testimonial-location">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {item.location}
                  </span>
                </div>
                <span className="testimonial-tag">{item.tag}</span>
              </div>

              {/* Bottom accent */}
              <div className="testimonial-accent"></div>
            </div>
          ))}
        </div>

        {/* Dots Indicator */}
        <div className="testimonials-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`dot ${activeIndex === index ? 'active' : ''}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;