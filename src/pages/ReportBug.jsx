// ============================================================
// ReportBug — CLASS COMPONENT — 24BCE0965_L1_MP_RAGHAVA
// Developer: Raghava Reddy Mallidi (24BCE0965)
// constructor, controlled form, componentDidUpdate, componentDidMount
// Features: Duplicate Detection, Severity Policy Enforcement
// ============================================================
import React, { Component } from 'react';
import { BugContext_24BCE0965 } from '../context/BugContext';
import { AuthContext_24BCE0965 } from '../context/AuthContext';
import AppLayout_24BCE0965 from '../components/layout/AppLayout';
import Topbar_24BCE0965 from '../components/layout/Topbar';
import DuplicateWarning_24BCE0965 from '../components/bugs/DuplicateWarning';
import SeverityGuideModal_24BCE0965 from '../components/bugs/SeverityGuideModal';
import SeverityHelper_24BCE0965 from '../components/bugs/SeverityHelper';
import TemplateSelector_24BCE0965 from '../components/bugs/TemplateSelector';
import { bugTemplates_24BCE0965 } from '../data/templates';

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
      // Feature 1: Duplicate detection
      duplicates_raghavaReddy: [],
      // Feature 2: Severity policy enforcement
      showSeverityModal_24BCE0965: false,
      severityAcknowledged_raghavaReddy: false,
      // Feature 11: Smart Templates
      selectedTemplate_24BCE0965: null,
      expectedLoadTime_raghavaReddy: '',
      affectedEndpoint_24BCE0965: '',
      errorLogs_raghavaReddy: '',
      dataAffected_24BCE0965: '',
    };
    console.log('📝 ReportBug_24BCE0965 constructor — Raghava Reddy');
  }

  // Feature 11: Handle template selection
  handleTemplateSelect_raghavaReddy = (template) => {
    this.setState({ selectedTemplate_24BCE0965: template });
    console.log(`📋 Template selected: ${template.name} — 24BCE0965`);
  };

  componentDidMount() {
    // Restore draft from localStorage
    const draft_24BCE0965 = localStorage.getItem('bugtrackr_draft_24BCE0965');
    if (draft_24BCE0965) {
      try {
        const parsed = JSON.parse(draft_24BCE0965);
        this.setState(parsed);
        console.log('📋 Draft restored — 24BCE0965 Raghava Reddy');
      } catch { /* ignore */ }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // Feature 11: Pre-populate fields when template changes from null to a value
    if (prevState.selectedTemplate_24BCE0965 === null && this.state.selectedTemplate_24BCE0965 !== null) {
      const template = this.state.selectedTemplate_24BCE0965;
      const updates = { severity_raghavaReddy: template.defaultSeverity };
      if (template.prefill) {
        if (template.prefill.severity_raghavaReddy) updates.severity_raghavaReddy = template.prefill.severity_raghavaReddy;
        if (template.prefill.title_raghavaReddy) updates.title_raghavaReddy = template.prefill.title_raghavaReddy;
        if (template.prefill.description_24BCE0965) updates.description_24BCE0965 = template.prefill.description_24BCE0965;
        if (template.prefill.steps_24BCE0965) updates.steps_24BCE0965 = template.prefill.steps_24BCE0965;
        if (template.prefill.environment_raghavaReddy) updates.environment_raghavaReddy = template.prefill.environment_raghavaReddy;
      }
      this.setState(updates);
    }

    // Auto-save draft 1 second after any change
    const fieldsToWatch = ['title_raghavaReddy', 'description_24BCE0965', 'severity_raghavaReddy', 'steps_24BCE0965', 'environment_raghavaReddy', 'selectedTemplate_24BCE0965'];
    const changed = fieldsToWatch.some(f => prevState[f] !== this.state[f]);
    if (changed && !this.state.submitted_24BCE0965) {
      clearTimeout(this._saveTimer_raghavaReddy);
      this._saveTimer_raghavaReddy = setTimeout(() => {
        const { errors_raghavaReddy: _errors, submitted_24BCE0965: _submitted, lastSaved_raghavaReddy: _lastSaved, duplicates_raghavaReddy: _duplicates, showSeverityModal_24BCE0965: _showModal, ...draftData } = this.state;
        localStorage.setItem('bugtrackr_draft_24BCE0965', JSON.stringify(draftData));
        this.setState({ lastSaved_raghavaReddy: new Date().toLocaleTimeString() });
        console.log('💾 Draft auto-saved — 24BCE0965 Raghava Reddy');
      }, 1000);
    }
  }

  componentWillUnmount() {
    clearTimeout(this._saveTimer_raghavaReddy);
  }

  // Feature 1: Check for duplicate bugs based on title
  checkDuplicates_raghavaReddy = (titleValue) => {
    const { state: bugState } = this.context;
    const inputWords = titleValue.toLowerCase().split(/\s+/).filter(w => w.length > 2);
    
    if (inputWords.length < 2) {
      this.setState({ duplicates_raghavaReddy: [] });
      return;
    }

    const matches = bugState.bugs.filter(bug => {
      const bugWords = bug.title_raghavaReddy.toLowerCase().split(/\s+/);
      const matchingWords = inputWords.filter(word => 
        bugWords.some(bw => bw.includes(word) || word.includes(bw))
      );
      return matchingWords.length >= 2;
    });

    this.setState({ duplicates_raghavaReddy: matches });
    if (matches.length > 0) {
      console.log(`⚠️ ${matches.length} potential duplicates found — 24BCE0965 Raghava Reddy`);
    }
  };

  handleChange_raghavaReddy = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    if (this.state.errors_raghavaReddy[name]) {
      this.setState(prev => ({ errors_raghavaReddy: { ...prev.errors_raghavaReddy, [name]: '' } }));
    }

    // Feature 1: Run duplicate check on title changes
    if (name === 'title_raghavaReddy') {
      this.checkDuplicates_raghavaReddy(value);
    }

    // Feature 2: Handle severity changes
    if (name === 'severity_raghavaReddy') {
      if (value === 'critical') {
        this.setState({ showSeverityModal_24BCE0965: true, severityAcknowledged_raghavaReddy: false });
      } else {
        this.setState({ showSeverityModal_24BCE0965: false, severityAcknowledged_raghavaReddy: false });
      }
    }
  };

  // Feature 2: Severity modal handlers
  handleSeverityAcknowledge_24BCE0965 = (e) => {
    this.setState({ severityAcknowledged_raghavaReddy: e.target.checked });
  };

  handleSeverityConfirm_raghavaReddy = () => {
    this.setState({ showSeverityModal_24BCE0965: false });
    console.log('🔴 Critical severity acknowledged — 24BCE0965 Raghava Reddy');
  };

  handleSeverityCancel_24BCE0965 = () => {
    this.setState({ 
      showSeverityModal_24BCE0965: false, 
      severity_raghavaReddy: 'medium', 
      severityAcknowledged_raghavaReddy: false 
    });
    console.log('↩️ Critical severity cancelled, reverted to Medium — 24BCE0965');
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

    // Feature 2: Block submit if Critical not acknowledged
    if (this.state.severity_raghavaReddy === 'critical' && !this.state.severityAcknowledged_raghavaReddy) {
      this.setState({ showSeverityModal_24BCE0965: true });
      e.preventDefault();
      return;
    }

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
    const { title_raghavaReddy, description_24BCE0965, severity_raghavaReddy, project_24BCE0965, assignee_raghavaReddy, steps_24BCE0965, environment_raghavaReddy, browser_24BCE0965, errors_raghavaReddy, submitted_24BCE0965, lastSaved_raghavaReddy, duplicates_raghavaReddy, showSeverityModal_24BCE0965, severityAcknowledged_raghavaReddy, selectedTemplate_24BCE0965 } = this.state;

    // Feature 2: Determine if submit should be blocked
    const submitDisabled_raghavaReddy = severity_raghavaReddy === 'critical' && !severityAcknowledged_raghavaReddy;

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

    const fields = selectedTemplate_24BCE0965?.visibleFields || ['title', 'description', 'severity', 'project', 'assignee', 'steps', 'environment', 'browser'];

    return (
      <AppLayout_24BCE0965>
        <Topbar_24BCE0965 title_raghavaReddy="Report Bug" subtitle_24BCE0965="File a new bug report — 24BCE0965 Raghava Reddy"
          actions_raghavaReddy={lastSaved_raghavaReddy && <span className="auto-save-indicator">💾 Draft saved at {lastSaved_raghavaReddy}</span>} />
        
        <div className="page-content" id="reportbug-24BCE0965">
          {/* Feature 11: Template Selector or Form */}
          {!selectedTemplate_24BCE0965 ? (
            <TemplateSelector_24BCE0965 templates_raghavaReddy={bugTemplates_24BCE0965} onSelect_24BCE0965={this.handleTemplateSelect_raghavaReddy} />
          ) : (
            <form className="bug-form" onSubmit={this.handleSubmit_raghavaReddy}>
              <div className="form-header-actions">
                <button type="button" className="btn btn-ghost" onClick={() => this.setState({ selectedTemplate_24BCE0965: null })}>
                  ← Back to templates
                </button>
                <div className="selected-template-badge">
                  Using: {selectedTemplate_24BCE0965.name}
                </div>
              </div>

              {fields.includes('title') && (
                <div className="form-group">
                  <label className="form-label">Bug Title * — 24BCE0965</label>
                  <input className="form-input" name="title_raghavaReddy" value={title_raghavaReddy} onChange={this.handleChange_raghavaReddy} placeholder="Brief title describing the bug" />
                  {errors_raghavaReddy.title_raghavaReddy && <span className="form-error">{errors_raghavaReddy.title_raghavaReddy}</span>}
                  <DuplicateWarning_24BCE0965 matches_raghavaReddy={duplicates_raghavaReddy} />
                </div>
              )}

              {fields.includes('description') && (
                <div className="form-group">
                  <label className="form-label">Description *</label>
                  <textarea className="form-textarea" name="description_24BCE0965" value={description_24BCE0965} onChange={this.handleChange_raghavaReddy} rows={5} placeholder="Detailed description..." />
                  <span className={`char-count ${description_24BCE0965.length > 500 ? 'warning' : ''}`}>{description_24BCE0965.length}/1000</span>
                  {errors_raghavaReddy.description_24BCE0965 && <span className="form-error">{errors_raghavaReddy.description_24BCE0965}</span>}
                </div>
              )}

              <div className="form-row">
                {fields.includes('severity') && (
                  <div className="form-group">
                    <label className="form-label">Severity</label>
                    <select className="form-select" name="severity_raghavaReddy" value={severity_raghavaReddy} onChange={this.handleChange_raghavaReddy}>
                      <option value="critical">🔴 Critical</option><option value="high">🟠 High</option><option value="medium">🔵 Medium</option><option value="low">🟢 Low</option>
                    </select>
                    <SeverityHelper_24BCE0965 severity_raghavaReddy={severity_raghavaReddy} />
                    {severity_raghavaReddy === 'critical' && severityAcknowledged_raghavaReddy && (
                      <div className="severity-acknowledged-badge">✅ Critical severity acknowledged — 24BCE0965</div>
                    )}
                    {severity_raghavaReddy === 'critical' && !severityAcknowledged_raghavaReddy && (
                      <div className="severity-pending-badge">⚠️ Critical severity requires acknowledgement</div>
                    )}
                  </div>
                )}
                {fields.includes('project') && (
                  <div className="form-group">
                    <label className="form-label">Project</label>
                    <select className="form-select" name="project_24BCE0965" value={project_24BCE0965} onChange={this.handleChange_raghavaReddy}>
                      {bugState.projects.map(p => <option key={p.id} value={p.id}>{p.name_raghavaReddy}</option>)}
                    </select>
                  </div>
                )}
                {fields.includes('assignee') && (
                  <div className="form-group">
                    <label className="form-label">Assignee</label>
                    <select className="form-select" name="assignee_raghavaReddy" value={assignee_raghavaReddy} onChange={this.handleChange_raghavaReddy}>
                      {bugState.team.map(m => <option key={m.id} value={m.id}>{m.name_raghavaReddy}</option>)}
                    </select>
                  </div>
                )}
              </div>

              {fields.includes('steps') && (
                <div className="form-group">
                  <label className="form-label">Steps to Reproduce *</label>
                  <textarea className="form-textarea" name="steps_24BCE0965" value={steps_24BCE0965} onChange={this.handleChange_raghavaReddy} rows={4} placeholder="1. Go to...&#10;2. Click...&#10;3. See error" />
                  {errors_raghavaReddy.steps_24BCE0965 && <span className="form-error">{errors_raghavaReddy.steps_24BCE0965}</span>}
                </div>
              )}

              <div className="form-row">
                {fields.includes('environment') && (
                  <div className="form-group">
                    <label className="form-label">Environment</label>
                    <input className="form-input" name="environment_raghavaReddy" value={environment_raghavaReddy} onChange={this.handleChange_raghavaReddy} placeholder="OS, Device" />
                  </div>
                )}
                {fields.includes('browser') && (
                  <div className="form-group">
                    <label className="form-label">Browser</label>
                    <input className="form-input" name="browser_24BCE0965" value={browser_24BCE0965} onChange={this.handleChange_raghavaReddy} placeholder="Chrome 120" />
                  </div>
                )}
                {fields.includes('expectedLoadTime') && (
                  <div className="form-group">
                    <label className="form-label">Expected Load Time (ms)</label>
                    <input className="form-input" name="expectedLoadTime_raghavaReddy" onChange={this.handleChange_raghavaReddy} placeholder="e.g. 200ms" />
                  </div>
                )}
                {fields.includes('affectedEndpoint') && (
                  <div className="form-group">
                    <label className="form-label">Affected Endpoint</label>
                    <input className="form-input" name="affectedEndpoint_24BCE0965" onChange={this.handleChange_raghavaReddy} placeholder="/api/users/..." />
                  </div>
                )}
              </div>

              {fields.includes('errorLogs') && (
                <div className="form-group">
                  <label className="form-label">Error Logs</label>
                  <textarea className="form-textarea" name="errorLogs_raghavaReddy" onChange={this.handleChange_raghavaReddy} rows={3} placeholder="Paste crash logs here..." />
                </div>
              )}

              {fields.includes('dataAffected') && (
                <div className="form-group">
                  <label className="form-label">Data Affected</label>
                  <input className="form-input" name="dataAffected_24BCE0965" onChange={this.handleChange_raghavaReddy} placeholder="Which tables/records?" />
                </div>
              )}

              <button className="btn btn-primary btn-lg" type="submit" disabled={submitDisabled_raghavaReddy}>
                🐛 Submit Bug Report — 24BCE0965
              </button>
            </form>
          )}
        </div>

        {showSeverityModal_24BCE0965 && (
          <SeverityGuideModal_24BCE0965
            onConfirm_raghavaReddy={this.handleSeverityConfirm_raghavaReddy}
            onClose_24BCE0965={this.handleSeverityCancel_24BCE0965}
            acknowledged_raghavaReddy={severityAcknowledged_raghavaReddy}
            onAcknowledge_24BCE0965={this.handleSeverityAcknowledge_24BCE0965}
          />
        )}
      </AppLayout_24BCE0965>
    );
  }
}
export default ReportBug_24BCE0965;
