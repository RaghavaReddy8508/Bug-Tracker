// FocusBugCard — 24BCE0965_L1_MP_RAGHAVA — Raghava Reddy
// Feature 9: Large single bug card for Focus Mode
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import SeverityBadge_24BCE0965 from './SeverityBadge';
import StatusBadge_24BCE0965 from './StatusBadge';
import { BugContext_24BCE0965 } from '../../context/BugContext';

export default function FocusBugCard_24BCE0965({ bug_raghavaReddy, onStatusChange_24BCE0965 }) {
  const { state } = useContext(BugContext_24BCE0965);
  const assignee = state.team.find(m => m.id === bug_raghavaReddy.assignee);
  const project = state.projects.find(p => p.id === bug_raghavaReddy.project);

  return (
    <div className="focus-bug-card" id={`focus-card-${bug_raghavaReddy.id}`}>
      <div className="focus-card-header">
        <span className="bug-card-id">{bug_raghavaReddy.id.replace('bug_', 'BUG-')}</span>
        <div className="focus-card-badges">
          <SeverityBadge_24BCE0965 level_raghavaReddy={bug_raghavaReddy.severity} />
          <StatusBadge_24BCE0965 status_raghavaReddy={bug_raghavaReddy.status} />
        </div>
      </div>

      <h2 className="focus-card-title">{bug_raghavaReddy.title_raghavaReddy}</h2>
      <p className="focus-card-desc">{bug_raghavaReddy.description}</p>

      {bug_raghavaReddy.steps && (
        <div className="focus-card-section">
          <h3>Steps to Reproduce</h3>
          <pre className="bug-steps">{bug_raghavaReddy.steps}</pre>
        </div>
      )}

      <div className="focus-card-meta">
        {project && <span className="bug-card-project" style={{ borderColor: project.color }}>📁 {project.name_raghavaReddy}</span>}
        {assignee && (
          <div className="bug-card-assignee">
            <div className="mini-avatar" style={{ background: assignee.avatar }}>{assignee.name_raghavaReddy[0]}</div>
            <span>{assignee.name_raghavaReddy}</span>
          </div>
        )}
      </div>

      <div className="focus-card-actions">
        <h3>Change Status — 24BCE0965</h3>
        <div className="status-buttons">
          {['open', 'in-progress', 'resolved', 'deferred', 'wont-fix'].map(s => (
            <button key={s} className={`btn ${bug_raghavaReddy.status === s ? 'btn-primary' : 'btn-ghost'} btn-sm`}
              onClick={() => onStatusChange_24BCE0965(bug_raghavaReddy.id, s)} disabled={bug_raghavaReddy.status === s}>
              {s === 'open' ? '⭕' : s === 'in-progress' ? '🔄' : s === 'resolved' ? '✅' : s === 'deferred' ? '⏸️' : '🚫'} {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

FocusBugCard_24BCE0965.propTypes = {
  bug_raghavaReddy: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title_raghavaReddy: PropTypes.string.isRequired,
    severity: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  onStatusChange_24BCE0965: PropTypes.func.isRequired,
};
