// StatusBadge — 24BCE0965_L1_MP_RAGHAVA — Raghava Reddy
import React from 'react';
import PropTypes from 'prop-types';

export default function StatusBadge_24BCE0965({ status_raghavaReddy }) {
  const config_24BCE0965 = {
    'open': { label: 'Open', icon: '⭕' },
    'in-progress': { label: 'In Progress', icon: '🔄' },
    'resolved': { label: 'Resolved', icon: '✅' },
  };
  const c = config_24BCE0965[status_raghavaReddy] || { label: status_raghavaReddy, icon: '❓' };
  return (
    <span className={`status-badge status-${status_raghavaReddy}`}>
      {c.icon} {c.label}
    </span>
  );
}
StatusBadge_24BCE0965.propTypes = {
  status_raghavaReddy: PropTypes.oneOf(['open', 'in-progress', 'resolved']).isRequired,
};
