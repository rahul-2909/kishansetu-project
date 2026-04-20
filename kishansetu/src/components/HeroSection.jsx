import React from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/HeroSection.css';
import heroImage from '../assets/main.jpg';

const HeroSection = () => {
    const navigate = useNavigate();

    return (
        <section id="hero" className="hero">
            <div className="hero-container">
                {/* Left Content */}
                <div className="hero-content">
                    <span className="hero-badge">
                        <span className="hero-badge-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M11 20A7 7 0 0 1 4 13C4 8.5 7.5 5 12 4c4.5 1 8 4.5 8 9a7 7 0 0 1-7 7" />
                                <path d="M12 4v16" />
                                <path d="M12 12c-2.5 0-4.5-1-6-3" />
                                <path d="M12 15c2.5 0 4.5-1 6-3" />
                            </svg>
                        </span>
                        Farm to Table
                    </span>

                    <h1 className="hero-heading">
                        Buy Fresh Directly
                        <br />
                        from Farmers
                        <span className="hero-emoji" aria-hidden="true">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 22V9" />
                                <path d="M5 14c0-3.5 2.5-5 7-5" />
                                <path d="M19 14c0-3.5-2.5-5-7-5" />
                                <path d="M12 9c-2.5 0-4.5-2-4.5-4.5" />
                                <path d="M12 9c2.5 0 4.5-2 4.5-4.5" />
                            </svg>
                        </span>
                    </h1>

                    <p className="hero-subtext">
                        No middlemen. Better prices for you, better income for farmers.
                    </p>

                    <div className="hero-buttons">
                        <button className="btn btn-primary" >
                            <span className="btn-icon">
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
                            Start Shopping
                        </button>
                        <button className="btn btn-secondary">
                            <span className="btn-icon">
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
                                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                    <path d="M2 17l10 5 10-5" />
                                    <path d="M2 12l10 5 10-5" />
                                </svg>
                            </span>
                            Sell Your Produce
                        </button>
                    </div>

                    {/* Trust Indicators */}
                    <div className="hero-trust">
                        <div className="trust-item">
                            <div className="trust-icon">
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                </svg>
                            </div>
                            <div>
                                <strong>100% Fresh</strong>
                                <span>Picked today</span>
                            </div>
                        </div>
                        <div className="trust-item">
                            <div className="trust-icon">
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                </svg>
                            </div>
                            <div>
                                <strong>5,000+</strong>
                                <span>Happy customers</span>
                            </div>
                        </div>
                        <div className="trust-item">
                            <div className="trust-icon">
                                <svg
                                    width="18"
                                    height="18"
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
                            </div>
                            <div>
                                <strong>200+</strong>
                                <span>Local farms</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Image */}
                <div className="hero-image-wrapper">
                    <div className="hero-image-container">
                        <img
                            src={heroImage}
                            alt="Fresh vegetables from farm"
                            className="hero-image"
                        />
                        {/* Floating Card 1 */}
                        <div className="floating-card card-top">
                            <div className="floating-card-icon" aria-hidden="true">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 20A7 7 0 0 1 5 13c0-4 3-7 7-8 4 1 7 4 7 8a7 7 0 0 1-7 7" />
                                    <path d="M12 5v15" />
                                    <path d="M12 11c-2.2 0-4-1-5.5-2.7" />
                                </svg>
                            </div>
                            <div>
                                <strong>Fresh Organic</strong>
                                <span>Pesticide free</span>
                            </div>
                        </div>
                        {/* Floating Card 2 */}
                        <div className="floating-card card-bottom">
                            <div className="floating-card-icon" aria-hidden="true">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="1" y="6" width="15" height="10" rx="2" />
                                    <path d="M16 9h4l3 3v4h-7z" />
                                    <circle cx="6" cy="18" r="2" />
                                    <circle cx="18" cy="18" r="2" />
                                </svg>
                            </div>
                            <div>
                                <strong>Same Day</strong>
                                <span>Home delivery</span>
                            </div>
                        </div>
                    </div>
                    {/* Background Decoration */}
                    <div className="hero-image-bg"></div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;

