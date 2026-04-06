// ============================================================
// SeverityHelper — Functional Component — 24BCE0965_L1_MP_RAGHAVA
// Developer: Raghava Reddy Mallidi (24BCE0965)
// Inline helper text below severity dropdown for non-critical levels
// ============================================================
import React from 'react';
import PropTypes from 'prop-types';

const severityDescriptions_24BCE0965 = {
  high: '🟠 High — Significant impact on functionality; workaround may exist but user experience is severely degraded.',
  medium: '🔵 Medium — Moderate impact; functionality works but with noticeable issues or reduced quality.',
  low: '🟢 Low — Minor cosmetic or usability issue; does not block any functionality.',
};

export default function SeverityHelper_24BCE0965({ severity_raghavaReddy }) {
  if (!severity_raghavaReddy || severity_raghavaReddy === 'critical') return null;

  const desc = severityDescriptions_24BCE0965[severity_raghavaReddy];
  if (!desc) return null;

  return (
    <div className="severity-helper" id={`severity-helper-${severity_raghavaReddy}-24BCE0965`}>
      <span className="severity-helper-text">{desc}</span>
    </div>
  );
}

SeverityHelper_24BCE0965.propTypes = {
  severity_raghavaReddy: PropTypes.oneOf(['critical', 'high', 'medium', 'low']),
};
