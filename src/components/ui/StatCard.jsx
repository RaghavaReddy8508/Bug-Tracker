// StatCard — 24BCE0965_L1_MP_RAGHAVA — Raghava Reddy
import React from 'react';
import PropTypes from 'prop-types';

export default function StatCard_24BCE0965({ value_raghavaReddy, label_24BCE0965, delta_raghavaReddy, deltaType_24BCE0965, icon_raghavaReddy }) {
  return (
    <div className="stat-card" id={`stat-${label_24BCE0965}-24BCE0965`}>
      <div className="stat-card-icon">{icon_raghavaReddy || '📊'}</div>
      <div className="stat-card-content">
        <span className="stat-card-value">{value_raghavaReddy}</span>
        <span className="stat-card-label">{label_24BCE0965}</span>
      </div>
      {delta_raghavaReddy !== undefined && (
        <span className={`stat-card-delta ${deltaType_24BCE0965 === 'up' ? 'delta-up' : 'delta-down'}`}>
          {deltaType_24BCE0965 === 'up' ? '↑' : '↓'} {delta_raghavaReddy}%
        </span>
      )}
    </div>
  );
}
StatCard_24BCE0965.propTypes = {
  value_raghavaReddy: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  label_24BCE0965: PropTypes.string.isRequired,
  delta_raghavaReddy: PropTypes.number,
  deltaType_24BCE0965: PropTypes.oneOf(['up', 'down']),
  icon_raghavaReddy: PropTypes.string,
};
