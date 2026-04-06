// ============================================================
// ReopenRateCard — Functional Component — 24BCE0965_L1_MP_RAGHAVA
// Developer: Raghava Reddy Mallidi (24BCE0965)
// Extends StatCard with reopen rate and trend indicator
// ============================================================
import React from 'react';
import PropTypes from 'prop-types';

export default function ReopenRateCard_24BCE0965({ reopenRate_raghavaReddy, reopenCount_24BCE0965, totalResolved_raghavaReddy }) {
  const isHealthy = reopenRate_raghavaReddy < 10;

  return (
    <div className="metric-card reopen-rate-card" id="reopen-rate-card-24BCE0965">
      <div className="metric-card-icon">🔁</div>
      <div className="metric-card-content">
        <span className="metric-card-value">
          {totalResolved_raghavaReddy > 0 ? `${reopenRate_raghavaReddy}%` : '—'}
        </span>
        <span className="metric-card-label">Reopen Rate — 24BCE0965</span>
      </div>
      <div className="metric-card-detail">
        {totalResolved_raghavaReddy > 0 ? (
          <>
            <span className={`metric-trend ${isHealthy ? 'trend-good' : 'trend-bad'}`}>
              {isHealthy ? '✅' : '⚠️'} {isHealthy ? 'Healthy' : 'Needs attention'}
            </span>
            <span className="metric-sub-text">
              {reopenCount_24BCE0965} reopened / {totalResolved_raghavaReddy} resolved
            </span>
          </>
        ) : (
          <span className="metric-sub-text">Not enough data — Raghava Reddy</span>
        )}
      </div>
    </div>
  );
}

ReopenRateCard_24BCE0965.propTypes = {
  reopenRate_raghavaReddy: PropTypes.number.isRequired,
  reopenCount_24BCE0965: PropTypes.number.isRequired,
  totalResolved_raghavaReddy: PropTypes.number.isRequired,
};
