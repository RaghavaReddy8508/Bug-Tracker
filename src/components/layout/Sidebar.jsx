// ============================================================
// Sidebar — 24BCE0965_L1_MP_RAGHAVA
// Developer: Raghava Reddy Mallidi (24BCE0965)
// Persistent nav, active link
// ============================================================

import React, { useContext, useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext_24BCE0965 } from '../../context/AuthContext';
import { NotifContext_24BCE0965 } from '../../context/NotifContext';

export default function Sidebar_24BCE0965() {
  const { user, logout_24BCE0965 } = useContext(AuthContext_24BCE0965);
  const { unreadCount } = useContext(NotifContext_24BCE0965);
  const navigate_raghavaReddy = useNavigate();

  const [theme, setTheme] = useState(() => localStorage.getItem('theme_24BCE0965') || 'dark');
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme_24BCE0965', theme);
  }, [theme]);
  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const navItems_24BCE0965 = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/projects', label: 'Projects', icon: '📁' },
    { path: '/bugs', label: 'All Bugs', icon: '🐛' },
    { path: '/kanban', label: 'Kanban', icon: '📋' },
    { path: '/report', label: 'Report Bug', icon: '➕' },
    { path: '/search', label: 'Search', icon: '🔍' },
    { path: '/analytics', label: 'Analytics', icon: '📈' },
    { path: '/notifications', label: 'Notifications', icon: '🔔' },
    { path: '/team', label: 'Team', icon: '👥' },
    { path: '/activity', label: 'Activity', icon: '📜' },
    { path: '/portfolio', label: 'Portfolio', icon: '🌐' },
  ];

  const handleLogout_raghavaReddy = () => {
    logout_24BCE0965();
    navigate_raghavaReddy('/login');
    console.log('👋 Logged out — 24BCE0965 Raghava Reddy');
  };

  return (
    <aside className="sidebar" id="sidebar-24BCE0965">
      <div className="sidebar-brand" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className="sidebar-logo">
            <span className="logo-icon">🐛</span>
            <span className="logo-text">BugTrackr</span>
          </div>
          <span className="sidebar-version">v1.0 — 24BCE0965</span>
        </div>
        <button 
          onClick={toggleTheme} 
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            color: 'var(--text)',
            cursor: 'pointer'
          }}
          title="Toggle Theme"
        >
          {theme === 'dark' ? '🌙' : '☀️'}
        </button>
      </div>

      <nav className="sidebar-nav">
        {navItems_24BCE0965.map((item_raghavaReddy) => (
          <NavLink
            key={item_raghavaReddy.path}
            to={item_raghavaReddy.path}
            className={({ isActive }) =>
              `nav-item ${isActive ? 'active' : ''}`
            }
          >
            <span className="nav-icon">{item_raghavaReddy.icon}</span>
            <span className="nav-label">{item_raghavaReddy.label}</span>
            {item_raghavaReddy.path === '/notifications' && unreadCount > 0 && (
              <span className="nav-badge">{unreadCount}</span>
            )}
          </NavLink>
        ))}
      </nav>

      {user && (
        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div
              className="sidebar-avatar"
              style={{ background: user.avatar || '#3b5bdb' }}
            >
              {(user.name_raghavaReddy || 'R')[0]}
            </div>
            <div className="sidebar-user-info">
              <span className="sidebar-user-name">
                {user.name_raghavaReddy || 'Raghava Reddy'}
              </span>
              <span className="sidebar-user-role">{user.role || 'Admin'}</span>
            </div>
          </div>
          <button
            className="sidebar-logout"
            onClick={handleLogout_raghavaReddy}
            id="logout-btn-24BCE0965"
          >
            🚪 Logout
          </button>
        </div>
      )}
    </aside>
  );
}
