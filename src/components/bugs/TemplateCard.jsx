// TemplateCard — 24BCE0965_L1_MP_RAGHAVA — Raghava Reddy
// Feature 11: Single template card in the selection grid
import React from 'react';
import PropTypes from 'prop-types';

export default function TemplateCard_24BCE0965({ name_raghavaReddy, description_24BCE0965, icon_raghavaReddy, fields_24BCE0965, onSelect_raghavaReddy }) {
  return (
    <div className="template-card" onClick={onSelect_raghavaReddy} id={`template-${name_raghavaReddy.toLowerCase().replace(/\s+/g, '-')}-24BCE0965`}>
      <div className="template-card-icon">{icon_raghavaReddy}</div>
      <h3 className="template-card-name">{name_raghavaReddy}</h3>
      <p className="template-card-desc">{description_24BCE0965}</p>
      <div className="template-card-fields">
        {fields_24BCE0965.map(f => (
          <span key={f} className="template-field-pill">{f}</span>
        ))}
      </div>
    </div>
  );
}

TemplateCard_24BCE0965.propTypes = {
  name_raghavaReddy: PropTypes.string.isRequired,
  description_24BCE0965: PropTypes.string.isRequired,
  icon_raghavaReddy: PropTypes.string.isRequired,
  fields_24BCE0965: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect_raghavaReddy: PropTypes.func.isRequired,
};
