import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/SignupPage.css';
import { useToast } from './Toast';
import { apiUrl } from '../config/api';

const SignupPage = () => {
  const navigate = useNavigate();
  const { showError, showSuccess } = useToast();

  const [role, setRole] = useState('buyer');
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Track which fields user has interacted with
  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear submit error when user types
    if (submitError) setSubmitError('');
  };

  // ===== VALIDATION RULES =====
  const errors = useMemo(() => {
    const errs = {};

    // Full Name
    if (!form.fullName.trim()) {
      errs.fullName = 'Full name is required';
    } else if (form.fullName.trim().length < 2) {
      errs.fullName = 'Name must be at least 2 characters';
    } else if (!/^[a-zA-Z\s.'-]+$/.test(form.fullName.trim())) {
      errs.fullName = 'Name can only contain letters, spaces, dots, hyphens';
    }

    // Phone
    if (!form.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(form.phone.trim())) {
      errs.phone = 'Enter a valid 10-digit Indian phone number';
    }

    // Email
    if (!form.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errs.email = 'Enter a valid email address';
    }

    // Password
    if (!form.password) {
      errs.password = 'Password is required';
    } else if (form.password.length < 8) {
      errs.password = 'Password must be at least 8 characters';
    }

    // Confirm Password
    if (!form.confirmPassword) {
      errs.confirmPassword = 'Please confirm your password';
    } else if (form.password !== form.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
    }

    // Terms
    if (!form.agreeTerms) {
      errs.agreeTerms = 'You must agree to the terms';
    }

    return errs;
  }, [form]);

  // Only show errors for fields the user has touched
  const visibleErrors = {};
  Object.keys(errors).forEach((key) => {
    if (touched[key]) visibleErrors[key] = errors[key];
  });

  // ===== PASSWORD STRENGTH =====
  const passwordStrength = useMemo(() => {
    const p = form.password;
    if (!p) return { score: 0, label: '', color: '' };

    let score = 0;
    if (p.length >= 8) score++;
    if (p.length >= 12) score++;
    if (/[a-z]/.test(p) && /[A-Z]/.test(p)) score++;
    if (/\d/.test(p)) score++;
    if (/[^a-zA-Z0-9]/.test(p)) score++;

    if (score <= 1) return { score: 1, label: 'Weak', color: '#ef4444' };
    if (score <= 2) return { score: 2, label: 'Fair', color: '#f97316' };
    if (score <= 3) return { score: 3, label: 'Good', color: '#eab308' };
    if (score <= 4) return { score: 4, label: 'Strong', color: '#16a34a' };
    return { score: 5, label: 'Very Strong', color: '#15803d' };
  }, [form.password]);

  const isFormValid = Object.keys(errors).length === 0;

  // ===== SUBMIT =====
  const handleSubmit = async(e) => {
    e.preventDefault();
    // Touch all fields to show all errors
    setTouched({
      fullName: true,
      phone: true,
      email: true,
      password: true,
      confirmPassword: true,
      agreeTerms: true,
    });

    if (!isFormValid) return;

    setIsSubmitting(true);
    setSubmitError('');

    // Simulate API call
    // setTimeout(() => {
    //   setIsSubmitting(false);
    //   console.log('Signup as', role, form);

    //   // Replace with actual API call, then navigate:
    //   navigate('/login');
    // }, 1800);

    try {
      // Here you would make an actual API call to your backend to create the user
      const response = await fetch(apiUrl('/api/auth/signup'), {
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fullName: form.fullName.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          password: form.password,
          role: role
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create account');
      }

      // Handle successful signup (e.g., redirect to login)
      showSuccess('Account created successfully! Please log in.');
      navigate('/login');
    } catch (error) {
      showError(error.message);
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">

        {/* ===== LEFT — BRANDING SIDE ===== */}
        <div className="signup-brand">
          <div className="signup-brand-bg-circle c1"></div>
          <div className="signup-brand-bg-circle c2"></div>
          <div className="signup-brand-bg-circle c3"></div>

          <div className="signup-brand-content">
            <div className="signup-brand-logo">
              <span className="brand-logo-icon">🌱</span>
              <span className="brand-logo-text">Kishansetu</span>
            </div>

            <h1 className="signup-brand-heading">
              Join the
              <br />
              Fresh Food Movement
            </h1>
            <p className="signup-brand-text">
              Create your account and start buying directly from local farmers
              or list your produce for thousands of buyers.
            </p>

            {/* Perks */}
            <div className="signup-brand-perks">
              <div className="signup-perk">
                <span className="signup-perk-icon">✓</span>
                <span>No middlemen, fair prices</span>
              </div>
              <div className="signup-perk">
                <span className="signup-perk-icon">✓</span>
                <span>Same-day delivery</span>
              </div>
              <div className="signup-perk">
                <span className="signup-perk-icon">✓</span>
                <span>100% fresh guarantee</span>
              </div>
              <div className="signup-perk">
                <span className="signup-perk-icon">✓</span>
                <span>Support local farmers</span>
              </div>
            </div>

            <div className="signup-float f1">🥬</div>
            <div className="signup-float f2">🍅</div>
            <div className="signup-float f3">🧅</div>
            <div className="signup-float f4">🌽</div>
          </div>
        </div>

        {/* ===== RIGHT — FORM SIDE ===== */}
        <div className="signup-form-side">
          <div className="signup-form-wrapper">

            {/* Mobile Logo */}
            <div className="signup-mobile-logo">
              <span className="brand-logo-icon">🌱</span>
              <span className="brand-logo-text">FarmDirect</span>
            </div>

            {/* Header */}
            <div className="signup-form-header">
              <h2 className="signup-form-title">Create account</h2>
              <p className="signup-form-subtitle">
                Join as a buyer or seller to get started
              </p>
            </div>

            {/* Role Toggle */}
            <div className="signup-role-toggle">
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

            {/* Submit Error */}
            {submitError && (
              <div className="signup-error-banner">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
                {submitError}
              </div>
            )}

            {/* Form */}
            <form className="signup-form" onSubmit={handleSubmit} noValidate>

              {/* Full Name */}
              <div className={`input-group ${visibleErrors.fullName ? 'error' : ''} ${form.fullName && !visibleErrors.fullName ? 'valid' : ''}`}>
                <label htmlFor="fullName" className="input-label">Full Name</label>
                <div className="input-wrapper">
                  <span className="input-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </span>
                  <input
                    id="fullName"
                    type="text"
                    className="input-field"
                    value={form.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    onBlur={() => handleBlur('fullName')}
                    placeholder=" "
                    autoComplete="name"
                  />
                  {form.fullName && !visibleErrors.fullName && (
                    <span className="input-valid-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                  )}
                </div>
                {visibleErrors.fullName && (
                  <span className="input-error">{visibleErrors.fullName}</span>
                )}
              </div>

              {/* Phone */}
              <div className={`input-group ${visibleErrors.phone ? 'error' : ''} ${form.phone && !visibleErrors.phone ? 'valid' : ''}`}>
                <label htmlFor="phone" className="input-label">Phone Number</label>
                <div className="input-wrapper">
                  <span className="input-prefix">+91</span>
                  <span className="input-icon input-icon-after-prefix">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </span>
                  <input
                    id="phone"
                    type="tel"
                    className="input-field input-field-with-prefix"
                    value={form.phone}
                    onChange={(e) => {
                      // Only allow digits, max 10
                      const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                      handleChange('phone', val);
                    }}
                    onBlur={() => handleBlur('phone')}
                    placeholder=" "
                    autoComplete="tel"
                    maxLength={10}
                  />
                  {form.phone && !visibleErrors.phone && (
                    <span className="input-valid-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                  )}
                </div>
                {visibleErrors.phone && (
                  <span className="input-error">{visibleErrors.phone}</span>
                )}
              </div>

              {/* Email */}
              <div className={`input-group ${visibleErrors.email ? 'error' : ''} ${form.email && !visibleErrors.email ? 'valid' : ''}`}>
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
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    placeholder=" "
                    autoComplete="email"
                  />
                  {form.email && !visibleErrors.email && (
                    <span className="input-valid-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                  )}
                </div>
                {visibleErrors.email && (
                  <span className="input-error">{visibleErrors.email}</span>
                )}
              </div>

              {/* Password */}
              <div className={`input-group ${visibleErrors.password ? 'error' : ''} ${form.password && !visibleErrors.password ? 'valid' : ''}`}>
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
                    value={form.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    onBlur={() => handleBlur('password')}
                    placeholder=" "
                    autoComplete="new-password"
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
                {/* Password Strength Meter */}
                {form.password && (
                  <div className="password-strength">
                    <div className="strength-bars">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className="strength-bar"
                          style={{
                            backgroundColor: level <= passwordStrength.score
                              ? passwordStrength.color
                              : '#e2e8f0',
                          }}
                        ></div>
                      ))}
                    </div>
                    <span
                      className="strength-label"
                      style={{ color: passwordStrength.color }}
                    >
                      {passwordStrength.label}
                    </span>
                  </div>
                )}
                {visibleErrors.password && (
                  <span className="input-error">{visibleErrors.password}</span>
                )}
              </div>

              {/* Confirm Password */}
              <div className={`input-group ${visibleErrors.confirmPassword ? 'error' : ''} ${form.confirmPassword && !visibleErrors.confirmPassword ? 'valid' : ''}`}>
                <label htmlFor="confirmPassword" className="input-label">Confirm Password</label>
                <div className="input-wrapper">
                  <span className="input-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </span>
                  <input
                    id="confirmPassword"
                    type={showConfirm ? 'text' : 'password'}
                    className="input-field"
                    value={form.confirmPassword}
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                    onBlur={() => handleBlur('confirmPassword')}
                    placeholder=" "
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirm(!showConfirm)}
                    tabIndex={-1}
                  >
                    {showConfirm ? (
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
                {visibleErrors.confirmPassword && (
                  <span className="input-error">{visibleErrors.confirmPassword}</span>
                )}
              </div>

              {/* Terms Checkbox */}
              <div className={`terms-group ${visibleErrors.agreeTerms ? 'error' : ''}`}>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    checked={form.agreeTerms}
                    onChange={(e) => handleChange('agreeTerms', e.target.checked)}
                    onBlur={() => handleBlur('agreeTerms')}
                  />
                  <span className="checkbox-custom"></span>
                  <span>
                    I agree to the{' '}
                    <a href="#" className="terms-link">Terms of Service</a>
                    {' '}and{' '}
                    <a href="#" className="terms-link">Privacy Policy</a>
                  </span>
                </label>
                {visibleErrors.agreeTerms && (
                  <span className="input-error">{visibleErrors.agreeTerms}</span>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className={`signup-submit ${role}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="login-spinner"></span>
                ) : (
                  <>
                    <span>
                      Create {role === 'buyer' ? 'Buyer' : 'Seller'} Account
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
            <div className="signup-divider">
              <span>or sign up with</span>
            </div>

            {/* Social */}
            <div className="signup-socials">
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
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Phone OTP
              </button>
            </div>

            {/* Login Link */}
            <p className="signup-login-text">
              Already have an account?{' '}
              <Link to="/login" className="login-link">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
