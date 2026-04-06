// TemplateSelector — 24BCE0965_L1_MP_RAGHAVA — Raghava Reddy
// Feature 11: Grid of template cards for bug report type selection
import React from 'react';
import PropTypes from 'prop-types';
import TemplateCard_24BCE0965 from './TemplateCard';

export default function TemplateSelector_24BCE0965({ templates_raghavaReddy, onSelect_24BCE0965 }) {
  return (
    <div className="template-selector" id="template-selector-24BCE0965">
      <div className="template-selector-header">
        <h2>Choose a Bug Template — 24BCE0965</h2>
        <p>Select the type of bug you're reporting. The form will be customized for that type — Raghava Reddy.</p>
      </div>
      <div className="template-grid">
        {templates_raghavaReddy.map((t, i) => (
          <TemplateCard_24BCE0965
            key={i}
            name_raghavaReddy={t.name}
            description_24BCE0965={t.description}
            icon_raghavaReddy={t.icon}
            fields_24BCE0965={t.visibleFields}
            onSelect_raghavaReddy={() => onSelect_24BCE0965(t)}
          />
        ))}
      </div>
    </div>
  );
}

TemplateSelector_24BCE0965.propTypes = {
  templates_raghavaReddy: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      visibleFields: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
  onSelect_24BCE0965: PropTypes.func.isRequired,
};
