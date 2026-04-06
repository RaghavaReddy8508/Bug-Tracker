// ============================================================
// DuplicateWarning — Functional Component — 24BCE0965_L1_MP_RAGHAVA
// Developer: Raghava Reddy Mallidi (24BCE0965)
// Displays matched duplicate bugs below the title input
// ============================================================
import React from 'react';
import PropTypes from 'prop-types';
import SeverityBadge_24BCE0965 from './SeverityBadge';
import StatusBadge_24BCE0965 from './StatusBadge';

export default function DuplicateWarning_24BCE0965({ matches_raghavaReddy }) {
  if (!matches_raghavaReddy || matches_raghavaReddy.length === 0) return null;

  return (
    <div className="duplicate-warning" id="duplicate-warning-24BCE0965">
      <div className="duplicate-warning-header">
        <span className="duplicate-warning-icon">⚠️</span>
        <span className="duplicate-warning-title">
          Possible duplicates found — 24BCE0965 Raghava Reddy
        </span>
      </div>
      <p className="duplicate-warning-desc">
        The following existing bugs have similar titles. Consider linking to one instead of creating a new report.
      </p>
      <div className="duplicate-warning-list">
        {matches_raghavaReddy.map((bug_raghavaReddy) => (
          <div key={bug_raghavaReddy.id} className="duplicate-warning-item">
            <div className="duplicate-warning-item-header">
              <span className="bug-card-id">{bug_raghavaReddy.id.replace('bug_', 'BUG-')}</span>
              <SeverityBadge_24BCE0965 level_raghavaReddy={bug_raghavaReddy.severity} />
              <StatusBadge_24BCE0965 status_raghavaReddy={bug_raghavaReddy.status} />
            </div>
            <span className="duplicate-warning-item-title">{bug_raghavaReddy.title_raghavaReddy}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

DuplicateWarning_24BCE0965.propTypes = {
  matches_raghavaReddy: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title_raghavaReddy: PropTypes.string.isRequired,
      severity: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
};
