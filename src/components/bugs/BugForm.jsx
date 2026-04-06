// BugForm — 24BCE0965_L1_MP_RAGHAVA — Raghava Reddy
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { BugContext_24BCE0965 } from '../../context/BugContext';

export default function BugForm_24BCE0965({ initialData_raghavaReddy, onSubmit_24BCE0965, isEdit_raghavaReddy }) {
  const { state } = useContext(BugContext_24BCE0965);
  const [formData_raghavaReddy, setFormData_raghavaReddy] = React.useState(
    initialData_raghavaReddy || {
      title_raghavaReddy: '', description: '', severity: 'medium',
      project: 'proj_001', assignee: 'user_24BCE0965', steps: '', environment: '',
    }
  );
  const [errors_24BCE0965, setErrors_24BCE0965] = React.useState({});

  const handleChange_raghavaReddy = (e) => {
    const { name, value } = e.target;
    setFormData_raghavaReddy(prev => ({ ...prev, [name]: value }));
    if (errors_24BCE0965[name]) setErrors_24BCE0965(prev => ({ ...prev, [name]: '' }));
  };

  const validate_24BCE0965 = () => {
    const errs = {};
    if (!formData_raghavaReddy.title_raghavaReddy.trim()) errs.title_raghavaReddy = 'Title is required — 24BCE0965';
    if (!formData_raghavaReddy.description.trim()) errs.description = 'Description is required';
    if (formData_raghavaReddy.description.length > 1000) errs.description = 'Max 1000 chars';
    setErrors_24BCE0965(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit_raghavaReddy = (e) => {
    e.preventDefault();
    if (validate_24BCE0965()) {
      onSubmit_24BCE0965(formData_raghavaReddy);
      console.log(`📝 BugForm submitted — 24BCE0965 Raghava Reddy`);
    }
  };

  return (
    <form className="bug-form" onSubmit={handleSubmit_raghavaReddy} id="bugForm-24BCE0965">
      <div className="form-group">
        <label className="form-label">Bug Title *</label>
        <input className="form-input" name="title_raghavaReddy" value={formData_raghavaReddy.title_raghavaReddy} onChange={handleChange_raghavaReddy} placeholder="Enter bug title — 24BCE0965" />
        {errors_24BCE0965.title_raghavaReddy && <span className="form-error">{errors_24BCE0965.title_raghavaReddy}</span>}
      </div>
      <div className="form-group">
        <label className="form-label">Description *</label>
        <textarea className="form-textarea" name="description" value={formData_raghavaReddy.description} onChange={handleChange_raghavaReddy} rows={5} placeholder="Describe the bug in detail..." />
        <span className={`char-count ${formData_raghavaReddy.description.length > 500 ? 'warning' : ''}`}>{formData_raghavaReddy.description.length}/1000</span>
        {errors_24BCE0965.description && <span className="form-error">{errors_24BCE0965.description}</span>}
      </div>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Severity</label>
          <select className="form-select" name="severity" value={formData_raghavaReddy.severity} onChange={handleChange_raghavaReddy}>
            <option value="critical">🔴 Critical</option>
            <option value="high">🟠 High</option>
            <option value="medium">🔵 Medium</option>
            <option value="low">🟢 Low</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Project</label>
          <select className="form-select" name="project" value={formData_raghavaReddy.project} onChange={handleChange_raghavaReddy}>
            {state.projects.map(p => <option key={p.id} value={p.id}>{p.name_raghavaReddy}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Assignee</label>
          <select className="form-select" name="assignee" value={formData_raghavaReddy.assignee} onChange={handleChange_raghavaReddy}>
            {state.team.map(m => <option key={m.id} value={m.id}>{m.name_raghavaReddy}</option>)}
          </select>
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Steps to Reproduce</label>
        <textarea className="form-textarea" name="steps" value={formData_raghavaReddy.steps} onChange={handleChange_raghavaReddy} rows={3} placeholder="1. Go to...\n2. Click...\n3. See error" />
      </div>
      <div className="form-group">
        <label className="form-label">Environment</label>
        <input className="form-input" name="environment" value={formData_raghavaReddy.environment} onChange={handleChange_raghavaReddy} placeholder="Chrome 120, Windows 11" />
      </div>
      <button className="btn btn-primary" type="submit">{isEdit_raghavaReddy ? '💾 Update Bug' : '🐛 Submit Bug'} — 24BCE0965</button>
    </form>
  );
}
BugForm_24BCE0965.propTypes = { initialData_raghavaReddy: PropTypes.object, onSubmit_24BCE0965: PropTypes.func.isRequired, isEdit_raghavaReddy: PropTypes.bool };
