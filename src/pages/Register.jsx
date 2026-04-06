// ============================================================
// Register — CLASS COMPONENT — 24BCE0965_L1_MP_RAGHAVA
// Developer: Raghava Reddy Mallidi (24BCE0965)
// ============================================================
import React, { Component } from 'react';
import { AuthContext_24BCE0965 } from '../context/AuthContext';
import { Link } from 'react-router-dom';

class Register_24BCE0965 extends Component {
  static contextType = AuthContext_24BCE0965;

  constructor(props_raghavaReddy) {
    super(props_raghavaReddy);
    this.state = {
      name_raghavaReddy: '',
      email_24BCE0965: '',
      password_raghavaReddy: '',
      confirmPassword_24BCE0965: '',
      role_raghavaReddy: 'Developer',
      error_24BCE0965: '',
      passwordStrength_raghavaReddy: 0,
    };
    console.log('📝 Register_24BCE0965 constructor — Raghava Reddy');
  }

  handleChange_raghavaReddy = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value, error_24BCE0965: '' });
    if (name === 'password_raghavaReddy') {
      let strength = 0;
      if (value.length >= 6) strength++;
      if (value.length >= 10) strength++;
      if (/[A-Z]/.test(value)) strength++;
      if (/[0-9]/.test(value)) strength++;
      if (/[^A-Za-z0-9]/.test(value)) strength++;
      this.setState({ passwordStrength_raghavaReddy: strength });
    }
  };

  handleSubmit_24BCE0965 = (e) => {
    e.preventDefault();
    const { name_raghavaReddy, email_24BCE0965, password_raghavaReddy, confirmPassword_24BCE0965, role_raghavaReddy } = this.state;
    if (!name_raghavaReddy || !email_24BCE0965 || !password_raghavaReddy || !confirmPassword_24BCE0965) {
      this.setState({ error_24BCE0965: 'All fields required — 24BCE0965' }); return;
    }
    if (password_raghavaReddy !== confirmPassword_24BCE0965) {
      this.setState({ error_24BCE0965: 'Passwords do not match — 24BCE0965' }); return;
    }
    if (password_raghavaReddy.length < 6) {
      this.setState({ error_24BCE0965: 'Password must be at least 6 characters — 24BCE0965' }); return;
    }
    const { register_24BCE0965 } = this.context;
    const result = register_24BCE0965({ name_raghavaReddy, email: email_24BCE0965, password: password_raghavaReddy, role: role_raghavaReddy });
    if (result.success) {
      window.location.href = '/dashboard';
    } else {
      this.setState({ error_24BCE0965: result.error });
    }
  };

  render() {
    const { name_raghavaReddy, email_24BCE0965, password_raghavaReddy, confirmPassword_24BCE0965, role_raghavaReddy, error_24BCE0965, passwordStrength_raghavaReddy } = this.state;
    const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Excellent'];
    const strengthColors = ['', '#ef4444', '#f59e0b', '#3b82f6', '#22c55e', '#10b981'];

    return (
      <div className="auth-page" id="register-24BCE0965">
        <div className="auth-container">
          <div className="auth-header">
            <Link to="/" className="auth-logo">🐛 BugTrackr</Link>
            <h1 className="auth-title">Create account</h1>
            <p className="auth-subtitle">Join BugTrackr — 24BCE0965 Raghava Reddy</p>
          </div>
          <form className="auth-form" onSubmit={this.handleSubmit_24BCE0965}>
            {error_24BCE0965 && <div className="auth-error">❌ {error_24BCE0965}</div>}
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input className="form-input" name="name_raghavaReddy" value={name_raghavaReddy} onChange={this.handleChange_raghavaReddy} placeholder="Raghava Reddy" />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input className="form-input" type="email" name="email_24BCE0965" value={email_24BCE0965} onChange={this.handleChange_raghavaReddy} placeholder="you@example.com" />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input className="form-input" type="password" name="password_raghavaReddy" value={password_raghavaReddy} onChange={this.handleChange_raghavaReddy} placeholder="Min 6 characters" />
              {password_raghavaReddy && (
                <div className="password-strength">
                  <div className="strength-bar"><div className="strength-fill" style={{ width: `${passwordStrength_raghavaReddy * 20}%`, background: strengthColors[passwordStrength_raghavaReddy] }} /></div>
                  <span style={{ color: strengthColors[passwordStrength_raghavaReddy] }}>{strengthLabels[passwordStrength_raghavaReddy]}</span>
                </div>
              )}
            </div>
            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input className="form-input" type="password" name="confirmPassword_24BCE0965" value={confirmPassword_24BCE0965} onChange={this.handleChange_raghavaReddy} placeholder="Re-enter password" />
            </div>
            <div className="form-group">
              <label className="form-label">Role</label>
              <select className="form-select" name="role_raghavaReddy" value={role_raghavaReddy} onChange={this.handleChange_raghavaReddy}>
                <option value="Developer">Developer</option>
                <option value="Tester">Tester</option>
                <option value="Designer">Designer</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <button className="btn btn-primary btn-full" type="submit">Create Account — 24BCE0965</button>
          </form>
          <p className="auth-footer-link">Already have an account? <Link to="/login">Sign in</Link></p>
        </div>
      </div>
    );
  }
}
export default Register_24BCE0965;
