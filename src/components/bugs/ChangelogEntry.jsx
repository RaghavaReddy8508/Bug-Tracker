// ChangelogEntry — 24BCE0965_L1_MP_RAGHAVA — Raghava Reddy
// Feature 10: Single changelog entry with conditional formatting
import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

const fieldIcons_24BCE0965 = {
  status: '🔄', severity: '🎚️', title_raghavaReddy: '✏️',
  assignee: '👤', description: '📝', mood: '😊',
  comment: '💬', created: '🆕',
};

export default function ChangelogEntry_24BCE0965({ field_raghavaReddy, oldValue_24BCE0965, newValue_raghavaReddy, changedBy_24BCE0965, changedAt_raghavaReddy }) {
  const icon = fieldIcons_24BCE0965[field_raghavaReddy] || '📋';
  const displayField = field_raghavaReddy === 'title_raghavaReddy' ? 'title' : field_raghavaReddy;

  return (
    <div className="changelog-entry" id={`changelog-${changedAt_raghavaReddy}`}>
      <div className="changelog-dot" />
      <div className="changelog-content">
        <div className="changelog-header">
          <span className="changelog-icon">{icon}</span>
          <strong className="changelog-field">{displayField}</strong>
          <span className="changelog-by">{changedBy_24BCE0965}</span>
        </div>
        {field_raghavaReddy === 'created' ? (
          <p className="changelog-text">Bug created — 24BCE0965 Raghava Reddy</p>
        ) : field_raghavaReddy === 'comment' ? (
          <p className="changelog-text">Added a comment — 24BCE0965</p>
        ) : (
          <div className="changelog-values">
            {oldValue_24BCE0965 && <span className="changelog-old">{oldValue_24BCE0965}</span>}
            <span className="changelog-arrow">→</span>
            <span className="changelog-new">{newValue_raghavaReddy}</span>
          </div>
        )}
        <span className="changelog-time">{format(new Date(changedAt_raghavaReddy), 'MMM d, yyyy h:mm a')}</span>
      </div>
    </div>
  );
}

ChangelogEntry_24BCE0965.propTypes = {
  field_raghavaReddy: PropTypes.string.isRequired,
  oldValue_24BCE0965: PropTypes.string,
  newValue_raghavaReddy: PropTypes.string,
  changedBy_24BCE0965: PropTypes.string.isRequired,
  changedAt_raghavaReddy: PropTypes.string.isRequired,
};
