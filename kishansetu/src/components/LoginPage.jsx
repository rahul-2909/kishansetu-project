import React, { useState } from 'react';
import { Link } from "react-router-dom";
import '../styles/LoginPage.css';
import { useNavigate } from 'react-router-dom';
import { useToast } from './Toast';
import { apiUrl } from '../config/api';

const LoginPage = () => {
  const [role, setRole] = useState('buyer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { showError, showSuccess } = useToast();

  const validateForm = () => {
    const newErrors = {};
    if (!email || !email.includes('@')) newErrors.email = 'Valid email required';
    if (!password || password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch(apiUrl('/api/auth/login'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      if (role !== data.user.role) {
        const wrongRole = role === 'buyer' ? 'Seller' : 'Buyer';
        throw new Error(
          `This account is registered as a ${data.user.role}. Please select "${wrongRole}" to login.`
        );
      }

      localStorage.setItem('farmdirect_token', data.token);
      localStorage.setItem('farmdirect_user', JSON.stringify(data.user));
      showSuccess('Login successful!');

      if (data.user.role === 'seller') {
        navigate('/seller/dashboard');
      } else {
        navigate('/buyer/shop');
      }

    } catch (error) {
      console.error(error.message);
      showError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">

        {/* ===== LEFT — Branding Side ===== */}
        <div className="login-brand">
          <div className="login-brand-bg-circle c1"></div>
          <div className="login-brand-bg-circle c2"></div>
          <div className="login-brand-bg-circle c3"></div>

          <div className="login-brand-content">
            <div className="login-brand-logo">
              <span className="brand-logo-icon">🌱</span>
              <span className="brand-logo-text">Kishansetu</span>
            </div>

            <h1 className="login-brand-heading">
              Fresh from Farm
              <br />
              to Your Table
            </h1>
            <p className="login-brand-text">
              Buy directly from local farmers. No middlemen, better prices,
              fresher food. Join thousands of families who trust us.
            </p>

            {/* Trust Stats */}
            <div className="login-brand-stats">
              <div className="login-brand-stat">
                <strong>5,000+</strong>
                <span>Happy Families</span>
              </div>
              <div className="login-brand-stat-divider"></div>
              <div className="login-brand-stat">
                <strong>200+</strong>
                <span>Local Farmers</span>
              </div>
              <div className="login-brand-stat-divider"></div>
              <div className="login-brand-stat">
                <strong>100%</strong>
                <span>Fresh Produce</span>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="login-float f1">🥬</div>
            <div className="login-float f2">🍎</div>
            <div className="login-float f3">🥛</div>
            <div className="login-float f4">🌾</div>
          </div>
        </div>

        {/* ===== RIGHT — Form Side ===== */}
        <div className="login-form-side">
          <div className="login-form-wrapper">

            {/* Mobile Logo (hidden on desktop) */}
            <div className="login-mobile-logo">
              <span className="brand-logo-icon">🌱</span>
              <span className="brand-logo-text">FarmDirect</span>
            </div>

            {/* Heading */}
            <div className="login-form-header">
              <h2 className="login-form-title">Welcome back</h2>
              <p className="login-form-subtitle">
                Sign in to your {role === 'buyer' ? 'buyer' : 'seller'} account
              </p>
            </div>

            {/* Role Toggle */}
            <div className="login-role-toggle">
              <button
                className={`role-option ${role === 'buyer' ? 'active' : ''}`}
                onClick={() => setRole('buyer')}
                type="button"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                Buyer
              </button>
              <button
                className={`role-option ${role === 'seller' ? 'active' : ''}`}
                onClick={() => setRole('seller')}
                type="button"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
                Seller
              </button>
              <div
                className="role-slider"
                style={{ transform: `translateX(${role === 'buyer' ? '0' : '100%'})` }}
              ></div>
            </div>

            {/* Form */}
            <form className="login-form" onSubmit={handleSubmit}>

              {/* Email */}
              <div className={`input-group ${focusedField === 'email' ? 'focused' : ''} ${email ? 'filled' : ''}`}>
                <label htmlFor="email" className="input-label">Email Address</label>
                <div className="input-wrapper">
                  <span className="input-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </span>
                  <input
                    id="email"
                    type="email"
                    className="input-field"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    placeholder=" "
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className={`input-group ${focusedField === 'password' ? 'focused' : ''} ${password ? 'filled' : ''}`}>
                <label htmlFor="password" className="input-label">Password</label>
                <div className="input-wrapper">
                  <span className="input-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </span>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    className="input-field"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    placeholder=" "
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="login-form-row">
                <label className="checkbox-label">
                  <input type="checkbox" className="checkbox-input" />
                  <span className="checkbox-custom"></span>
                  <span>Remember me</span>
                </label>
                <a href="#" className="forgot-link">Forgot password?</a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`login-submit ${role}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="login-spinner"></span>
                ) : (
                  <>
                    <span>
                      {role === 'buyer' ? '🛒' : '🚜'} Sign in as{' '}
                      {role === 'buyer' ? 'Buyer' : 'Seller'}
                    </span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" />
                      <path d="M12 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="login-divider">
              <span>or continue with</span>
            </div>

            {/* Social Login */}
            <div className="login-socials">
              <button type="button" className="social-btn">
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Google
              </button>
              <button type="button" className="social-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  <polyline points="10 17 15 12 10 7" />
                  <line x1="15" y1="12" x2="3" y2="12" />
                </svg>
                Phone
              </button>
            </div>

            {/* Sign Up Link */}
            <p className="login-signup-text">
              Don't have an account?{' '}
              <Link to="/signup" className="signup-link">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
