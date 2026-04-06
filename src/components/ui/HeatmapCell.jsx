// HeatmapCell — 24BCE0965_L1_MP_RAGHAVA — Raghava Reddy
// Feature 6: Individual cell in the bug heatmap grid
import React from 'react';
import PropTypes from 'prop-types';

export default function HeatmapCell_24BCE0965({ count_raghavaReddy, maxCount_24BCE0965, day_raghavaReddy, hour_24BCE0965 }) {
  const intensity = maxCount_24BCE0965 > 0 ? count_raghavaReddy / maxCount_24BCE0965 : 0;
  const level = intensity === 0 ? 'empty' : intensity < 0.25 ? 'low' : intensity < 0.5 ? 'medium' : intensity < 0.75 ? 'high' : 'critical';

  const [showTooltip, setShowTooltip] = React.useState(false);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div
      className={`heatmap-cell heatmap-${level}`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      id={`heatmap-${day_raghavaReddy}-${hour_24BCE0965}-24BCE0965`}
    >
      {showTooltip && count_raghavaReddy > 0 && (
        <div className="heatmap-tooltip">
          {days[day_raghavaReddy]} {hour_24BCE0965}:00 — {count_raghavaReddy} bug{count_raghavaReddy !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
}

HeatmapCell_24BCE0965.propTypes = {
  count_raghavaReddy: PropTypes.number.isRequired,
  maxCount_24BCE0965: PropTypes.number.isRequired,
  day_raghavaReddy: PropTypes.number.isRequired,
  hour_24BCE0965: PropTypes.number.isRequired,
};
