// import React, { useState, useEffect } from 'react';
// import './Dashboard.css';

// const DashboardHome = () => {
//   const [stats, setStats] = useState(null);
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const token = localStorage.getItem('farmdirect_token');

//         const statsRes = await fetch('http://localhost:5000/api/seller/stats', {
//           headers: { Authorization: `Bearer ${token}` }
//         });

//         const statsData = await statsRes.json();

//         setStats(statsData);
//         console.log('Dashboard stats loaded:', statsData);
//         setUser(JSON.parse(localStorage.getItem('farmdirect_user')));
//       } catch (error) {
//         console.error('Dashboard load error:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   // ✅ FIX 1: close properly
//   if (isLoading || !stats || !user) {
//     return (
//       <div className="home-container">
//         <div className="loading-spinner-wrapper">
//           <div className="loading-spinner"></div>
//           <p>Loading dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   const displayStats = [
//     {
//       title: 'Active Products',
//       value: stats.totalProducts + ' items',
//       icon: '🥕',
//       color: '#16a34a',
//       bg: 'rgba(22, 123, 74, 0.08)'
//     },
//     {
//       title: 'Profile Views',
//       value: stats.profileViews,
//       icon: '👀',
//       color: '#2563eb',
//       bg: 'rgba(37, 99, 235, 0.08)'
//     },
//     {
//       title: 'Your Location',
//       value: stats.location.split(',')[0] || 'Not Set',
//       icon: '📍',
//       color: '#d97706',
//       bg: 'rgba(210, 119, 6, 0.08)'
//     },
//     {
//       title: 'Contact Number',
//       value: stats.phone || 'Not Set',
//       icon: '📞',
//       color: '#dc2626',
//       bg: 'rgba(220, 38, 38, 0.08)' // ✅ FIX 2
//     }
//   ];

//   return (
//     <div className="home-container">
//       <h1 className="home-welcome">Welcome back! 👋</h1>

//       <div className="stats-grid">
//         {displayStats.map((stat) => (
//           <div className="stat-card" key={stat.title}>
//             <div
//               className="stat-icon-wrapper"
//               style={{ backgroundColor: stat.bg, color: stat.color }}
//             >
//               <span>{stat.icon}</span>
//             </div>

//             <div className="stat-info">
//               <span className="stat-title">{stat.title}</span>

//               {/* ✅ FIX 3 */}
//               <span
//                 className={`stat-value ${
//                   stat.title === 'Contact Number' && stat.value !== 'Not Set'
//                     ? 'text-success'
//                     : 'text-warning'
//                 }`}
//               >
//                 {stat.value}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* BUYER PREVIEW */}
//       <div className="preview-section">
//         <h2>🧑‍🌾 How Buyers See You</h2>

//         <div className="buyer-preview-card">
//           <div className="preview-header">
//             <div className="preview-avatar">
//               {user.fullName ? user.fullName.charAt(0) : 'F'}
//             </div>

//             <div className="preview-info">
//               <h3>{user.fullName || 'Your Name'}</h3>
//               <p className="preview-location">
//                 {/* 📍 {user.city || 'Your City, Gujarat'} */}
//                 📍 {stats.location || 'Your City, Gujarat'}
//               </p>
//             </div>
//           </div>

//           <p className="preview-description">
//             {stats.description ||
//               'Add a short description about your farm in your Profile settings...'}
//           </p>

//           <div className="preview-contact-box">
//             <span className="preview-label">
//               For Orders & Enquiries, Contact:
//             </span>

//             <div className="preview-phone-big">
//               <span>📞</span> {stats.phone || 'Your Phone Number'}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardHome;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const DashboardHome = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('farmdirect_token');

        const statsRes = await fetch('http://localhost:5000/api/seller/stats', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const statsData = await statsRes.json();

        setStats(statsData);
        console.log('Dashboard stats loaded:', statsData);
        setUser(JSON.parse(localStorage.getItem('farmdirect_user')));
      } catch (error) {
        console.error('Dashboard load error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading || !stats || !user) {
    return (
      <div className="home-container">
        <div className="loading-spinner-wrapper">
          <div className="loading-spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const displayStats = [
    {
      title: 'Active Products',
      value: stats.totalProducts + ' items',
      icon: '🥕',
      color: '#16a34a',
      bg: 'rgba(22, 123, 74, 0.08)'
    },
    {
      title: 'Profile Views',
      value: stats.profileViews,
      icon: '👀',
      color: '#2563eb',
      bg: 'rgba(37, 99, 235, 0.08)'
    },
    {
      title: 'Your Location',
      value: stats.location.split(',')[0] || 'Not Set',
      icon: '📍',
      color: '#d97706',
      bg: 'rgba(210, 119, 6, 0.08)'
    },
    {
      title: 'Contact Number',
      value: stats.phone || 'Not Set',
      icon: '📞',
      color: '#dc2626',
      bg: 'rgba(220, 38, 38, 0.08)'
    }
  ];

  return (
    <div className="home-container">
      
      {/* Top Bar with Home Button */}
      <div className="home-top-bar">
        <h1 className="home-welcome">Welcome back! 👋</h1>
        <button className="home-btn" onClick={() => navigate('/')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          Home
        </button>
      </div>

      <div className="stats-grid">
        {displayStats.map((stat) => (
          <div className="stat-card" key={stat.title}>
            <div
              className="stat-icon-wrapper"
              style={{ backgroundColor: stat.bg, color: stat.color }}
            >
              <span>{stat.icon}</span>
            </div>

            <div className="stat-info">
              <span className="stat-title">{stat.title}</span>

              <span
                className={`stat-value ${
                  stat.title === 'Contact Number' && stat.value !== 'Not Set'
                    ? 'text-success'
                    : 'text-warning'
                }`}
              >
                {stat.value}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* BUYER PREVIEW */}
      <div className="preview-section">
        <h2>🧑‍🌾 How Buyers See You</h2>

        <div className="buyer-preview-card">
          <div className="preview-header">
            <div className="preview-avatar">
              {user.fullName ? user.fullName.charAt(0) : 'F'}
            </div>

            <div className="preview-info">
              <h3>{user.fullName || 'Your Name'}</h3>
              <p className="preview-location">
                📍 {stats.location || 'Your City, Gujarat'}
              </p>
            </div>
          </div>

          <p className="preview-description">
            {stats.description ||
              'Add a short description about your farm in your Profile settings...'}
          </p>

          <div className="preview-contact-box">
            <span className="preview-label">
              For Orders & Enquiries, Contact:
            </span>

            <div className="preview-phone-big">
              <span>📞</span> {stats.phone || 'Your Phone Number'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;