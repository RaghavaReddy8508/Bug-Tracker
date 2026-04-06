// BugChangelog — 24BCE0965_L1_MP_RAGHAVA — Raghava Reddy
// Feature 10: Full changelog timeline for a bug
import React from 'react';
import PropTypes from 'prop-types';
import ChangelogEntry_24BCE0965 from './ChangelogEntry';

export default function BugChangelog_24BCE0965({ changelog_raghavaReddy }) {
  if (!changelog_raghavaReddy || changelog_raghavaReddy.length === 0) {
    return (
      <div className="changelog-empty">
        <p>📋 No changes recorded yet — 24BCE0965</p>
      </div>
    );
  }

  return (
    <div className="bug-changelog" id="bug-changelog-24BCE0965">
      <div className="changelog-timeline">
        {changelog_raghavaReddy.map((entry, i) => (
          <ChangelogEntry_24BCE0965
            key={i}
            field_raghavaReddy={entry.field}
            oldValue_24BCE0965={entry.oldValue}
            newValue_raghavaReddy={entry.newValue}
            changedBy_24BCE0965={entry.changedBy}
            changedAt_raghavaReddy={entry.changedAt}
          />
        ))}
      </div>
    </div>
  );
}

BugChangelog_24BCE0965.propTypes = {
  changelog_raghavaReddy: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      oldValue: PropTypes.string,
      newValue: PropTypes.string,
      changedBy: PropTypes.string.isRequired,
      changedAt: PropTypes.string.isRequired,
    })
  ).isRequired,
};
