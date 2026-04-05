// ============================================================
// ReportBug — CLASS COMPONENT — 24BCE0965_L1_MP_RAGHAVA
// Developer: Raghava Reddy Mallidi (24BCE0965)
// constructor, controlled form, componentDidUpdate, componentDidMount
// ============================================================
import React, { Component } from 'react';
import { BugContext_24BCE0965 } from '../context/BugContext';
import { AuthContext_24BCE0965 } from '../context/AuthContext';
import AppLayout_24BCE0965 from '../components/layout/AppLayout';
import Topbar_24BCE0965 from '../components/layout/Topbar';

class ReportBug_24BCE0965 extends Component {
  static contextType = BugContext_24BCE0965;

  constructor(props_raghavaReddy) {
    super(props_raghavaReddy);
    this.state = {
      title_raghavaReddy: '',
      description_24BCE0965: '',
      severity_raghavaReddy: 'medium',
      project_24BCE0965: 'proj_001',
      assignee_raghavaReddy: 'user_24BCE0965',
      steps_24BCE0965: '',
      environment_raghavaReddy: '',
      browser_24BCE0965: '',
      errors_raghavaReddy: {},
      submitted_24BCE0965: false,
      lastSaved_raghavaReddy: null,
    };
    console.log('📝 ReportBug_24BCE0965 constructor — Raghava Reddy');
  }

  componentDidMount() {
    // Restore draft from localStorage
    const draft_24BCE0965 = localStorage.getItem('bugtrackr_draft_24BCE0965');
    if (draft_24BCE0965) {
      try {
        const parsed = JSON.parse(draft_24BCE0965);
        this.setState(parsed);
        console.log('📋 Draft restored — 24BCE0965 Raghava Reddy');
      } catch (e) { /* ignore */ }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // Auto-save draft 1 second after any change
    const fieldsToWatch = ['title_raghavaReddy', 'description_24BCE0965', 'severity_raghavaReddy', 'steps_24BCE0965', 'environment_raghavaReddy'];
    const changed = fieldsToWatch.some(f => prevState[f] !== this.state[f]);
    if (changed && !this.state.submitted_24BCE0965) {
      clearTimeout(this._saveTimer_raghavaReddy);
      this._saveTimer_raghavaReddy = setTimeout(() => {
        const { errors_raghavaReddy, submitted_24BCE0965, lastSaved_raghavaReddy, ...draftData } = this.state;
        localStorage.setItem('bugtrackr_draft_24BCE0965', JSON.stringify(draftData));
        this.setState({ lastSaved_raghavaReddy: new Date().toLocaleTimeString() });
        console.log('💾 Draft auto-saved — 24BCE0965 Raghava Reddy');
      }, 1000);
    }
  }

  componentWillUnmount() {
    clearTimeout(this._saveTimer_raghavaReddy);
  }

  handleChange_raghavaReddy = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    if (this.state.errors_raghavaReddy[name]) {
      this.setState(prev => ({ errors_raghavaReddy: { ...prev.errors_raghavaReddy, [name]: '' } }));
    }
  };

  validate_24BCE0965 = () => {
    const errors = {};
    if (!this.state.title_raghavaReddy.trim()) errors.title_raghavaReddy = 'Title is required — 24BCE0965';
    if (!this.state.description_24BCE0965.trim()) errors.description_24BCE0965 = 'Description is required';
    if (this.state.description_24BCE0965.length > 1000) errors.description_24BCE0965 = 'Max 1000 characters';
    if (!this.state.steps_24BCE0965.trim()) errors.steps_24BCE0965 = 'Steps to reproduce required';
    this.setState({ errors_raghavaReddy: errors });
    return Object.keys(errors).length === 0;
  };

  handleSubmit_raghavaReddy = (e) => {
    e.preventDefault();
    if (!this.validate_24BCE0965()) return;
    
    const { dispatch } = this.context;
    dispatch({
      type: 'ADD_BUG',
      payload: {
        title_raghavaReddy: this.state.title_raghavaReddy,
        description: this.state.description_24BCE0965,
        severity: this.state.severity_raghavaReddy,
        project: this.state.project_24BCE0965,
        assignee: this.state.assignee_raghavaReddy,
        steps: this.state.steps_24BCE0965,
        environment: this.state.environment_raghavaReddy + ' ' + this.state.browser_24BCE0965,
        status: 'open',
        reportedBy: 'user_24BCE0965',
      },
    });

    localStorage.removeItem('bugtrackr_draft_24BCE0965');
    this.setState({ submitted_24BCE0965: true });
    console.log('🐛 Bug reported — 24BCE0965 Raghava Reddy');
    setTimeout(() => { window.location.href = '/bugs'; }, 1500);
  };

