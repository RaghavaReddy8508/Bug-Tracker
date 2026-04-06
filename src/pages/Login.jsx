// ============================================================
// Login — CLASS COMPONENT — 24BCE0965_L1_MP_RAGHAVA
// Developer: Raghava Reddy Mallidi (24BCE0965)
// constructor, this.state, controlled form, synthetic events
// ============================================================

import React, { Component } from 'react';
import { AuthContext_24BCE0965 } from '../context/AuthContext';
import { Link } from 'react-router-dom';

class Login_24BCE0965 extends Component {
  static contextType = AuthContext_24BCE0965;

  constructor(props_raghavaReddy) {
    super(props_raghavaReddy);
    this.state = {
      email_raghavaReddy: 'raghava@bugtrackr.dev',
      password_24BCE0965: '24BCE0965',
      error_raghavaReddy: '',
      showPassword_24BCE0965: false,
      isLoading_raghavaReddy: false,
    };
    console.log('🔐 Login_24BCE0965 constructor called — Raghava Reddy');
    this.handleSubmit_raghavaReddy = this.handleSubmit_raghavaReddy.bind(this);
    this.handleChange_24BCE0965 = this.handleChange_24BCE0965.bind(this);
  }

  handleChange_24BCE0965(e_raghavaReddy) {
    const { name, value } = e_raghavaReddy.target;
    this.setState({ [name]: value, error_raghavaReddy: '' });
  }

  handleSubmit_raghavaReddy(e_24BCE0965) {
    e_24BCE0965.preventDefault();
    const { email_raghavaReddy, password_24BCE0965 } = this.state;
    
    if (!email_raghavaReddy || !password_24BCE0965) {
      this.setState({ error_raghavaReddy: 'All fields are required — 24BCE0965 Raghava Reddy' });
      return;
    }

    this.setState({ isLoading_raghavaReddy: true });
    const { login_24BCE0965 } = this.context;
    const result_raghavaReddy = login_24BCE0965(email_raghavaReddy, password_24BCE0965);
    
    if (result_raghavaReddy.success) {
      console.log('✅ Login success — 24BCE0965 Raghava Reddy');
      window.location.href = '/dashboard';
    } else {
      this.setState({ error_raghavaReddy: result_raghavaReddy.error, isLoading_raghavaReddy: false });
    }
  }

  render() {
    const { email_raghavaReddy, password_24BCE0965, error_raghavaReddy, showPassword_24BCE0965, isLoading_raghavaReddy } = this.state;

    return (
      <div className="auth-page" id="login-24BCE0965">
        <div className="auth-container">
          <div className="auth-header">
            <Link to="/" className="auth-logo">🐛 BugTrackr</Link>
            <h1 className="auth-title">Welcome back</h1>
            <p className="auth-subtitle">Sign in to your account — 24BCE0965</p>
          </div>

          <form className="auth-form" onSubmit={this.handleSubmit_raghavaReddy}>
            {error_raghavaReddy && <div className="auth-error">❌ {error_raghavaReddy}</div>}

            <div className="form-group">
              <label className="form-label">Email</label>
              <input className="form-input" type="email" name="email_raghavaReddy" value={email_raghavaReddy} onChange={this.handleChange_24BCE0965} placeholder="raghava@bugtrackr.dev" />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="password-wrap">
                <input className="form-input" type={showPassword_24BCE0965 ? 'text' : 'password'} name="password_24BCE0965" value={password_24BCE0965} onChange={this.handleChange_24BCE0965} placeholder="Enter password" />
                <button type="button" className="password-toggle" onClick={() => this.setState(prev => ({ showPassword_24BCE0965: !prev.showPassword_24BCE0965 }))}>
                  {showPassword_24BCE0965 ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <button className="btn btn-primary btn-full" type="submit" disabled={isLoading_raghavaReddy}>
              {isLoading_raghavaReddy ? 'Signing in...' : 'Sign In — 24BCE0965'}
            </button>

            <div className="auth-hint">
              <p>Demo: <code>raghava@bugtrackr.dev</code> / <code>24BCE0965</code></p>
            </div>
          </form>

          <p className="auth-footer-link">
            Don't have an account? <Link to="/register">Register — Raghava Reddy</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default Login_24BCE0965;
