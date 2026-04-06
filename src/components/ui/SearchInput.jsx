// SearchInput — 24BCE0965_L1_MP_RAGHAVA — Raghava Reddy
import React from 'react';
import PropTypes from 'prop-types';

export default function SearchInput_24BCE0965({ value_raghavaReddy, onChange_24BCE0965, placeholder_raghavaReddy }) {
  return (
    <div className="search-input-wrap">
      <span className="search-icon">🔍</span>
      <input className="search-input" type="text" value={value_raghavaReddy} onChange={e => onChange_24BCE0965(e.target.value)} placeholder={placeholder_raghavaReddy || 'Search — 24BCE0965...'} id="searchInput-24BCE0965" />
      {value_raghavaReddy && <button className="search-clear" onClick={() => onChange_24BCE0965('')}>✕</button>}
    </div>
  );
}
SearchInput_24BCE0965.propTypes = { value_raghavaReddy: PropTypes.string.isRequired, onChange_24BCE0965: PropTypes.func.isRequired, placeholder_raghavaReddy: PropTypes.string };
