// ============================================================
// MTTFCard — Functional Component — 24BCE0965_L1_MP_RAGHAVA
// Developer: Raghava Reddy Mallidi (24BCE0965)
// Displays Mean Time To Fix with project breakdown
// ============================================================
import React from 'react';
import PropTypes from 'prop-types';

export default function MTTFCard_24BCE0965({ mttfDays_raghavaReddy, projectBreakdown_24BCE0965, resolvedCount_raghavaReddy }) {
  return (
    <div className="metric-card mttf-card" id="mttf-card-24BCE0965">
      <div className="metric-card-icon">⏱️</div>
      <div className="metric-card-content">
        <span className="metric-card-value">
          {resolvedCount_raghavaReddy > 0 ? `${mttfDays_raghavaReddy}d` : '—'}
        </span>
        <span className="metric-card-label">Mean Time To Fix — 24BCE0965</span>
      </div>
      <div className="metric-card-detail">
        {resolvedCount_raghavaReddy > 0 ? (
          <>
            <span className="metric-sub-text">
              Based on {resolvedCount_raghavaReddy} resolved bugs — Raghava Reddy
            </span>
            {projectBreakdown_24BCE0965 && projectBreakdown_24BCE0965.length > 0 && (
              <div className="mttf-breakdown">
                {projectBreakdown_24BCE0965.map((proj_raghavaReddy) => (
                  <div key={proj_raghavaReddy.name} className="mttf-breakdown-item">
                    <span className="mttf-project-name">{proj_raghavaReddy.name}</span>
                    <span className="mttf-project-value">{proj_raghavaReddy.mttf}d avg</span>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <span className="metric-sub-text">Not enough resolved bugs for calculation — 24BCE0965</span>
        )}
      </div>
    </div>
  );
}

MTTFCard_24BCE0965.propTypes = {
  mttfDays_raghavaReddy: PropTypes.number.isRequired,
  projectBreakdown_24BCE0965: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      mttf: PropTypes.number.isRequired,
    })
  ),
  resolvedCount_raghavaReddy: PropTypes.number.isRequired,
};
