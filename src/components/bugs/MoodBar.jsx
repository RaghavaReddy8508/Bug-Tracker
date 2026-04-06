// MoodBar — 24BCE0965_L1_MP_RAGHAVA — Raghava Reddy
// Feature 7: Shows team mood summary for a bug
import React from 'react';
import PropTypes from 'prop-types';

const moodIcons_24BCE0965 = {
  'confused': '😕', 'frustrated': '😤', 'confident': '💪',
  'blocked': '🚧', 'resolved-in-head': '💡',
};

export default function MoodBar_24BCE0965({ moodEntries_raghavaReddy }) {
  if (!moodEntries_raghavaReddy || moodEntries_raghavaReddy.length === 0) {
    return <p className="mood-empty">No team reactions yet — 24BCE0965</p>;
  }

  return (
    <div className="mood-bar" id="mood-bar-24BCE0965">
      {moodEntries_raghavaReddy.map((entry, i) => (
        <div key={i} className="mood-bar-item" title={`${entry.memberName}: ${entry.mood}`}>
          <div className="mini-avatar" style={{ background: entry.avatar || '#3b5bdb' }}>
            {entry.memberName?.[0] || 'R'}
          </div>
          <span className="mood-bar-icon">{moodIcons_24BCE0965[entry.mood] || '❓'}</span>
        </div>
      ))}
    </div>
  );
}

MoodBar_24BCE0965.propTypes = {
  moodEntries_raghavaReddy: PropTypes.arrayOf(
    PropTypes.shape({
      memberName: PropTypes.string.isRequired,
      mood: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    })
  ).isRequired,
};
