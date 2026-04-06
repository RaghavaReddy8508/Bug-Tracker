// ============================================================
// DeferredBugCard — Functional Component — 24BCE0965_L1_MP_RAGHAVA
// Developer: Raghava Reddy Mallidi (24BCE0965)
// Extends BugCard with days-deferred counter and reactivate button
// ============================================================
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import SeverityBadge_24BCE0965 from './SeverityBadge';
import StatusBadge_24BCE0965 from './StatusBadge';
import { BugContext_24BCE0965 } from '../../context/BugContext';
// date-fns not needed — daysDeferred is passed as prop — 24BCE0965

export default function DeferredBugCard_24BCE0965({ bug_raghavaReddy, daysDeferred_24BCE0965 }) {
  const { state, dispatch } = useContext(BugContext_24BCE0965);
  const assignee = state.team.find(m => m.id === bug_raghavaReddy.assignee);
  const project = state.projects.find(p => p.id === bug_raghavaReddy.project);

  // Determine urgency level based on days deferred
  const urgencyClass_raghavaReddy =
    daysDeferred_24BCE0965 > 30 ? 'deferred-danger' :
    daysDeferred_24BCE0965 > 14 ? 'deferred-warning' : '';

  const handleReactivate_raghavaReddy = (e) => {
    e.stopPropagation();
    dispatch({
      type: 'CHANGE_STATUS',
      payload: {
        bugId: bug_raghavaReddy.id,
        newStatus: 'open',
        changedBy: 'user_24BCE0965',
      },
    });
    // Log reactivation activity
    dispatch({
      type: 'ADD_ACTIVITY',
      payload: {
        id: `act_${Date.now()}`,
        type: 'reactivated',
        bugId: bug_raghavaReddy.id,
        userId: 'user_24BCE0965',
        message: `Bug "${bug_raghavaReddy.title_raghavaReddy}" reactivated from ${bug_raghavaReddy.status} — 24BCE0965 Raghava Reddy`,
        at: new Date().toISOString(),
      },
    });
    console.log(`♻️ Bug reactivated — 24BCE0965 Raghava Reddy: ${bug_raghavaReddy.title_raghavaReddy}`);
  };

  return (
    <div className={`deferred-card ${urgencyClass_raghavaReddy}`} id={`deferred-${bug_raghavaReddy.id}`}>
      <div className="deferred-card-header">
        <span className="bug-card-id">{bug_raghavaReddy.id.replace('bug_', 'BUG-')}</span>
        <div className="deferred-badges">
          <SeverityBadge_24BCE0965 level_raghavaReddy={bug_raghavaReddy.severity} />
          <StatusBadge_24BCE0965 status_raghavaReddy={bug_raghavaReddy.status} />
        </div>
      </div>

      <h3 className="deferred-card-title">{bug_raghavaReddy.title_raghavaReddy}</h3>
      <p className="deferred-card-desc">{bug_raghavaReddy.description?.slice(0, 120)}...</p>

      <div className="deferred-card-meta">
        {project && (
          <span className="bug-card-project" style={{ borderColor: project.color }}>📁 {project.name_raghavaReddy}</span>
        )}
        {assignee && (
          <div className="bug-card-assignee">
            <div className="mini-avatar" style={{ background: assignee.avatar }}>{assignee.name_raghavaReddy[0]}</div>
            <span>{assignee.name_raghavaReddy}</span>
          </div>
        )}
      </div>

      <div className="deferred-card-footer">
        <div className={`deferred-days-badge ${urgencyClass_raghavaReddy}`}>
          <span className="deferred-days-icon">⏱️</span>
          <span className="deferred-days-value">{daysDeferred_24BCE0965}</span>
          <span className="deferred-days-label">days deferred</span>
        </div>
        <button
          className="btn btn-primary btn-sm"
          onClick={handleReactivate_raghavaReddy}
          id={`reactivate-${bug_raghavaReddy.id}-24BCE0965`}
        >
          ♻️ Reactivate
        </button>
      </div>
    </div>
  );
}

DeferredBugCard_24BCE0965.propTypes = {
  bug_raghavaReddy: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title_raghavaReddy: PropTypes.string.isRequired,
    severity: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    deferredSince: PropTypes.string,
  }).isRequired,
  daysDeferred_24BCE0965: PropTypes.number.isRequired,
};
