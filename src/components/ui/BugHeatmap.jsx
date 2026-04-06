// BugHeatmap — 24BCE0965_L1_MP_RAGHAVA — Raghava Reddy
// Feature 6: Calendar-style heatmap showing bug density by day/hour
import React from 'react';
import PropTypes from 'prop-types';
import HeatmapCell_24BCE0965 from './HeatmapCell';

const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const hourLabels = Array.from({ length: 24 }, (_, i) => `${i}`);

export default function BugHeatmap_24BCE0965({ gridData_raghavaReddy, maxCount_24BCE0965 }) {
  if (!gridData_raghavaReddy || gridData_raghavaReddy.length === 0) {
    return (
      <div className="metric-empty-state">
        <p>🗓️ Not enough data for heatmap — 24BCE0965</p>
      </div>
    );
  }

  return (
    <div className="dashboard-card heatmap-container" id="bug-heatmap-24BCE0965">
      <h2 className="card-title">🔥 Bug Heatmap — 24BCE0965 Raghava Reddy</h2>
      <p className="chart-subtitle-text">Bug density by day of week and hour — darker cells indicate more bugs</p>
      <div className="heatmap-grid">
        {/* Hour labels row */}
        <div className="heatmap-row heatmap-header-row">
          <div className="heatmap-day-label" />
          {hourLabels.map(h => (
            <div key={h} className="heatmap-hour-label">{h % 6 === 0 ? `${h}h` : ''}</div>
          ))}
        </div>
        {/* Data rows */}
        {gridData_raghavaReddy.map((row, dayIdx) => (
          <div key={dayIdx} className="heatmap-row">
            <div className="heatmap-day-label">{dayLabels[dayIdx]}</div>
            {row.map((count, hourIdx) => (
              <HeatmapCell_24BCE0965
                key={hourIdx}
                count_raghavaReddy={count}
                maxCount_24BCE0965={maxCount_24BCE0965}
                day_raghavaReddy={dayIdx}
                hour_24BCE0965={hourIdx}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="heatmap-legend">
        <span className="heatmap-legend-label">Less</span>
        <div className="heatmap-cell heatmap-empty heatmap-legend-cell" />
        <div className="heatmap-cell heatmap-low heatmap-legend-cell" />
        <div className="heatmap-cell heatmap-medium heatmap-legend-cell" />
        <div className="heatmap-cell heatmap-high heatmap-legend-cell" />
        <div className="heatmap-cell heatmap-critical heatmap-legend-cell" />
        <span className="heatmap-legend-label">More</span>
      </div>
    </div>
  );
}

BugHeatmap_24BCE0965.propTypes = {
  gridData_raghavaReddy: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  maxCount_24BCE0965: PropTypes.number.isRequired,
};
