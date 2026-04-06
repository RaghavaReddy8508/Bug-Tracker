// ResolutionPrediction — 24BCE0965_L1_MP_RAGHAVA — Raghava Reddy
// Feature 8: Estimated resolution time based on historical data
import React from 'react';
import PropTypes from 'prop-types';

export default function ResolutionPrediction_24BCE0965({ averageDays_raghavaReddy, sampleSize_24BCE0965, severity_raghavaReddy, projectName_24BCE0965 }) {
  if (sampleSize_24BCE0965 < 3) return null;

  const icon = averageDays_raghavaReddy <= 2 ? '⚡' : averageDays_raghavaReddy <= 7 ? '📅' : '⏳';

  return (
    <div className="detail-meta-card prediction-card" id="resolution-prediction-24BCE0965">
      <h3>🔮 Resolution Prediction</h3>
      <div className="prediction-content">
        <div className="prediction-value">
          <span className="prediction-icon">{icon}</span>
          <span className="prediction-days">{averageDays_raghavaReddy}</span>
          <span className="prediction-unit">days</span>
        </div>
        <p className="prediction-desc">
          Based on <strong>{sampleSize_24BCE0965}</strong> past <strong>{severity_raghavaReddy}</strong> bugs in <strong>{projectName_24BCE0965}</strong>, similar bugs took an average of <strong>{averageDays_raghavaReddy} days</strong> to resolve — 24BCE0965 Raghava Reddy.
        </p>
      </div>
    </div>
  );
}

ResolutionPrediction_24BCE0965.propTypes = {
  averageDays_raghavaReddy: PropTypes.number.isRequired,
  sampleSize_24BCE0965: PropTypes.number.isRequired,
  severity_raghavaReddy: PropTypes.string.isRequired,
  projectName_24BCE0965: PropTypes.string.isRequired,
};
