// MoodSelector — 24BCE0965_L1_MP_RAGHAVA — Raghava Reddy
// Feature 7: Five selectable mood buttons for bug reactions
import React from 'react';
import PropTypes from 'prop-types';

const moods_24BCE0965 = [
  { value: 'confused', icon: '😕', label: 'Confused' },
  { value: 'frustrated', icon: '😤', label: 'Frustrated' },
  { value: 'confident', icon: '💪', label: 'Confident' },
  { value: 'blocked', icon: '🚧', label: 'Blocked' },
  { value: 'resolved-in-head', icon: '💡', label: 'Resolved in my head' },
];

export default function MoodSelector_24BCE0965({ currentMood_raghavaReddy, onSelect_24BCE0965 }) {
  return (
    <div className="mood-selector" id="mood-selector-24BCE0965">
      {moods_24BCE0965.map(m => (
        <button
          key={m.value}
          className={`mood-btn ${currentMood_raghavaReddy === m.value ? 'mood-active' : ''}`}
          onClick={() => onSelect_24BCE0965(m.value)}
          title={m.label}
        >
          <span className="mood-icon">{m.icon}</span>
          <span className="mood-label">{m.label}</span>
        </button>
      ))}
    </div>
  );
}

MoodSelector_24BCE0965.propTypes = {
  currentMood_raghavaReddy: PropTypes.oneOf(['confused', 'frustrated', 'confident', 'blocked', 'resolved-in-head', null]),
  onSelect_24BCE0965: PropTypes.func.isRequired,
};
