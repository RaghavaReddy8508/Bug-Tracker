// ============================================================
// Landing Page — 24BCE0965_L1_MP_RAGHAVA
// Developer: Raghava Reddy Mallidi (24BCE0965)
// JSX, Functional component, useContext, Conditional rendering
// ============================================================

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext_24BCE0965 } from '../context/AuthContext';

const features_24BCE0965 = [
  { icon: '🐛', title: 'Track Bugs', desc: 'Log, categorize, and monitor every bug across all your projects with precision.' },
  { icon: '📋', title: 'Kanban Board', desc: 'Drag and drop bugs between status columns for visual workflow management.' },
  { icon: '📈', title: 'Analytics', desc: 'Charts, metrics, and team leaderboard — understand your bug resolution trends.' },
  { icon: '🔍', title: 'Smart Search', desc: 'Search across bugs, projects, and team members instantly with debounced filtering.' },
  { icon: '👥', title: 'Team Management', desc: 'Assign bugs, track workloads, and see who is online in real-time.' },
  { icon: '🔔', title: 'Notifications', desc: 'Never miss an assignment, mention, or status change with live notification feed.' },
];

export default function Landing_24BCE0965() {
  const { user } = useContext(AuthContext_24BCE0965);

  return (
    <div className="landing-page" id="landing-24BCE0965">
      {/* Navbar */}
      <nav className="landing-nav">
        <div className="landing-nav-brand">
          <span className="logo-icon">🐛</span>
          <span className="logo-text">BugTrackr</span>
          <span className="landing-badge">by 24BCE0965</span>
        </div>
        <div className="landing-nav-links">
          <a href="#features">Features</a>
          <a href="#about">About</a>
          {user ? (
            <Link to="/dashboard" className="btn btn-primary">Go to Dashboard →</Link>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost">Login</Link>
              <Link to="/register" className="btn btn-primary">Get Started</Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section className="landing-hero">
        <div className="hero-glow"></div>
        <h1 className="hero-title">
          Bug tracking,<br /><span className="hero-highlight">built right.</span>
        </h1>
        <p className="hero-subtitle">
          A complete bug tracking platform by <strong>Raghava Reddy Mallidi (24BCE0965)</strong>. 
          Track, manage, and resolve bugs across your projects with a beautiful, modern interface.
        </p>
        <div className="hero-ctas">
          {user ? (
            <Link to="/dashboard" className="btn btn-primary btn-lg">Open Dashboard →</Link>
          ) : (
            <>
              <Link to="/register" className="btn btn-primary btn-lg">Start Tracking →</Link>
              <Link to="/login" className="btn btn-ghost btn-lg">Login</Link>
            </>
          )}
        </div>
        <div className="hero-stats">
          <div className="hero-stat"><span className="hero-stat-num">25+</span><span>Bugs Tracked</span></div>
          <div className="hero-stat"><span className="hero-stat-num">5</span><span>Projects</span></div>
          <div className="hero-stat"><span className="hero-stat-num">8</span><span>Team Members</span></div>
          <div className="hero-stat"><span className="hero-stat-num">15+</span><span>Pages</span></div>
        </div>
      </section>

      {/* Features */}
      <section className="landing-features" id="features">
        <h2 className="section-title">Everything you need</h2>
        <p className="section-subtitle">Powerful features for modern bug tracking — built by Raghava Reddy (24BCE0965)</p>
        <div className="features-grid">
          {features_24BCE0965.map((f, i) => (
            <div key={i} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About / Developer */}
      <section className="landing-about" id="about">
        <div className="about-card">
          <div className="about-avatar" style={{ background: '#3b5bdb' }}>RR</div>
          <h3>Raghava Reddy Mallidi</h3>
          <p className="about-reg">Registration: 24BCE0965</p>
          <p className="about-desc">
            Computer Science student at VIT Vellore. Aspiring Web Developer with expertise in 
            HTML, CSS, JavaScript, React, C, C++, and Java. Currently on a focused journey to 
            build interactive web experiences.
          </p>
          <div className="about-links">
            <a href="https://www.linkedin.com/in/raghavareddymallidi" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              🔗 LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <span>🐛 BugTrackr</span>
            <span className="footer-credit">Built by Raghava Reddy Mallidi — 24BCE0965 — VIT Vellore</span>
          </div>
          <div className="footer-links">
            <span>React 18</span>
            <span>•</span>
            <span>react-router-dom v6</span>
            <span>•</span>
            <span>recharts</span>
            <span>•</span>
            <span>@dnd-kit</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
