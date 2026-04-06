// BugCard — 24BCE0965_L1_MP_RAGHAVA — Raghava Reddy
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import SeverityBadge_24BCE0965 from './SeverityBadge';
import StatusBadge_24BCE0965 from './StatusBadge';
import { BugContext_24BCE0965 } from '../../context/BugContext';
import { format } from 'date-fns';

export default function BugCard_24BCE0965({ bug_raghavaReddy }) {
  const navigate_24BCE0965 = useNavigate();
  const { state } = useContext(BugContext_24BCE0965);

  const assignee_raghavaReddy = state.team.find(m => m.id === bug_raghavaReddy.assignee);
  const project_24BCE0965 = state.projects.find(p => p.id === bug_raghavaReddy.project);

  return (
    <div className="bug-card" onClick={() => navigate_24BCE0965(`/bugs/${bug_raghavaReddy.id}`)} id={`bugcard-${bug_raghavaReddy.id}`}>
      <div className="bug-card-header">
        <span className="bug-card-id">{bug_raghavaReddy.id.replace('bug_', 'BUG-')}</span>
        <SeverityBadge_24BCE0965 level_raghavaReddy={bug_raghavaReddy.severity} />
      </div>
      <h3 className="bug-card-title">{bug_raghavaReddy.title_raghavaReddy}</h3>
      <p className="bug-card-desc">{bug_raghavaReddy.description?.slice(0, 100)}...</p>
      <div className="bug-card-meta">
        <StatusBadge_24BCE0965 status_raghavaReddy={bug_raghavaReddy.status} />
        {project_24BCE0965 && <span className="bug-card-project" style={{ borderColor: project_24BCE0965.color }}>📁 {project_24BCE0965.name_raghavaReddy}</span>}
      </div>
      <div className="bug-card-footer">
        {assignee_raghavaReddy && (
          <div className="bug-card-assignee">
            <div className="mini-avatar" style={{ background: assignee_raghavaReddy.avatar }}>{assignee_raghavaReddy.name_raghavaReddy[0]}</div>
            <span>{assignee_raghavaReddy.name_raghavaReddy}</span>
          </div>
        )}
        <span className="bug-card-date">{format(new Date(bug_raghavaReddy.createdAt), 'MMM d, yyyy')}</span>
      </div>
    </div>
  );
}

BugCard_24BCE0965.propTypes = {
  bug_raghavaReddy: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title_raghavaReddy: PropTypes.string.isRequired,
    severity: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};
