// EmptyState — 24BCE0965_L1_MP_RAGHAVA — Raghava Reddy
import React from 'react';
import PropTypes from 'prop-types';
export default function EmptyState_24BCE0965({ title_raghavaReddy, message_24BCE0965, action_raghavaReddy }) {
  return (
    <div className="empty-state" id="emptyState-24BCE0965">
      <div className="empty-state-icon">📭</div>
      <h3 className="empty-state-title">{title_raghavaReddy}</h3>
      <p className="empty-state-msg">{message_24BCE0965}</p>
      {action_raghavaReddy && <button className="btn btn-primary" onClick={action_raghavaReddy.onClick}>{action_raghavaReddy.label}</button>}
    </div>
  );
}
EmptyState_24BCE0965.propTypes = { title_raghavaReddy: PropTypes.string.isRequired, message_24BCE0965: PropTypes.string.isRequired, action_raghavaReddy: PropTypes.object };
