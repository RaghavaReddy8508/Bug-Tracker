// ============================================================
// SeverityBadge — 24BCE0965_L1_MP_RAGHAVA
// Developer: Raghava Reddy Mallidi (24BCE0965)
// ============================================================

import React from 'react';
import PropTypes from 'prop-types';

export default function SeverityBadge_24BCE0965({ level_raghavaReddy }) {
  const icons_24BCE0965 = { critical: '🔴', high: '🟠', medium: '🔵', low: '🟢' };
  return (
    <span className={`severity-badge severity-${level_raghavaReddy}`} id={`severity-${level_raghavaReddy}-24BCE0965`}>
      {icons_24BCE0965[level_raghavaReddy] || '⚪'} {level_raghavaReddy}
    </span>
  );
}

SeverityBadge_24BCE0965.propTypes = {
  level_raghavaReddy: PropTypes.oneOf(['critical', 'high', 'medium', 'low']).isRequired,
};
