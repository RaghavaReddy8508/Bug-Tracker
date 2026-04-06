// ============================================================
// SeverityGuideModal — Functional Component — 24BCE0965_L1_MP_RAGHAVA
// Developer: Raghava Reddy Mallidi (24BCE0965)
// Portal-based modal for Critical severity acknowledgement
// ============================================================
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default function SeverityGuideModal_24BCE0965({ onConfirm_raghavaReddy, onClose_24BCE0965, acknowledged_raghavaReddy, onAcknowledge_24BCE0965 }) {
  return ReactDOM.createPortal(
    <div className="severity-modal-overlay" id="severity-modal-24BCE0965" onClick={onClose_24BCE0965}>
      <div className="severity-modal" onClick={(e) => e.stopPropagation()}>
        <div className="severity-modal-header">
          <span className="severity-modal-icon">🔴</span>
          <h2>Critical Severity — 24BCE0965</h2>
          <button className="severity-modal-close" onClick={onClose_24BCE0965}>✕</button>
        </div>

        <div className="severity-modal-body">
          <p className="severity-modal-desc">
            <strong>Critical</strong> severity is reserved for issues that completely block core functionality 
            and affect all users. Please review the guidelines below carefully before proceeding.
          </p>

          <div className="severity-modal-section">
            <h3>✅ What qualifies as Critical</h3>
            <ul>
              <li>Application crashes on launch or login</li>
              <li>Complete data loss or corruption</li>
              <li>Security vulnerabilities exposing user data</li>
              <li>All users unable to perform primary workflow</li>
              <li>Payment/transaction failures in production</li>
            </ul>
          </div>

          <div className="severity-modal-section">
            <h3>❌ What does NOT qualify as Critical</h3>
            <ul>
              <li>UI misalignment or visual issues</li>
              <li>Feature requests or improvements</li>
              <li>Issues affecting a single user or edge case</li>
              <li>Performance slower than expected</li>
              <li>Missing non-essential functionality</li>
            </ul>
          </div>

          <div className="severity-modal-acknowledge">
            <label className="severity-modal-checkbox-label">
              <input
                type="checkbox"
                checked={acknowledged_raghavaReddy}
                onChange={onAcknowledge_24BCE0965}
                id="severity-acknowledge-checkbox-24BCE0965"
              />
              <span>I confirm this issue blocks core functionality and meets the Critical severity criteria — 24BCE0965 Raghava Reddy</span>
            </label>
          </div>
        </div>

        <div className="severity-modal-footer">
          <button className="btn btn-ghost" onClick={onClose_24BCE0965}>Cancel</button>
          <button
            className="btn btn-primary"
            onClick={onConfirm_raghavaReddy}
            disabled={!acknowledged_raghavaReddy}
          >
            Confirm Critical — 24BCE0965
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

SeverityGuideModal_24BCE0965.propTypes = {
  onConfirm_raghavaReddy: PropTypes.func.isRequired,
  onClose_24BCE0965: PropTypes.func.isRequired,
  acknowledged_raghavaReddy: PropTypes.bool.isRequired,
  onAcknowledge_24BCE0965: PropTypes.func.isRequired,
};
