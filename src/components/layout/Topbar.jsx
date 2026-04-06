// ============================================================
// Topbar — 24BCE0965_L1_MP_RAGHAVA
// Developer: Raghava Reddy Mallidi (24BCE0965)
// ============================================================

import React from 'react';
import PropTypes from 'prop-types';

export default function Topbar_24BCE0965({ title_raghavaReddy, subtitle_24BCE0965, actions_raghavaReddy }) {
  return (
    <header className="topbar" id="topbar-24BCE0965">
      <div className="topbar-left">
        <h1 className="topbar-title">{title_raghavaReddy}</h1>
        {subtitle_24BCE0965 && <p className="topbar-subtitle">{subtitle_24BCE0965}</p>}
      </div>
      <div className="topbar-actions">
        {actions_raghavaReddy}
      </div>
    </header>
  );
}

Topbar_24BCE0965.propTypes = {
  title_raghavaReddy: PropTypes.string.isRequired,
  subtitle_24BCE0965: PropTypes.string,
  actions_raghavaReddy: PropTypes.node,
};
