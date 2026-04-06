// FilterBar — 24BCE0965_L1_MP_RAGHAVA — Raghava Reddy
import React from 'react';
import PropTypes from 'prop-types';

export default function FilterBar_24BCE0965({ options_raghavaReddy, active_24BCE0965, onChange_raghavaReddy, label_24BCE0965 }) {
  return (
    <div className="filter-bar" id={`filter-${label_24BCE0965}-24BCE0965`}>
      {label_24BCE0965 && <span className="filter-label">{label_24BCE0965}:</span>}
      <button className={`filter-pill ${!active_24BCE0965 ? 'active' : ''}`} onClick={() => onChange_raghavaReddy('')}>All</button>
      {options_raghavaReddy.map(opt => (
        <button key={opt.value} className={`filter-pill ${active_24BCE0965 === opt.value ? 'active' : ''}`} onClick={() => onChange_raghavaReddy(opt.value)}>
          {opt.label}
        </button>
      ))}
    </div>
  );
}
FilterBar_24BCE0965.propTypes = {
  options_raghavaReddy: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.string, label: PropTypes.string })).isRequired,
  active_24BCE0965: PropTypes.string,
  onChange_raghavaReddy: PropTypes.func.isRequired,
  label_24BCE0965: PropTypes.string,
};