  render() {
    const { state: bugState } = this.context;
    const { title_raghavaReddy, description_24BCE0965, severity_raghavaReddy, project_24BCE0965, assignee_raghavaReddy, steps_24BCE0965, environment_raghavaReddy, browser_24BCE0965, errors_raghavaReddy, submitted_24BCE0965, lastSaved_raghavaReddy } = this.state;

    if (submitted_24BCE0965) {
      return (
        <AppLayout_24BCE0965>
          <div className="page-content" style={{ textAlign: 'center', paddingTop: '100px' }}>
            <div style={{ fontSize: '64px' }}>✅</div>
            <h2>Bug Reported Successfully!</h2>
            <p>Redirecting to All Bugs — 24BCE0965 Raghava Reddy...</p>
          </div>
        </AppLayout_24BCE0965>
      );
    }

    return (
      <AppLayout_24BCE0965>
        <Topbar_24BCE0965 title_raghavaReddy="Report Bug" subtitle_24BCE0965="File a new bug report — 24BCE0965 Raghava Reddy"
          actions_raghavaReddy={lastSaved_raghavaReddy && <span className="auto-save-indicator">💾 Draft saved at {lastSaved_raghavaReddy}</span>} />
        <div className="page-content" id="reportbug-24BCE0965">
          <form className="bug-form" onSubmit={this.handleSubmit_raghavaReddy}>
            <div className="form-group">
              <label className="form-label">Bug Title * — 24BCE0965</label>
              <input className="form-input" name="title_raghavaReddy" value={title_raghavaReddy} onChange={this.handleChange_raghavaReddy} placeholder="Brief title describing the bug" />
              {errors_raghavaReddy.title_raghavaReddy && <span className="form-error">{errors_raghavaReddy.title_raghavaReddy}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Description *</label>
              <textarea className="form-textarea" name="description_24BCE0965" value={description_24BCE0965} onChange={this.handleChange_raghavaReddy} rows={5} placeholder="Detailed description..." />
              <span className={`char-count ${description_24BCE0965.length > 500 ? 'warning' : ''}`}>{description_24BCE0965.length}/1000</span>
              {errors_raghavaReddy.description_24BCE0965 && <span className="form-error">{errors_raghavaReddy.description_24BCE0965}</span>}
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Severity</label>
                <select className="form-select" name="severity_raghavaReddy" value={severity_raghavaReddy} onChange={this.handleChange_raghavaReddy}>
                  <option value="critical">🔴 Critical</option><option value="high">🟠 High</option><option value="medium">🔵 Medium</option><option value="low">🟢 Low</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Project</label>
                <select className="form-select" name="project_24BCE0965" value={project_24BCE0965} onChange={this.handleChange_raghavaReddy}>
                  {bugState.projects.map(p => <option key={p.id} value={p.id}>{p.name_raghavaReddy}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Assignee</label>
                <select className="form-select" name="assignee_raghavaReddy" value={assignee_raghavaReddy} onChange={this.handleChange_raghavaReddy}>
                  {bugState.team.map(m => <option key={m.id} value={m.id}>{m.name_raghavaReddy}</option>)}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Steps to Reproduce *</label>
              <textarea className="form-textarea" name="steps_24BCE0965" value={steps_24BCE0965} onChange={this.handleChange_raghavaReddy} rows={4} placeholder="1. Go to...&#10;2. Click...&#10;3. See error" />
              {errors_raghavaReddy.steps_24BCE0965 && <span className="form-error">{errors_raghavaReddy.steps_24BCE0965}</span>}
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Environment</label>
                <input className="form-input" name="environment_raghavaReddy" value={environment_raghavaReddy} onChange={this.handleChange_raghavaReddy} placeholder="OS, Device" />
              </div>
              <div className="form-group">
                <label className="form-label">Browser</label>
                <input className="form-input" name="browser_24BCE0965" value={browser_24BCE0965} onChange={this.handleChange_raghavaReddy} placeholder="Chrome 120" />
              </div>
            </div>
            <button className="btn btn-primary btn-lg" type="submit">🐛 Submit Bug Report — 24BCE0965</button>
          </form>
        </div>
      </AppLayout_24BCE0965>
    );
  }
}
export default ReportBug_24BCE0965;
